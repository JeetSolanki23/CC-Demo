from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

API_VERSION = "v1.0"

app = FastAPI(title="Cloud Demo API", version=API_VERSION)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/hello")
def hello():
    return {
        "message": "Hello from Azure",
        "version": API_VERSION,
        "status": "success",
    }
