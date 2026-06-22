

from fastapi import APIRouter, HTTPException, Response, Depends, Request, Query
from fastapi.templating import Jinja2Templates

from ..database.repositories.task_repo import TaskRepository

from ..pydantic_models.task_pydantic import TaskCreate,TaskUpdate

from .deps import get_current_user

from datetime import timedelta,datetime

task_router = APIRouter()

templates = Jinja2Templates("frontend/templates")

@task_router.get("/today")
async def get_today_task_page(request : Request, current_user = Depends(get_current_user)):
    return templates.TemplateResponse(request=request, name="/tasks/today.html", context={"request" : request, 
                                                                               "user" : current_user})
    
@task_router.get("/tasks/today")
async def get_tasks_today(current_user = Depends(get_current_user)):
    repo = TaskRepository()
    tasks = await repo.get_today(user_id=current_user.id)
    
    return [{
        "id" : task.id,
        "title" : task.title,
        "description" : task.description,
        "priority" : task.priority
    } for task in tasks]

@task_router.get("/future")
async def get_future_task_page(request : Request, current_user = Depends(get_current_user)):
    return templates.TemplateResponse(request=request, name="/tasks/future.html", context={"request" : request, 
                                                                               "user" : current_user})

@task_router.get("/tasks/future")
async def get_tasks_future(current_user = Depends(get_current_user)):
    repo = TaskRepository()
    tasks = await repo.get_future(user_id=current_user.id)
    
    return [{
        "id" : task.id,
        "title" : task.title,
        "description" : task.description,
        "priority" : task.priority
    } for task in tasks]

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
async def edit_task(task_id : int, task : TaskUpdate,current_user = Depends(get_current_user)):
    repo = TaskRepository()
    await repo.update(id=task_id, **task.model_dump(exclude_unset=True))


@task_router.get("/tasks/filter")
async def get_filtered_tasks(priority: str | None = Query(None),
    status: str | None = Query(None),
    date_filter: str | None = Query(None),
    current_user = Depends(get_current_user)):

    repo = TaskRepository()

    tasks = await repo.get_all(user_id=current_user.id)

    now = datetime.now()

    if priority:
        tasks = [task for task in tasks if task.priority == priority]

    if status:
        if status == "active":
            tasks = [task for task in tasks if not task.completed]
        elif status == "done":
            tasks = [task for task in tasks if task.completed]

    if date_filter:
        today = now.date()

        if date_filter == "today":
            tasks = [
                task for task in tasks
                if task.date and task.date.date() == today
            ]

        elif date_filter == "tomorrow":
            tomorrow = today + timedelta(days=1)

            tasks = [
                task for task in tasks
                if task.date and task.date.date() == tomorrow
            ]

        elif date_filter == "overdue":
            tasks = [
                task for task in tasks
                if task.date and task.date < now
            ]

    return [
        {
            "id": task.id,
            "title": task.title,
            "description": task.description,
            "priority": task.priority
        }
        for task in tasks
    ]


@task_router.get("/tasks/search/{q}")
async def get_search(q : str, current_user = Depends(get_current_user)):
    repo = TaskRepository()
    
    tasks = await repo.get_search_tasks(q=q)
    
    if not tasks:
        raise HTTPException(status_code=404, detail="Searched tasks not found")
    
    return [{
        "id" : t.id,
        "title" : t.title,
        "description" : t.description,
        "priority" : t.priority,
        "date" : t.date
    } for t in tasks]