import "./App.css";
import ImageContainer from "./components/ImageContainer.jsx";
import ClothImageContainer from "./components/ClothImageContainer.jsx";
import Result from "./components/Result.jsx";
import {useState} from "react";


function App({}) {

    const [clothImg, setClothImg] = useState({binaryData: null, blobData: null});
    const [modelImg, setModelImg] = useState({binaryData: null, blobData: null});

    const [modelImgUploaded, setModelImgUploaded] = useState(false);
    const [clothImgUploaded, setClothImgUploaded] = useState(false);



    return (
        <div className="max-w-x mx-auto">
            <div className="flex gap-8 justify-center mx-8 my-8">
                <ImageContainer className="model-img-container" modelImg={modelImg} setModelImg={setModelImg} modelImgUploaded={modelImgUploaded} setModelImgUploaded={setModelImgUploaded} />
                <ClothImageContainer classname="cloth-img-container" clothImg={clothImg} setClothImg={setClothImg} clothImgUploaded={clothImgUploaded} setClothImgUploaded={setClothImgUploaded} />
            </div>
            <Result clothImg={clothImg.binaryData} modelImg={modelImg.binaryData} imageUploaded={modelImgUploaded && clothImgUploaded} />
        </div>
    );
}

export default App;
