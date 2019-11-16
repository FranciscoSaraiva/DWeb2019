var http = require('http'); //módulo http
var url = require('url'); //módulo url
var fs = require('fs'); //módulo fs (filesystem)

//config variables
var PORT_NUMBER = 7777;

http.createServer((request, response) => {

    let url_loc = request.url.split('/');
    let route = url_loc[1];
    console.log(route);
    console.log(route.length);
    switch (route) {
        /*****************
         * Relation files
         *****************/
        case "favicon.ico": //there's always a favicon request
            console.log('Fell in favicon.ico')
            fs.readFile('favicon.ico', (err, data) => {
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.write(data);
                response.end();
            })
            return;
        case "template.xsl": //to get the xsl transformation file to process the xml
            console.log('Fell in template.xsl')
            fs.readFile('template.xsl', (err, data) => {
                response.writeHead(200, { 'Content-Type': 'text/xsl' });
                response.write(data);
                response.end();
            })
            return;

        /*****************
        * Views
        *****************/
        case "": //Index location
            console.log('Fell in index')
            fs.readFile('arqs/index.html', (err, data) => {
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.write(data);
                response.end();
            });
            return;
        default: //check if it's only numbers to get the aqr_(route).xml files, should be a regex but can't get it to work
            if (route.length) {
                console.log('Fell in arq view')
                fs.readFile('arqs/arq_' + route + '.xml', (err, data) => {
                    if (err) { //if there was an error finding the arq file
                        response.writeHead(200, { 'Content-Type': 'text/html' });
                        response.write('<h1> No file found... </h1>');
                        response.end();
                    } else {
                        response.writeHead(200, { 'Content-Type': 'text/xml' });
                        response.write(data);
                        response.end();
                    }
                })
            }
            return;
    }
}).listen(PORT_NUMBER);

console.log('Server running on port: ' + PORT_NUMBER + '....');