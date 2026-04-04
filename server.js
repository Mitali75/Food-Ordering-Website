const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;

const server = http.createServer((req, res) => {
    let filePath = './public';

    if (req.url === '/' || req.url === '/index.html') {
        filePath += '/index.html';
    } else if (req.url.startsWith('/menu.html')) {
        filePath += '/menu.html';
    } else if (req.url === '/cart.html') {
        filePath += '/cart.html';
    } else if (req.url === '/order.html') {
        filePath += '/order.html';
    } else if (req.url === '/contact.html') {
        filePath += '/contact.html';
    } else if (req.url === '/login.html') {
        filePath += '/login.html';
    } else if (req.url === '/register.html') {
        filePath += '/register.html';
    } else if (req.url.startsWith('/restaurant.html')) {
        filePath += '/restaurant.html';
    } else if (req.url === '/restaurants.html') {
        filePath += '/restaurants.html';
    } else if (req.url === '/style.css') {
        filePath += '/style.css';
    } else if (req.url === '/script.js') {
        filePath += '/script.js';
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
        return;
    }

    const ext = path.extname(filePath);

    let contentType = 'text/html';
    if (ext === '.css') contentType = 'text/css';
    if (ext === '.js') contentType = 'text/javascript';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(500);
            res.end('Server Error');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});