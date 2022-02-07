const { Base64Encode } = require('base64-stream');

export const getPicture = (path:string, firebaseApp): Promise<{ isSuccess:boolean, image?:string}> => {

    return new Promise( async (resolve,reject)=> {

    try {
       
        const filepath= '/business/KpqtH1UEFbnnhIneqHA0/logo/thumb@300_logo-image.png' //path;
        console.log(filepath);
        const bucket = firebaseApp.storage().bucket();
    
        const file = bucket.file(filepath);
        const stream = file.createReadStream().pipe(new Base64Encode());
        let finalString = '';; // contains the base64 string
        stream.on('data', (chunk) => {
          finalString += chunk;
      });
      
      stream.on('end', async  () => {
            resolve({
             isSuccess: true,
             image: finalString
         })
      });

    } catch (error) {
        resolve({ isSuccess: false})
    }
})

}