function help(arg) {
    if (!arg.options) {
        console.log('Required Parameter');
        console.log('-'.repeat(50));
        console.log('1. --options=host:localhost,port:8000,path:/users,method:GET');
        console.log('2. --time=3000 \n3. --request=2000');
        console.log('4. --fork=10');
        console.log('e.g: node milionworker.js --options=host:localhost,port:8000,path:/users,method:GET --request=2000 --time=3000 ')

        console.log('-'.repeat(50));

        console.log('Optional Parameter');
        console.log('1. --loop');
        console.log('2. --error');
        console.log('3. --logs');
        return;
    }
}
module.exports = {
    help
}

//output:
/*
 * node worker.js --request=2000 --time=3000 --options=host:localhost,port:8000,path:/users,method:GET
 * node worker.js --request=2000 --time=3000 --options=host:users.ceh.dit.paascloud.oneadp.com,port:80,path:/users,method:GET
 * node worker.js --request=2000 --time=3000 --options=host:autopay.ceh.dit.paascloud.oneadp.com,port:80,path:/Deductions/APL2/MR5,method:GET
 * */

