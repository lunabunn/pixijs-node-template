const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

// Welcome message
console.log('<< pixijs-node-template v1.0.0 by m00nr4bb1t >>');

http.createServer(function (req, res) {
    const parsedUrl = url.parse(req.url);
    let pathname = `static${parsedUrl.pathname}`;
    
    const map = {
        '.ico': 'image/x-icon',
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.json': 'application/json',
        '.css': 'text/css',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.wav': 'audio/wav',
        '.mp3': 'audio/mpeg',
        '.svg': 'image/svg+xml',
        '.pdf': 'application/pdf',
        '.doc': 'application/msword'
    };

    fs.exists(pathname, function (exist) {
        if (!exist) {
            res.statusCode = 404;
            res.end(`${pathname} - No such file or directory`);
            return;
        }

        if (pathname == 'static/') {
            pathname += 'index.html';
        } else if (fs.statSync(pathname).isDirectory()) {
            pathname += '/index' + path.parse(pathname).ext;
        }

        fs.readFile(pathname, function (err, data) {
            if (err) {
                res.statusCode = 500;
                res.end(`Error getting file - ${err}`);
            } else {
                res.setHeader('Content-type', map[path.parse(pathname).ext] || 'text/plain');
                if (pathname == 'static/index.html') {
                    res.write(`<script>var assets = ${JSON.stringify(walkAssets())};</script>`);
                }
                res.end(data);
            }
        });
    });
}).listen(5500);

function walkAssets(dir='static/assets') {
    var results = [];
    var list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        var stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walkAssets(file));
        } else { 
            results.push(file.substr(6));
        }
    });
    return results;
}

console.log('Listening on http://localhost:5500');