'use client'

import FileViewer from "@/app/components/Uploader/FileViewer";
import FileUploader from "@/app/components/Uploader/FileUploader";

const UploaderPage = () => {

    return (
        <div>
            <FileUploader/>
            <FileViewer/>
        </div>
    );
};

export default UploaderPage;