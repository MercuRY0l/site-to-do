from datetime import datetime
from ..connect import async_session
from ..models.task import Tasks
from sqlalchemy import select, delete, update as sql_update

class TaskRepository():
    async def create(self, user_id : int ,priority : str, title : str, description : str, date : datetime) -> Tasks:
        async with async_session() as session:
            task = Tasks(user_id=user_id, priority=priority, title=title, description=description, date=date)
            session.add(task)
            await session.commit()
            await session.refresh(task)
            return task
            
    
    async def delete(self, id : int):
        async with async_session() as session:
            stmt = delete(Tasks).where(Tasks.id == id)
            res = await session.execute(stmt)
            await session.commit()
            return res.rowcount
    
    async def update(self, id : int, **data):
        async with async_session() as session:
            stmt = sql_update(Tasks).where(Tasks.id == id).values(**data)
            await session.execute(stmt)
            await session.commit()
            return True
    
    async def get_by_id(self, id : int) -> Tasks:
        async with async_session() as session:    
            stmt = select(Tasks).where(Tasks.id == id)
            res = await session.execute(stmt)
            return res.scalar_one_or_none()
    
    async def get_all(self, user_id : int) -> Tasks:
        async with async_session() as session:
            stmt = select(Tasks).where(Tasks.user_id == user_id)
            res = await session.execute(stmt)
            return res.scalars().all()
            