
import fetch from 'node-fetch';

import * as dotenv from 'dotenv';



dotenv.config();

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
        app_key: process.env.app_key,
        app_id: process.env.app_id
      } 
    }).then(res => res.json());
    // request(options, function (error, response, body) {
    //   if (error) throw new Error(error);

    //   console.log(body);
    // });

}
  

}


