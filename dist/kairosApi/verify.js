"use strict";
var fs = require("fs");
var request = require("request");
var options = { method: 'POST',
    url: 'https://api.kairos.com/verify',
    headers: { 'Postman-Token': '18d05033-df02-4dcf-b7d3-ffe762830e3d',
        'cache-control': 'no-cache',
        app_key: 'e98f222df24d8825f898ffc06ce892c6',
        app_id: '64c9bc0e',
        'Content-Type': 'application/json',
        'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
    formData: { image: { value: 'fs.createReadStream("/Users/Blaze/web/nomades/MobileWebApplication/img/wamAvecLunettes.jpg")',
            options: { filename: '/Users/Blaze/web/nomades/MobileWebApplication/img/wamAvecLunettes.jpg',
                contentType: null } },
        gallery_name: 'blaze.kalonda@gmail.com',
        subject_id: 'blaze.kalonda@gmail.com' } };
request(options, function (error, response, body) {
    if (error)
        throw new Error(error);
    console.log(body);
});
