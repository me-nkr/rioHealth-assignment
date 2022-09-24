// index.js

const http = require('http');
const projects = require('./data-store');

const server = http.createServer();

server.addListener('request', (req, res) => {

    const path = req.url.split('?')[0];

    if (req.method !== 'GET' || !/^\/projects\/?[a-zA-Z0-9]*\/?$/.test(path)) notFound(res);
    else if (!path.split('/')[2] || path.split('/')[2].length < 1) badReq(res);
    else getProject(path, res);
});

const getProject = (path, res) => {

    const projectid = path.split('/')[2];
    let result = false;

    for (let project of projects) {
        if (project.id === projectid) {
            result = project;
            break;
        }
    }

    if (result === false) notFound(res);
    else {
        res.writeHead(200, { 'Content-Type': 'text/json' });
        res.end(JSON.stringify(result));
    }
}

const notFound = res => {
    res.writeHead(404, { 'Content-Type': 'text/json' });
    res.end(JSON.stringify({ message: 'NOT FOUND' }));
}

const badReq = res => {
    res.writeHead(400, { 'Content-Type': 'text/json' });
    res.end(JSON.stringify({ message: 'BAD REQUEST' }));
}

server.listen(8000);