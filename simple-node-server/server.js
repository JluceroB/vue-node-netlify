// simple-node-server/server.js
const http = require('http');
const fs = require('fs');
const path = require('path');

const publicFolder = path.join(__dirname, '../public');
const carsDataFile = path.join(publicFolder, 'cars.json');

const requestListener = (req, res) => {
    let filePath;
    if (req.url === '/') {
        filePath = path.join(publicFolder, 'index.html');
    } else if (req.url === '/api') {
        filePath = carsDataFile;
        res.setHeader('Content-Type', 'application/json');
    } else {
        filePath = path.join(publicFolder, req.url === '/' ? 'index.html' : req.url);
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml'
    };
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                fs.readFile(path.join(publicFolder, 'index.html'), (err, indexContent) => {
                    if (err) {
                        res.writeHead(500);
                        res.end(`Sorry, an error occurred: ${err.code}`);
                    } else {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end(indexContent, 'utf-8');
                    }
                });
            } else {
                res.writeHead(500);
                res.end(`Sorry, an error occurred: ${error.code}`);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
};

const server = http.createServer(requestListener);
const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
