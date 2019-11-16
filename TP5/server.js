/*******************
 * Modules
 *******************/
var http = require('http');
var jsonfile = require('jsonfile');

var handler = require('./handler');

/*******************
 * Config Variables
 *******************/
var CONFIG_FILE = 'serverConfig.json';
var SERVER_CONFIGURATION = jsonfile.readFileSync(CONFIG_FILE); //readFileSync is important to read the file before creating the server
console.log('-- Server running --\n'
    + 'Port: ' + SERVER_CONFIGURATION.port + '\n'
    + 'Database: ' + SERVER_CONFIGURATION.database + '\n'
    + 'Favicon: ' + SERVER_CONFIGURATION.favicon);

var server = http.createServer((request, response) => {

    let url = handler.getUrlPathname(request);
    console.log(url);
    let method = handler.getRequestMethod(request);

    switch (method) {
        case "GET": //process GET requests
            //index
            if (url == '/') {
                console.log('Fell in index.html');
                handler.readDatabase(SERVER_CONFIGURATION.database, (err, task_list) => {
                    console.log('read the database...')
                    if (!err)
                        handler.getView('./www/index.pug', response, task_list);
                });
                return;
            }
            //favicon
            if (url == '/favicon.ico') {
                console.log('Fell in favicon request');
                handler.getFavicon(SERVER_CONFIGURATION.favicon, response);
                return;
            }
            // error pages outside of the avaialable views
            handler.getErrorView('./www/error.pug', response, '404 Not found...');
            console.log('Fell in 404 view')
            break;
        case "POST": //process POST request
            //task
            if (url == '/task') {
                handler.postTask(request, data => {
                    handler.saveTaskDatabase(
                        SERVER_CONFIGURATION.database,
                        SERVER_CONFIGURATION.port,
                        response,
                        data);
                });
            }
            break;
        case "DELETE":
            if (url == '/task') {
                handler.deleteTask(request, data => {
                    handler.deleteTaskDatabase(
                        SERVER_CONFIGURATION.database,
                        SERVER_CONFIGURATION.port,
                        response,
                        data);
                });
            }
            break;
        default: //process the oth1er request types for errors
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write('<p>Error</p>');
            response.end();
            break;
    }
});

server.listen(SERVER_CONFIGURATION.port);
