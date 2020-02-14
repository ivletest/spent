require("dotenv").config();
const http = require("http");
const httpProxy = require("http-proxy");

const proxy = httpProxy.createProxyServer();



const server = http.createServer((request, response) => {
    proxy.web(request, response, { 
        target: {
            host: process.env.API_HOST,
            port: process.env.API_PORT
        }
    });
});

module.exports = server;
