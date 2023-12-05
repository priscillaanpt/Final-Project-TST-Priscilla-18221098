from pydantic import BaseModel
from typing import List, Optional
from app.models import StatusOrder
from datetime import datetime
class ClothingProductSchema(BaseModel):
    id: Optional[int] = None
    name: str
    description: str
    price: int
    class Config:
        from_attributes = True
        orm_mode = True

class ClothingReviewSchema(BaseModel):
    id: Optional[int] = None
    user_id: Optional[int]
    product_id: Optional[int]
    rating: int
    review_text: str
    class Config:
        from_attributes = True
        orm_mode = True
class ClothingOrderSchema(BaseModel):
    id: Optional[int] = None
    product_id: Optional[int]
    order_status : StatusOrder
    order_date: datetime
    quantity: int
    total_price: Optional[int]
    class Config:
        from_attributes = True
        orm_mode = True
class UserSchema(BaseModel):
    id: Optional[int] = None
    username: str
    email: str
    password: str
    class Config:
        from_attributes = True
        orm_mode = True
class ClothingProductListSchema(BaseModel):
    data: List[ClothingProductSchema]

class ClothingReviewListSchema(BaseModel):
    data: List[ClothingReviewSchema]

class ClothingOrderListScheme(BaseModel):
    data: List[ClothingOrderSchema]

class UserListSchema(BaseModel):
    data: List[UserSchema]

class AccessToken(BaseModel):
    token : str

class LoginCredential(BaseModel):
    username: str
    password: str
