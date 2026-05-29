
import uvicorn

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

from backend.routers.main_page_router import main_page_router
from backend.routers.registration_router import reg_router
from backend.routers.login_router import login_router
from backend.routers.logout_router import logout_router
from backend.routers.refresh_token_router import refresh_token_router   

app = FastAPI()

app.mount("/static", StaticFiles(directory="./frontend/static"), name="static")

app.include_router(main_page_router)
app.include_router(login_router)
app.include_router(reg_router)
app.include_router(refresh_token_router)
app.include_router(logout_router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


if __name__ == "__main__":
    uvicorn.run(app, port=8000)

