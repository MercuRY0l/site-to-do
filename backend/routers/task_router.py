

from fastapi import APIRouter, HTTPException, Response, Depends, Request
from fastapi.templating import Jinja2Templates

from ..database.repositories.task_repo import TaskRepository

from ..pydantic_models.task_pydantic import TaskCreate

from .deps import get_current_user

task_router = APIRouter()

templates = Jinja2Templates("frontend/templates")


@task_router.post("/task/create")
async def create_task(task : TaskCreate, current_user = Depends(get_current_user)):
    repo = TaskRepository()
    return await repo.create(priority=task.priority, title=task.title, description=task.description, date=task.date)
    
@task_router.delete("/task/delete/{task_id}")
async def delete_task(task_id : int, current_user = Depends(get_current_user)):
    repo = TaskRepository()
    await repo.delete(id=task_id)

@task_router.patch("/task/edit")
async def edit_task(task_id : int, current_user = Depends(get_current_user), **data):
    repo = TaskRepository()
    await repo.update(id=task_id, data=data)

