import { Injectable } from '@angular/core';


/**THIS SERVICE CONTAINS METHODS RELATED TO CHOOSING THE FILE
 * USED AT: 
 * 1) edit planner component,
 * 2) new planner component
 */
@Injectable()
export class FileSelectService {

    constructor() { }

    chooseFile(thisRef:any) {

        /**We Want the file path to be native(i.e starting with file://)
         * so that we can extract the file name and type from the path.
         * Hence resolve the url when recieved as starting with content:// 
         */
        thisRef.fileChooser.open()
            .then(uri => {
                if (uri.startsWith("content://")) {

                    thisRef.filePath.resolveNativePath(uri)
                        .then(nativeUri => {

                            thisRef.file = nativeUri;
                            // console.log(nativeUri);
                            thisRef.image = null;
                            thisRef.fileName = thisRef.file.split('/').pop();
                            this.checkCompatibleFile(thisRef.fileName,thisRef);

                        }, (err: any) => {
                            /**files path from google drive are not convertable to native path */
                            let errMsg = err.message + "\nYou might be uploading a file from cloud/Google drive";
                            thisRef.customService.showToast(errMsg);
                        });
                } else {

                    thisRef.file = uri;
                    thisRef.image = null;
                    thisRef.fileName = thisRef.file.split('/').pop();

                    thisRef.checkCompatibleFile(thisRef.fileName);

                }
            }, (err: any) => {
                // console.log('inside 2nd clllll');

                alert('Unable to Choose the file at the moment');
            })
            .catch(e => {
                // console.log('inside catch//////');

                alert(JSON.stringify(e));
            });
    }

    private checkCompatibleFile(name: string,thisRef:any) {
        let type = name.slice(name.lastIndexOf('.') + 1);
        if (!(type == "pdf" || type == "jpg" || type == "jpeg" || type == "png" || type == "doc" || type == "docx" || type == "txt")) {
            thisRef.file = null;
            thisRef.customService.showToast('Unsupported File Type');
        }
    }

    
}