const http = require('http');
const url = require('url');
const controller = require('./controller');
const db = require('./db');

const server = http.createServer();

// Listens for the "request" event on our server

server.on('request', (request, response) => {
  if (request.url === '/' && request.method === 'GET') {
    controller.getHome(request, response);
  }

  if (request.url === '/status' && request.method === 'GET') {
    const status = {
      up: true,
      owner: 'Andrew Maney',
      timestamp: Date.now(),
    };
    response.writeHead(200, {
      'Content-type': 'application-json',
    });
    response.end(JSON.stringify(status));
  }
  const parsedUrl = url.parse(request.url, true);
  const parsedQuery = parsedUrl.query;
  //   console.log(parsedUrl);
  if (parsedUrl.pathname === '/set' && request.method === 'PATCH') {
    // fire off db set method
    return db
      .set(parsedQuery.file, parsedQuery.key, parsedQuery.value)
      .then(() => {
        response.end('Value set');
      })
      .catch(err => {
        // TODO: handle errors
      });
  }
});

server.listen(6969, () => console.log('Server listening on port 6969'));
