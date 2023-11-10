# HTML to Image/PDF Converter

This Node.js application uses Express, Puppeteer, and Sharp to convert HTML content into images or PDFs. It provides endpoints to accept HTML content and returns the corresponding image or PDF file. The application is containerized using Docker for easy setup and deployment.

## Features

- **HTML to Image Conversion**: Converts HTML content to a PNG image.
- **HTML to PDF Conversion**: Converts HTML content to a PDF file.
- **Health Check Endpoint**: A simple endpoint to check server health.

## Prerequisites

- Docker

## Installation & Usage with Docker

1. Clone the repository.
2. Navigate to the project directory.

Build the Docker image:

```bash
docker build -t html-to-image-pdf-converter .
```

Run the Docker container:

```bash
docker run -p 3000:3000 html-to-image-pdf-converter
```

The server will start on `localhost:3000`.

### Endpoints

1. **HTML to Image Conversion**

   - **URL**: `/html-to-image`
   - **Method**: `POST`
   - **Body**: HTML content as text
   - **Response**: Image in PNG format

2. **HTML to PDF Conversion**

   - **URL**: `/html-to-pdf`
   - **Method**: `POST`
   - **Body**: HTML content as text
   - **Response**: PDF file

3. **Health Check**

   - **URL**: `/health`
   - **Method**: `GET`
   - **Response**: 'Server is healthy' if the server is running

## Dockerfile Details

The `Dockerfile` is set up to:

- Install necessary fonts for PDF generation.
- Install Node.js dependencies.
- Copy the application code into the Docker image.
- Use the Puppeteer Docker image to handle headless Chrome operations.

## Configuration

- The maximum number of requests before launching a new browser instance is set to `1000`. This can be modified in the `maxRequestsBeforeNewBrowser` variable.

## Error Handling

- Errors are logged to the console.
- Appropriate HTTP status codes are returned on error.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- Express.js for the web server framework.
- Puppeteer for HTML rendering and PDF/image generation.
- Sharp for image processing.
- Docker for containerization.
