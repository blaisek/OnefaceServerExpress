
const {hello,obj} = require('./hello')

const fetch = require('node-fetch'); 

fetch('https://nzeni.ch')
.then(res => res.text())
.then(body => console.log(body))
.catch(err => console.log(err))

const hello = require('./hello')
const obj = require('./hello')

hello.hello()

console.log(obj.obj.val1);
 

