


export const APP_CONSTANTS = {

    loginUrl: "https://gulfcollege.ind-cloud.everdata.com",
    serverUrl: "https://gulfcollege.ind-cloud.everdata.com"
};

/** */

export const getCameraOptions = (dType: number, sType: number, eType: number) => {

    return {
        quality: 30,
        destinationType: dType,  // 0-DATA-URL, 1-FILE-URI
        sourceType: sType,       // 0-PHOTOLIBRARY, 1- CAMERA
        encodingType: eType,     // 0-JPEG, 1-PNG
        allowEdit: true,
        correctOrientation: true
    }
}


export const checkCompatibleFile = (fileName: string) => {

    let type = fileName.slice(fileName.lastIndexOf('.') + 1);
    return type == "pdf" || type == "jpg" || type == "jpeg" || type == "png" || type == "doc" || type == "docx" || type == "txt";
}


export const fileUploadOptions = (name: string, mimeType: string = "multipart/form-data", method: string = "POST") => {

    console.log(mimeType);
    console.log(method);
    
    
    return {
        fileKey: 'file',
        fileName: name,
        mimeType: mimeType,
        chunkedMode: false,
        httpMethod: method,
        headers: {
            'Authorization': 'Bearer' + localStorage.getItem('access_token')
        }
    }

}




