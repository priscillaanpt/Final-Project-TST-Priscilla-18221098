from fastapi import FastAPI
from fastapi import Depends
from sqlalchemy.orm import Session
from app.config import SessionLocal, Base, engine
from app.schemas import (ClothingProductSchema, ClothingReviewSchema, UserSchema,
                     ClothingProductListSchema, ClothingReviewListSchema, UserListSchema)
from app.routes import router
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

app = FastAPI()

# Menambahkan router yang telah dibuat sebelumnya
app.include_router(router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Inisialisasi database
Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, port=8000)
