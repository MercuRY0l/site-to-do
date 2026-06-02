from .base import Base
from datetime import datetime
from sqlalchemy import Integer, String, DateTime, Float, func, ForeignKey
from sqlalchemy.orm import DeclarativeBase, mapped_column, Mapped, relationship

from ..models.task import Tasks

class Users(Base):
    __tablename__ = "users"
    
    id : Mapped[int] = mapped_column(Integer, primary_key=True)
    username : Mapped[str] = mapped_column(String(255), nullable=False , unique=True)
    email : Mapped[str] = mapped_column(String(255), nullable=False, unique=True)
    password : Mapped[str] = mapped_column(String(255) , nullable=False)
    created_at : Mapped[datetime] = mapped_column(DateTime, nullable=False, default=func.now())

    profile : Mapped["UsersProfiles"] = relationship("UsersProfiles", back_populates="user", uselist=False)

    tasks: Mapped[list["Tasks"]] = relationship(
        "Tasks",
        back_populates="user",
        cascade="all, delete-orphan"
    )
    
class UsersProfiles(Base):
    __tablename__ = "users_profiles"

    id : Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id : Mapped[int] = mapped_column(Integer, ForeignKey("users.id"), nullable=False , unique=True)
    name : Mapped[str] = mapped_column(String(255), nullable=False)
    age : Mapped[int] = mapped_column(Integer, nullable=False)
    height : Mapped[int] = mapped_column(Integer , nullable=False)
    weight : Mapped[int] = mapped_column(Integer, nullable=False)
    gender : Mapped[str] = mapped_column(String(255), nullable=False)
    goal : Mapped[str] = mapped_column(String(255), nullable=False)
    created_at : Mapped[datetime] = mapped_column(DateTime, nullable=False, default=func.now())
    
    user : Mapped["Users"] = relationship("Users", back_populates="profile")
    
