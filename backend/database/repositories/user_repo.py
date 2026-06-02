from ..connect import async_session
from ..models.user import Users
from sqlalchemy import select, delete

class UserRepository:
    async def find_user_by_id(self, user_id : int) -> Users:
        async with async_session() as session:
            stmt = select(Users).where(Users.id == user_id)
            res = await session.execute(stmt)
            return res.scalars().one_or_none()
        
    async def find_user_by_email(self , email: str) -> Users:
        async with async_session() as session:
            stmt = select(Users).where(Users.email == email)
            res = await session.execute(stmt)
            return res.scalars().one_or_none()
    
    async def create_user(self, username : str ,email : str, password : str):
        async with async_session() as session:
            user = Users(username=username, email=email, password=password)
            session.add(user)
            await session.commit()
            await session.refresh(user)
            return user
    
    async def delete_user_by_user_id(self, user_id : int):
        async with async_session() as session:
            stmt = delete(Users).where(Users.id == user_id)
            res = await session.execute(stmt)
            await session.commit()
            return res.rowcount
    