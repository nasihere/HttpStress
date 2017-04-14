var http = require("http");

//Don't output:
/*
 * --options=host:localhost,port:8000,path:/,method:GET
 * --options=host:users.ceh.dit.paascloud.oneadp.com,port:80,path:/users,method:GET
 * --options=host:autopay.ceh.dit.paascloud.oneadp.com,port:80,path:/Deductions/APL2/MR5,method:GET
 *
* */

var exports = module.exports = {};
var counter = {
    success: 0,
    error: 0,
    request: -1
}
const percentage = (requests, attempt) => {
    if (requests === 0) return 100;
    return ((attempt/(requests)) * 100).toFixed(0);
}

exports.makeCall = function(callbackHost, request, req, workerID, error, memory, logs, csv) {
    var self = this;
    var req = http.request(req, function(res) {
        // console.log('STATUS: ' + res.statusCode);
        // console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            // console.log('Request: ' + request, 'Success: ' + counter.success++, 'Error: ' + counter.error)
            // console.log(chunk);
        });
        res.on('end', function (chunk) {

            if (logs == true) {
                console.log('WorkerId: '+workerID, 'Request: ' + request, 'Success: ' + counter.success, 'Failure: ' + counter.error, '%: ' + percentage(request, counter.success))
            }
            if (csv) {
                const mem = process.memoryUsage();
                console.log(new Date().toLocaleTimeString()+','+mem.rss +','+mem.heapUsed);
            }

            counter.success++;
            callbackHost({
                workerID: workerID,
                Success: counter.success,
                Failure: counter.error,
                percentage: percentage(request, counter.success)
            });
            // console.log(chunk);
        });
    });

    req.on('error', function(e) {
        if (logs) {
            console.log('WorkerId: ' + workerID, 'Request: ' + request, 'Success: ' + counter.success, 'Failure: ' + counter.error, '%: ' + percentage(request, counter.success));
        }
        if (error){
            console.log(e);
        }
        if (memory){
            console.log(process.memoryUsage());
        }
        if (csv) {
            const mem = process.memoryUsage();
            console.log(new Date().toLocaleTimeString()+','+mem.rss +','+mem.heapUsed);
        }
        callbackHost({
            workerID: workerID,
            Success: counter.success,
            Failure: counter.error,
            percentage: percentage(request, counter.success)
        });
        counter.error++;
    });

// write data to request body
// req.write('data\n');
// req.write('data\n');
    req.end();
    // request++;
}