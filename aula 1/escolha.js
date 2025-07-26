import { createServer } from "http";
import { parse } from "url";
import { readFile } from "fs";

createServer( (req, res) => {
    let q = parse(req.url, true);
    console.log(q);
    let fileName = "./aula 1/" + q.pathname;
    console.log(fileName);

    readFile(fileName, (err, data) => {
        console.log(err);
        if(err) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end("404 NOT FOUND");
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    })
}).listen(8080);