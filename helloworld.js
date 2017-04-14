const cluster = require('cluster');
const http = require('http');

let noHits = 0;
function parseArgv() {
    let cpu = 2;
    if (process.argv.length > 2){
        process.argv.slice(2).forEach(x=>{
            const param = x.split('=');
            switch(param[0]){
                case "--fork":
                    cpu = parseInt(param[1]);
                    break;

            }
        });
    }
    return cpu;
}
const numCPUs = parseArgv();
if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    http.createServer((req, res) => {
        res.writeHead(200);
        console.log('WorkerId:' + process.pid, 'Request Hits ' + noHits++);
        res.end('hello world\n');
    })
    .listen(8000);

    process.on('uncaughtException', function(e){
        console.log('WorkerId:' + process.pid, 'error:' + e);
    });
    console.log(`Worker ${process.pid} started`);
}