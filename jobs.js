const task = require('./task');
const parse = require('./parseArgv');
const arg = parse.args();
const doc = require('./help');
function RegisterWorker(callbackHost, request, workerId, interval) {
    if (arg.loop === true) {
        setInterval(function() {
            task.makeCall(callbackHost, request, arg.options, workerId, arg.error, arg.memory, arg.logs, arg.csv);
        },interval);
    }
    else {
        setTimeout(function() {
            task.makeCall(callbackHost, request, arg.options, workerId, arg.error, arg.memory, arg.logs, arg.csv);
        },interval);
    }
}

function GoodWorker(callbackHost, workerId, request, min, max){
    for (let i=0; i <= request; i ++) {
        RegisterWorker(callbackHost, request, workerId, Math.floor(Math.random() * (max - min + 1)) + min);
    }
}

module.exports = {
    doc,
    arg,
    GoodWorker
}