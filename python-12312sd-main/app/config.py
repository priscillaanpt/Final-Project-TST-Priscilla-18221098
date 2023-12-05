from urllib.parse import quote_plus
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
import os
DATABASE_URL = "postgresql://postgres:eFA-BF4c4*3FgcD5Ef*F6D1E1*2-C5EB@roundhouse.proxy.rlwy.net:25014/railway?sslmode=require"
print(DATABASE_URL)
DATABASE_PASSWORD = "postgres"
ENCODED_PASSWORD = quote_plus(DATABASE_PASSWORD)

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()