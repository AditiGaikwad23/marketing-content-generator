from fastapi import APIRouter
from app.models.schemas import ContentRequest
from app.services.llm_service import generate_content

router = APIRouter()

@router.post("/generate")
async def generate_marketing_content(request: ContentRequest):
    content = generate_content(request)
    return {"content": content}
