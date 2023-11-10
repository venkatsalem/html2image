const express = require('express');
const puppeteer = require('puppeteer');
const bodyParser = require('body-parser');
const sharp = require('sharp'); // Import the sharp library
const app = express();
const port = 3000;

app.use(bodyParser.text({ type: 'text/html' }));

const maxRequestsBeforeNewBrowser = 1000;
let browserInstance = null;
let requestCounter = 0;

async function getBrowserInstance() {
    if (!browserInstance || requestCounter >= maxRequestsBeforeNewBrowser) {
        if (browserInstance) {
            await browserInstance.close();
        }
        browserInstance = await puppeteer.launch();
        requestCounter = 0; // Reset the request counter
    }
    requestCounter++;
    return browserInstance;
}

app.post('/html-to-image', async (req, res) => {
    const htmlContent = req.body;

    if (!htmlContent) {
        return res.status(400).send('Please provide HTML content in the request body.');
    }

    try {
        const browser = await getBrowserInstance();
        const page = await browser.newPage();

        // Set the HTML content from the request
        await page.setContent(htmlContent);

        // Capture a screenshot of the page
        const imageBuffer = await page.screenshot();

        // Use sharp to trim or crop the image
        const trimmedImageBuffer = await sharp(imageBuffer)
            .trim() // Automatically trim excess whitespace
            .toBuffer();

        res.setHeader('Content-Type', 'image/png');
        res.send(trimmedImageBuffer);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred while capturing and trimming the image.');
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
