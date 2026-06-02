from pydantic import BaseModel,Field
from datetime import datetime

class TaskCreate(BaseModel):
    priority: str = Field(default="p0")
    title: str = Field(..., min_length=1, max_length=255)
    description: str = Field(..., min_length=1, max_length=512)
    date: datetime