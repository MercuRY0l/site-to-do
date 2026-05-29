

from fastapi import APIRouter, Request, Depends
from fastapi.templating import Jinja2Templates
from fastapi.responses import RedirectResponse

from .deps import get_current_user_optional

main_page_router = APIRouter()

templates = Jinja2Templates("frontend/templates")

@main_page_router.get("/")
async def load_main_page(request : Request, user = Depends(get_current_user_optional)):
    
    if not user:
        return RedirectResponse("/auth/login", status_code=303)
    
    return templates.TemplateResponse(request=request, name="index.html", context={"request" : request, 
                                                                                   "user" : user})

