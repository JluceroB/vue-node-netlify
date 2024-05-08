// simple-node-server/server.js
const http = require('http');
const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');

// MongoDB connection URI
const uri = "mongodb+srv://Berrios:Jessica@cluster0.xmtm4ms.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// MongoDB client setup
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const dbName = 'CarDB';
const collectionName = 'CarCollection'; 

const publicFolder = path.join(__dirname, '../public');

const requestListener = async (req, res) => {
    let filePath;

    if (req.url === '/') {
        filePath = path.join(publicFolder, 'index.html');
        sendFileContent(res, filePath, 'text/html');
    } else if (req.url === '/api') {
        try {
            // Connect to MongoDB
            await client.connect();
            const database = client.db(dbName);
            const collection = database.collection(collectionName);

            // Fetch all documents from the collection
            const cars = await collection.find({}).toArray();

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(cars));
        } catch (error) {
            console.error('Error fetching cars:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Failed to fetch cars data' }));
        } finally {
          
        }
    } 
    else {
        filePath = path.join(publicFolder, req.url);
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
        sendFileContent(res, filePath, contentType);
    }
};

const sendFileContent = (res, filePath, contentType) => {
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1>');
            } else {
                res.writeHead(500);
                res.end(`Sorry, there was an error: ${error.code}`);
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
