
import fetch from 'node-fetch';
import * as dotenv from 'dotenv';



dotenv.config();

export class detect {


  static getFaces (image:any){

    const body = {
      image,
      selector: 'ROLL',
    };
    return fetch('https://api.kairos.com/detect',  { 
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


