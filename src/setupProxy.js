const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api1',
    createProxyMiddleware({
      target: 'https://od.moi.gov.tw',
      changeOrigin: true,
      pathRewrite: {
        '^/api1': '/api/v1/rest/datastore/301000000A-000082-033',
      },
    })
  );
  
  app.use(
    '/api2',
    createProxyMiddleware({
      target: 'https://od.moi.gov.tw',
      changeOrigin: true,
      pathRewrite: {
        '^/api2': '/api/v1/rest/datastore/301000000A-000082-049',
      },
    })
  );
};
