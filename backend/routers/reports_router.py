from fastapi import APIRouter, HTTPException, Response, Depends, Request
from fastapi.templating import Jinja2Templates

from .deps import get_current_user

reports_router = APIRouter()

templates = Jinja2Templates("frontend/templates")

@reports_router.get("/reports")
async def get_reports_page(request : Request, current_user = Depends(get_current_user)):
    return templates.TemplateResponse(request=request, name="reports.html", context={"request" : request,
                                                                                     "user" : current_user})
