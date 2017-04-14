const cluster = require('cluster');
const http = require('http');
const jobs = require('./jobs');
const TableConsole = require('./TableConsole');
var table = [];
var workers = [];
var wokerList = [];
//TableConsole.renderTable(rows);
var counter = 0;
function callbackHost(obj) {
    process.send({ taskStatus: obj });

}

let noHits = 0;
function parseArgv() {
    let fork = 2;
    if (process.argv.length > 2){
        process.argv.slice(2).forEach(x=>{
            const param = x.split('=');
            switch(param[0]){
                case "--fork":
                    fork = parseInt(param[1]);
                    break;

            }
        });
    }
    return fork;
}
let NumberForks = parseArgv();
if (!jobs.arg.options) {
    jobs.doc.help(jobs.arg);
    return;
}
var worker;
if (cluster.isMaster) {
    NumberForks = (jobs.arg.request <= NumberForks)  ? 1 : NumberForks;
    // console.log(`Master ${process.pid} is running`);
    // Fork jobss.
    let hitReq = 0;
    for (let i = 0; i < NumberForks; i++) {
        worker = cluster.fork();
        wokerList.push(worker.process.pid);


        worker.on('message', function(msg) {
            // we only want to intercept messages that have a chat property
            hitReq++;
            if (msg.taskStatus) {
                const obj = msg.taskStatus;
                table[`Worker-${obj.workerID}`] = {
                    workerID: obj.workerID,
                    Success: (obj.Success === 0) ? '-' : obj.Success,
                    fail: (obj.Failure === 0) ? '-' : obj.Failure,
                    percentage: obj.percentage

                };
                if (hitReq === jobs.arg.request) {
                    let rows = [];
                    for (let i=0; i <= wokerList.length - 1; i++) {
                        rows.push(table[`Worker-${wokerList[i]}`])
                    }
                    TableConsole.renderTable(rows);
                }

            }
        });
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {


    // Workers can share any TCP connection
    // In this case it is an HTTP server
    jobs.GoodWorker(callbackHost, process.pid, (jobs.arg.request / NumberForks), jobs.arg.min, jobs.arg.max);

    // console.log(`Worker ${process.pid} started`);
}