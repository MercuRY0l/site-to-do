from .base import Base
from datetime import datetime
from sqlalchemy import Integer, String, DateTime, Float, func, ForeignKey
from sqlalchemy.orm import DeclarativeBase, mapped_column, Mapped, relationship

class Tasks(Base):
    __tablename__ = "tasks"
    
    id : Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id : Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    priority : Mapped[str] = mapped_column(String, default="p0")
    title : Mapped[str] = mapped_column(String(255), nullable=False)
    description : Mapped[str] = mapped_column(String(512), nullable=False)
    date : Mapped[datetime] = mapped_column(DateTime, default=func.now())
    
    user = relationship("Users", back_populates="tasks")
