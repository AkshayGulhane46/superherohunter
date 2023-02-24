const { MD5 } = require("crypto-js");
var md5 = require("crypto-js");
//var timestamp = new Date();
//console.log(timestamp)

var privateKey = 'cf26533f8ebf5e23689e337ca421555adadc919e'
var publicKey = '6975c12f0f2ae6702c6d26349ef557fc'

timestamp = 20230223;

console.log(MD5(timestamp+privateKey+publicKey).toString());