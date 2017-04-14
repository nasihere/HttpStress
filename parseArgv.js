function args() {
    let request = 0;
    let min = 500;
    let max = 1000;
    let options = null;
    let loop = false;
    let errorOutput = false;
    let memoryOutput = false;
    let logs = false;
    let csv = false;
    if (process.argv.length > 2){
        process.argv.slice(2).forEach(x=>{
            const param = x.split('=');
            switch(param[0]){
                case "--request":
                    request = parseInt(param[1]);
                    break;
                case "--loop":
                    loop = true
                    break;
                case "--error":
                    errorOutput = true
                    break;
                case "--memory":
                    memoryOutput = true
                    break;
                case "--logs":
                    logs = true
                    break;
                case "--csv":
                    csv = true
                    break;
                case "--time":
                    min = parseInt((param[1] >= 1000) ? 1000 : (param[1] / 3));
                    max = parseInt((param[1] >= 1000) ? param[1] : 1500);
                    break;
                case "--options":
                    const valSplit = param[1].split(',');
                    //host:localhost;port:8000;path:/;method:GET
                    options = {
                        host: valSplit[0].split(':')[1],
                        port: valSplit[1].split(':')[1],
                        path: valSplit[2].split(':')[1],
                        method: valSplit[3].split(':')[1]
                    }


                    break;
            }
        });
    }
    return {
        request: request,
        min: min,
        max: max,
        options: options,
        loop: loop,
        error: errorOutput,
        memory: memoryOutput,
        logs: logs,
        csv: csv
    }
}
module.exports = {
    args
};