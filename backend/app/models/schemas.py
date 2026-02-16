from pydantic import BaseModel

class ContentRequest(BaseModel):
    topic: str
    platform: str
    tone: str
