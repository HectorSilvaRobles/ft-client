const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function(app){
    app.use(
        createProxyMiddleware('/api', {
            target: `http://ec2-3-101-59-77.us-west-1.compute.amazonaws.com`,
             changeOrigin: true
        })
    );
};