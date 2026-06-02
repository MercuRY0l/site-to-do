

from fastapi import APIRouter, HTTPException, Response, Depends, Request
from fastapi.templating import Jinja2Templates

from ..database.repositories.task_repo import TaskRepository

from ..pydantic_models.task_pydantic import TaskCreate

from .deps import get_current_user

task_router = APIRouter()

templates = Jinja2Templates("frontend/templates")


@task_router.get("/task/{task_id}")
async def get_task(task_id : int, current_user = Depends(get_current_user)):
    repo = TaskRepository()
    task = await repo.get_by_id(task_id)
    
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    if task.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Forbidden") 
    
    return {
        "id" : task.id,
        "title" : task.title,
        "description" : task.description,
        "priority" : task.priority
    }


@task_router.get("/tasks")
async def get_tasks(current_user = Depends(get_current_user)):
    repo = TaskRepository()
    tasks = await repo.get_all(user_id = current_user.id)
    
    return [{
        "id" : task.id,
        "title" : task.title,
        "description" : task.description,
        "priority" : task.priority
    } for task in tasks]
    

@task_router.post("/task/create")
async def create_task(task : TaskCreate, current_user = Depends(get_current_user)):
    repo = TaskRepository()
    return await repo.create(user_id=current_user.id, priority=task.priority, title=task.title, description=task.description, date=task.date)
    
@task_router.delete("/task/delete/{task_id}")
async def delete_task(task_id : int, current_user = Depends(get_current_user)):
    repo = TaskRepository()
    await repo.delete(id=task_id)

@task_router.patch("/task/edit/{task_id}")
async def edit_task(task_id : int, current_user = Depends(get_current_user), **data):
    repo = TaskRepository()
    await repo.update(id=task_id, data=data)

