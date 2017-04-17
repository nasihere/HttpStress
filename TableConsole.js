var Table = require('tty-table');
var chalk = require('chalk');

var header = [
    {
        alias : "Worker",
        value : "workerID",
        headerColor : "cyan",
        color: "white",
        align : "left",
        width : 30
    },
    {
        value : "Success",
        width : 10,
        formatter : function(value){
            var str = value;
                str = chalk.green(str);

            return str;
        }
    },
    {
        alias : "Fail",
        value : "fail",
        width : 10,
        formatter : function(value){
            var str = value;
            str = chalk.red(str);

            return str;
        }
    },
    {
        alias : "%",
        value : "percentage",
        width : 15
    }
];
//
// //Example with arrays as rows
// var rows = [
//     // ["594822",2000,2,0],
//     // ["594823",2000,0,0],
//     // ["594824",2000,0,0],
//     // ["594827",1000,1000,0],
//     // ["594828",500,1500,0],
//     // ["594829",100,1900, 100]
// ];



function renderTable(statusRows){
    let rows = statusRows;
    let footer = [
        "TOTAL",
        (function(){
            return rows.reduce(function(prev,curr){
                return prev+parseInt(curr.Success)
            },0)
        }()),
        (function(){
            return rows.reduce(function(prev,curr){
                return prev+((curr.fail==='-') ? 0 : curr.fail);
            },0);
        }()),
        (function(){
            var total = rows.reduce(function(prev,curr){
                return prev+parseInt(curr.percentage)
            },0);
            return (total/(rows.length*1)).toFixed(2) + "%";
        }())];

    var t1 = Table(header,statusRows,footer,{
        borderStyle : 1,
        borderColor : "blue",
        paddingBottom : 0,
        headerAlign : "center",
        align : "center",
        color : "white"
    });
    console.log(t1.render());
}
// renderTable(rows);
module.exports = {
    renderTable
}
