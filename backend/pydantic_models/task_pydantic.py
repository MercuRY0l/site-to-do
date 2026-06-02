from pydantic import BaseModel,Field
from datetime import datetime
from typing import Optional

class TaskCreate(BaseModel):
    priority: str = Field(default="p0")
    title: str = Field(..., min_length=1, max_length=255)
    description: str = Field(..., min_length=1, max_length=512)
    date: datetime
    
class TaskUpdate(BaseModel):
    priority: Optional[str] = None
    title: Optional[str] = None
    description: Optional[str] = None
    date: Optional[datetime] = None