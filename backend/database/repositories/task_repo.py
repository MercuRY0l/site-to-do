from datetime import datetime,time
from ..connect import async_session
from ..models.task import Tasks
from sqlalchemy import select, delete, update as sql_update, desc , asc


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
            stmt = sql_update(Tasks).where(Tasks.id == id).values(is_completed = True, completed_date = datetime.now())
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
            stmt = select(Tasks).where(Tasks.id == id, 
                                       Tasks.is_completed == False)
            res = await session.execute(stmt)
            return res.scalar_one_or_none()
    
    async def get_all(self, user_id : int) -> Tasks:
        async with async_session() as session:
            stmt = select(Tasks).where(Tasks.user_id == user_id, 
                                       Tasks.is_completed == False)
            res = await session.execute(stmt)
            return res.scalars().all()
    
    async def get_today(self, user_id : int) -> Tasks:
        async with async_session() as session:
            
            today = datetime.today().date()
            start = datetime.combine(today, time.min)
            end = datetime.combine(today, time.max)
            
            stmt = select(Tasks).where(Tasks.user_id == user_id, 
                                       Tasks.date.between(start,end), 
                                       Tasks.is_completed == False)
            res = await session.execute(stmt)
            return res.scalars().all()
        
    async def get_future(self, user_id: int):
        async with async_session() as session:

            today = datetime.today().date()
            start = datetime.combine(today, time.max)

            stmt = select(Tasks).where(
                Tasks.user_id == user_id,
                Tasks.date > start, 
                Tasks.is_completed == False
            )

            res = await session.execute(stmt)
            return res.scalars().all()
        
        
    async def get_completed(self, user_id : int):
        async with async_session() as session:
            
            stmt = select(Tasks).where(Tasks.is_completed == True, 
                                       Tasks.user_id == user_id, 
                                       )
            res = await session.execute(stmt)
            return res.scalars().all()
        
    async def get_search_tasks(self, q : str):
        async with async_session() as session:
            stmt = select(Tasks).where(Tasks.title.ilike(f"%{q}%"), Tasks.is_completed == False).limit(10)
            res = await session.execute(stmt)
            return res.scalars().all()
            
    async def get_sorted_tasks(self, user_id : int, sort : str):
        async with async_session() as session:
            
            stmt = select(Tasks).where(Tasks.user_id == user_id, Tasks.is_completed == False)
            
            if sort == "priority_desc":
                stmt = stmt.order_by(desc(Tasks.priority))
                
            elif sort == "priority_asc":
                stmt = stmt.order_by(asc(Tasks.priority))
                
            elif sort == "date_desc":
                stmt = stmt.order_by(desc(Tasks.date))
            
            elif sort == "date_asc":
                stmt = stmt.order_by(asc(Tasks.date))
                
                
            res = await session.execute(stmt)
            return res.scalars().all()