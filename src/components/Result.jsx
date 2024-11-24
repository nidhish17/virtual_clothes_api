import {useState} from "react";
import Loader from "./Loader.jsx";

function Result({clothImg, modelImg, imageUploaded}) {

    const [resultImage, setResultImage] = useState(null);
    const [loading, setIsLoading] = useState(false);

    const handleSubmit = async function () {
        if (!imageUploaded) {
            alert("Please upload both the images");
            return;
        }

        const formData = new FormData();
        formData.append("model_image", modelImg);
        formData.append("cloth_image", clothImg);

        try {
            setIsLoading(true);
            const response = await fetch("http://127.0.0.1:8000/process-image", {
                method: "POST",
                body: formData,
            })
            const data = await response.json();
            setResultImage(data.data);
            console.log(data, data.data)
        } catch (err) {
            alert(err);
        } finally {
            setIsLoading(false)
        }


    }


    return (
        <div className="mx-8">
            <button onClick={handleSubmit} disabled={loading} className="w-full btn btn-process disabled:cursor-not-allowed disabled:bg-gray-500 disabled:animate-pulse">
                Submit
            </button>
            <div className="rounded flex justify-center items-center my-10 h-result-container">
                {loading ? <Loader />
                    :
                    resultImage && <img src={`data:image/jpeg;base64,${resultImage}`} alt="result-img" className="rounded object-contain w-1/2 h-full border-2 border-dashed"/>
                }
            </div>
        </div>
    );
}

export default Result;

//frontend implemented using react