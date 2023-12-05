from jose import JWTError, jwt
from datetime import datetime, timedelta
from fastapi import HTTPException, status, Depends
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer
from app.config import SessionLocal
from app.crud import get_user_by_id
import os
SECRET_KEY = os.getenv("SECRET_KEY")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
def createJWT(user_id):
    data = {
        "user_id" : user_id,
        "exp" : datetime.utcnow() + timedelta(days=7)
    }

    return jwt.encode(data, SECRET_KEY, "HS256")
def parseJWT(token):
    try:
        data = jwt.decode(token, SECRET_KEY, "HS256")
    except Exception as e:
        return None
    return data.get("user_id")
def get_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    id = parseJWT(token)
    if (id == None):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized", headers={"WWW-Authenticate": "Bearer"})
    user = get_user_by_id(db, id)
    return user
    