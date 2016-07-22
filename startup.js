var http = require('http');
var url = require('url');
var net = require('net');
var fs = require('fs');
var apiRequest = require('request');
var formidable = require('formidable');


var proxy = http.createServer((request, response) => {
    var url_entity = url.parse(request.url);
    if(url_entity.pathname == '/'){
        fs.readFile('index.html', 'utf8', function(err, data){
            if(err){
                response.writeHead(404, {
                    'Content-Type': 'text/html'
                });
                response.write('<h1>404 Not Found</h1>');
            }
            else{
                response.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                response.write(data);
            }
            response.end();
        });
    }
    else if(url_entity.pathname.startsWith('/contents')){
        fs.readFile(url_entity.pathname.substring(1), (err, data) => {
                if(err){
                    response.writeHead(404, {
                        'Content-Type' : 'text/plain',
                        'Cache-Control' : 'no-cache'
                    });
                }
                else{
                    response.writeHead(200, {
                        'Content-Type': ((filename) => {
                            if(filename.endsWith('.css')) return "text/css";
                            if(filename.endsWith('.js')) return "application/x-javascript";
                            if(filename.endsWith('.svg')) return "image/svg+xml";
                            if(filename.endsWith('.woff')) return "application/x-font-woff";
                            if(filename.endsWith('.woff2')) return "application/x-font-woff2";
                            if(filename.endsWith('.ttf')) return "application/x-font-truetype";
                            if(filename.endsWith('.eot')) return "application/vnd.ms-fontobject";
                            if(filename.endsWith('.png')) return "image/png";
                            if(filename.endsWith('.wav')) return "audio/wav";
                            if(filename.endsWith('.json')) return "application/json";
                        })(url_entity.pathname),
                        'Cache-Control' : 'no-cache'
                    });
                    response.write(data);
                }
                response.end();
            });
    }
    else if(url_entity.pathname.startsWith('/view')){
        fs.readFile(url_entity.pathname.substring(1), (err, data) => {
            if(err){
                response.writeHead(404, {
                    'Content-Type': 'text/html',
                    'Cache-Control' : 'no-cache'
                });
            }
            else{
                response.writeHead(200, {
                    'Content-Type' : 'text/html',
                    'Cache-Control' : 'no-cache'
                });
                response.write(data);
            }
            response.end();
        })
    }
    else if(url_entity.pathname.startsWith('/manage')){
        var manage = require('./manage/welcome');
        manage.enter(request, response);
    }
}).listen(2000, '0.0.0.0', 10, () =>{
    console.log("Listening.")
});
