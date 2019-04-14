


var fs = require("fs");
var request = require("request");

var options = { method: 'POST',
  url: 'https://api.kairos.com/enroll',
  headers: 
   { 'Postman-Token': 'f7dc88f7-088a-489c-9630-eb128be56dea',
     'cache-control': 'no-cache',
     app_key: 'e98f222df24d8825f898ffc06ce892c6',
     app_id: '64c9bc0e',
     'Content-Type': 'application/json',
     'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
  formData: 
   { image: 
      { value: 'fs.createReadStream("/Users/Blaze/web/nomades/MobileWebApplication/img/wamSansLunettes.jpg")',
        options: 
         { filename: '/Users/Blaze/web/nomades/MobileWebApplication/img/wamSansLunettes.jpg',
           contentType: null } },
     gallery_name: 'blaze.kalonda@gmail.com',
     subject_id: 'blaze.kalonda@gmail.com' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

