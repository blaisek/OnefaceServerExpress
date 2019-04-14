declare var fs: any;
declare var request: any;
declare var options: {
    method: string;
    url: string;
    headers: {
        'Postman-Token': string;
        'cache-control': string;
        app_key: string;
        app_id: string;
        'Content-Type': string;
        'content-type': string;
    };
    formData: {
        image: {
            value: string;
            options: {
                filename: string;
                contentType: any;
            };
        };
        gallery_name: string;
        subject_id: string;
    };
};
