exports.getHome = (request, response) => {
  response.writeHead(200, { 'My-custom-header': 'This is a great API' });
  response.end('Welcome to my server HOESSSS');
};
