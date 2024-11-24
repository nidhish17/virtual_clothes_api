from fastapi import FastAPI, UploadFile, File
from helpers import image_binary_data_to_base64
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import httpx
import os

app = FastAPI()

app.mount("/static", StaticFiles(directory="./static"), name="static")

@app.get("/")
async def home():
    return FileResponse("static/index.html")


@app.post("/process-image")
async def process_images(model_image: UploadFile=File(...), cloth_image: UploadFile=File(...)):
    model_image_data = await model_image.read()
    cloth_image_data = await cloth_image.read()

    model_image_base64 = image_binary_data_to_base64(model_image_data)
    cloth_image_base64 = image_binary_data_to_base64(cloth_image_data)

    api_key = os.environ.get("API_KEY")

    url = "https://api.segmind.com/v1/try-on-diffusion"
    data = {
        "model_image": model_image_base64,
        "cloth_image": cloth_image_base64,
        "category": "Upper body",
        "num_inference_steps": 35,
        "guidance_scale": 2,
        "seed": 12467,
        "base64": False
    }
    headers = {'x-api-key': api_key}


    async with httpx.AsyncClient(timeout=180) as client:
        response = await client.post(url=url, json=data, headers=headers)

    response_base64 = image_binary_data_to_base64(response.content)
    return {"message": "Processing successful", "data": response_base64}

@app.get("/health-test")
async def health():
    return {"data": "health check"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)


#backend server!

