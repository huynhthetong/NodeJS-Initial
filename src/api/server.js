/**find and use modules */
const http = require('http');
const url = require('url');
const mime = require('mime');

const { findAsset } = require('./utils');

const hostname = '127.0.0.1';
const port = 3001;

const router = {
  '/ GET': {
    asset: 'index.html',
    mime: mime.getType('html'),
  },
  '/styles.css GET': {
    asset: 'styles.css',
    mime: mime.getType('css'),
  },
};

//Log incoming request coming into the server.Helful for debugging and tracking
const logRequest = (method, route, status) =>
  console.log(method, route, status);

const server = http.createServer(async (req, res) => {
  const method = req.method;
  const route = url.parse(req.url).pathname;
  const match = router[`${route} ${method}`];
  if (!match) {
    res.writeHead(404, { 'Conten-type': 'text/html' });
    logRequest(method, route, 404);
    res.end();
    return;
  }
  //this is a sloppy, especially with more assets, create a 'router'
  res.writeHead(202, { 'Content-type': match.mime });
  res.write(await findAsset(match.asset));
  logRequest(method, route, 202);
  res.end();
  //most important part, send down the assets
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
