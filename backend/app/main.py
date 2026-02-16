from fastapi import FastAPI
from app.routes.generate import router as generate_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Marketing Content Generator")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for development only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(generate_router)

@app.get("/")
def root():
    return {"message": "API is running"}
