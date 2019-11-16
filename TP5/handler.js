/*******************
 * Modules
 *******************/
var http = require('http');
var url = require('url');
var pug = require('pug');
var fs = require('fs');
var jsonfile = require('jsonfile');
var { parse } = require('querystring');


/**
 * Requests
 */
exports.getUrlPathname = (request) => {
    let purl = url.parse(request.url, true);
    return purl.pathname;
}

exports.getRequestMethod = (request) => {
    let method = request.method;
    return method;
}

exports.readDatabase = (database, callback) => {
    console.log('about to read it...')
    console.log(database)

    jsonfile.readFile(database, (err, task_list) => {
        console.log('read it...')
        if (!err) {
            console.log('returned it...')
            console.log(task_list)
            callback(err, task_list);
        }
        console.log('it is empty...')
        return (err, []);
    })
}

/**
 * Responses
 */

//GET
exports.getView = (location, response, data) => {
    console.log('DATA: ' + data);
    response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
    if (data != null) //if there's data being passed we pass it to the view
        response.write(pug.renderFile(location, { task_list: data }));
    else //if not we load only the view
        response.write(pug.renderFile(location));
    response.end();
}

exports.getErrorView = (location, response, error) => {
    response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
    response.write(pug.renderFile(
        location,
        { error_description: error }
    ));
    response.end();
}

exports.getFavicon = (location, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    fs.readFile(location, (err, data) => {
        if (!err)
            response.write(data);
        else
            response.write('<p>Erro a carregar favicon: ' + err + '</p>');
        response.end();
    })
}

//POST
exports.postTask = (request, callback) => {
    //urlencoded format (parse the data information from the form)
    if (request.headers['content-type'] == 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', block => {
            body += block.toString();
        });
        request.on('end', () => {
            let data = parse(body);
            console.log(data);
            callback(data);
        })
    }
}

exports.saveTaskDatabase = (database, port, response, task) => {
    jsonfile.readFile(database, (err, task_list) => {
        if (!err) {
            //rearange the ids to organize 
            task_list.filter((task, index) => {
                task.id = index;
            })
            //push the new task into the array
            task_list.push(task);
            //we set a new id based on the length of the task_list so it's all ordered and identified
            task_list[task_list.length - 1].id = task_list.length - 1;

            jsonfile.writeFile(database, task_list, err => {
                if (err)
                    console.log(err);
                else {
                    //redirect to the index
                    console.log('Registo gravado com sucesso!');
                    response.writeHead(301,
                        { Location: 'http://localhost:' + port }
                    );
                    response.end();
                }
            });
        }
    })
}

//DELETE
exports.deleteTask = (request, callback) => {
    let body = '';
    request.on('data', block => {
        body += block.toString();
    })
    request.on('end', () => {
        let data = JSON.parse(body);
        console.log('JSON: ' + body);
        callback(data);
    })
}

exports.deleteTaskDatabase = (database, port, response, data) => {
    jsonfile.readFile(database, (err, task_list) => {
        if (!err) {
            //filter out the task we want to delete via the id
            task_list = task_list.filter((task) => { return task.id != data.id });
            console.log('ID-> ' + data.id);

            jsonfile.writeFile(database, task_list, err => {
                if (err)
                    console.log(err);
                else {
                    //redirect to the index
                    console.log('Registo apagado com sucesso!');
                    response.writeHead(200, { 'Content-Type': 'text/html' });
                    response.end();
                }
            })
        }
    })
}

