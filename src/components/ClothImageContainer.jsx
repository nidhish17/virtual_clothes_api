import {useRef} from "react";

function ClothImageContainer({classname, setClothImg, clothImg, clothImgUploaded, setClothImgUploaded}) {

    const clothInputRef = useRef(null);
    const handleClothUploadBtn = function () {
        clothInputRef.current.click();
    }
    const handleClothInput = function (e) {
        const file = e.target.files[0];
        if (file) {
            setClothImg({binaryData: file, blobData: URL.createObjectURL(file)});
            setClothImgUploaded(true);
        }
    }
    const handleClothDeleteBtn = function () {
        URL.revokeObjectURL(clothImg.blobData)
        setClothImg({binaryData: null, blobData: null});
        setClothImgUploaded(false);
    }


    return (
        <div className={`${classname} img-container relative`}>
            {clothImgUploaded ?
                <>
                    <img src={`${clothImg.blobData}`} alt={"cloth-image"} className="object-contain w-full h-full"/>
                    <button title="delete image" onClick={handleClothDeleteBtn}
                            className="btn-delete-img">&#x2715;</button>
                </>
                :
                <>
                    <input type="file" hidden={true} accept="image/*" ref={clothInputRef}
                           onChange={handleClothInput}/>
                    <p>upload cloth image here +</p>
                    <button onClick={handleClothUploadBtn} className="btn">upload &uarr;</button>
                </>
            }
        </div>
    );
}

export default ClothImageContainer;
