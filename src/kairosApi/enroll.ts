
import fetch from 'node-fetch';

export class enroll {


  static register (image, userId){

    const body = {
      image: image,
      subject_id: userId,
      gallery_id: userId,
    };
    return fetch('https://api.kairos.com/enroll',  { 
      method: 'POST', 
      body: JSON.stringify(body), 
      headers: { 
        'Content-Type': 'application/json',
        app_key: 'e98f222df24d8825f898ffc06ce892c6',
        app_id: '64c9bc0e'
      } 
    }).then(res => res.json());
    // request(options, function (error, response, body) {
    //   if (error) throw new Error(error);

    //   console.log(body);
    // });

}
  

}


