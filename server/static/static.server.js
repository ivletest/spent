const http = require("http");
const fs = require("fs");
const path = require("path");
const messages = require("../common/messages");

http.createServer((request, response) => {
    const filePath = `,${request.url}`;
    if (filePath === "./") {
        filePath = "./index.html";
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
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.wasm': 'application/wasm'
    };

    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === "ENOENT") {
                response.writeHead(404);
                response.end(messages.notFound);
            } else {
                response.writeHead(500);
                response.end(messages.internalServerError);
            }

            return;
        }

        response.writeHead(200, contentType);
        response.end(content, 'utf-8');
    });
});

