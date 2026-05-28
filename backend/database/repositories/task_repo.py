from datetime import datetime
from ..connect import async_session
from ..models.task import Tasks
from sqlalchemy import select, delete, update as sql_update

class TaskRepository():
    async def create(priority : str, title : str, description : str, date : datetime) -> Tasks:
        async with async_session() as session:
            task = Tasks(priority=priority, title=title, description=description, date=date)
            await session.add(task)
            await session.commit()
            await session.refresh(task)
            return task
            
    
    async def delete(id : int):
        async with async_session() as session:
            stmt = delete(Tasks).where(Tasks.id == id)
            res = await session.execute(stmt)
            await session.commit()
            return res.rowcount
    
    async def update(id : int, **data):
        async with async_session() as session:
            stmt = sql_update(Tasks).where(Tasks.id == Tasks.id).values(**data)
            await session.execute(stmt)
            await session.commit()
            return True
    
    async def get_by_id(id : int) -> Tasks:
        async with async_session() as session:    
            stmt = select(Tasks).where(Tasks.id == id)
            res = await session.execute(stmt)
            return res.scalar_one_or_none()
    