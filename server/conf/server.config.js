module.exports = {
    api: {
        host: process.env.API_HOST || "127.0.2.1",
        port: process.env.API_PORT || 3000
    },
    static: {
        host: process.env.STATIC_HOST || "127.0.2.1",
        port: process.env.STATIC_PORT || 8008
    },
    smtp: {
        host: process.env.SMTP_HOST || "127.0.2.1",
        port: process.env.SMTP_PORT || 2525
    },
    proxy: {
        host: process.env.PROXY_HOST || "127.0.0.1",
        port: process.env.PROXY_PORT || 80
    }
}