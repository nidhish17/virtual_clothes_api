import {useRef, useState} from "react";

function ImageContainer({className, modelImg, setModelImg, modelImgUploaded, setModelImgUploaded}) {
    const modelInputRef = useRef(null);
    const handleModelUploadBtn = function () {
        modelInputRef.current.click();
    }
    const handleModelInput = function (e) {
        const file = e.target.files[0];
        if (file) {
            setModelImg({binaryData: file, blobData: URL.createObjectURL(file)});
            setModelImgUploaded(true);
        }
    }

    const handleModelDeleteBtn = function () {
        URL.revokeObjectURL(modelImg.blobData)
        setModelImg({binaryData: null, blobData: null});
        setModelImgUploaded(false);
    }

    return (
        <div className={`img-container relative ${className}`}>
            {modelImgUploaded ?
                <>
                    <img src={modelImg.blobData} alt={"model-img"} className="relative object-contain w-full h-full"/>
                    <button title="delete image" onClick={handleModelDeleteBtn}
                            className="btn-delete-img">&#x2715;</button>
                </>
                :
                <>
                    <input type="file" hidden={true} accept="image/*" ref={modelInputRef}
                           onChange={handleModelInput}/>
                    <p className="">Upload Model Image here +</p>
                    <button onClick={handleModelUploadBtn} className="btn">upload &uarr;</button>
                </>
            }
        </div>
    );
}

export default ImageContainer;
