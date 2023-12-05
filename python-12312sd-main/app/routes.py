from fastapi import APIRouter, HTTPException, Path, Depends, status
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.config import SessionLocal
from app.schemas import (ClothingProductSchema, ClothingReviewSchema, UserSchema,
                     ClothingProductListSchema, ClothingReviewListSchema, UserListSchema, AccessToken, LoginCredential, ClothingOrderListScheme,ClothingOrderSchema)
import app.crud as crud
from app.crypto import verify
import app.jwt as jwt
from app.models import User
router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/products/", response_model=ClothingProductListSchema)
async def get_clothing_products(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), user: User = Depends(jwt.get_user)):
    products = crud.get_clothing_products(db, skip, limit)
    return {"data": products}

@router.get("/products/{product_id}", response_model=ClothingProductSchema)
async def get_clothing_product(product_id: int = Path(..., title="Product ID"), db: Session = Depends(get_db), user: User = Depends(jwt.get_user)):
    product = crud.get_clothing_product_by_id(db, product_id)
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.post("/products/", response_model=ClothingProductSchema)
async def create_clothing_product(product: ClothingProductSchema, db: Session = Depends(get_db)):
    return crud.create_clothing_product(db, product)

@router.put("/products/{product_id}", response_model=ClothingProductSchema)
async def update_clothing_product(product_id: int, updated_product: ClothingProductSchema, db: Session = Depends(get_db), user: User = Depends(jwt.get_user)):
    product = crud.update_clothing_product(db, product_id, updated_product)
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.delete("/products/{product_id}", status_code=200)
async def delete_clothing_product(product_id: int, db: Session = Depends(get_db), user: User = Depends(jwt.get_user)):
    _ = crud.delete_clothing_product(db, product_id)

@router.get("/reviews/", response_model=ClothingReviewListSchema)
async def get_clothing_reviews(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), user: User = Depends(jwt.get_user)):
    reviews = crud.get_clothing_reviews(db, skip, limit)
    return {"data": reviews}

@router.get("/reviews/{review_id}", response_model=ClothingReviewSchema)
async def get_clothing_review_by_id(review_id: int = Path(..., title="Review ID"), db: Session = Depends(get_db), user: User = Depends(jwt.get_user)):
    review = crud.get_clothing_review_by_id(db, review_id)
    if review is None:
        raise HTTPException(status_code=404, detail="Review not found")
    return review

@router.post("/reviews/", response_model=ClothingReviewSchema)
async def create_clothing_review(review: ClothingReviewSchema, db: Session = Depends(get_db), user: User = Depends(jwt.get_user)):
    review.user_id = user.id
    return crud.create_clothing_review(db, review)

@router.put("/reviews/{review_id}", response_model=ClothingReviewSchema)
async def update_clothing_review(review_id: int, updated_review: ClothingReviewSchema, db: Session = Depends(get_db), user: User = Depends(jwt.get_user)):
    review = crud.update_clothing_review(db, review_id, updated_review)
    if review is None:
        raise HTTPException(status_code=404, detail="Review not found")
    return review

@router.delete("/reviews/{review_id}", status_code=200)
async def delete_clothing_product(review_id: int, db: Session = Depends(get_db), user: User = Depends(jwt.get_user)):
    _ = crud.delete_clothing_review(db, review_id)

@router.get("/orders/", response_model=ClothingOrderListScheme)
async def get_clothing_orders(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), user: User = Depends(jwt.get_user)):
    orders = crud.get_clothing_orders(db,skip,limit)
    return {"data" : orders}

@router.get("/orders/{order_id}", response_model=ClothingOrderSchema)
async def get_clothing_order_by_id(order_id: int = Path(..., title="Order ID"), db: Session = Depends(get_db), user: User = Depends(jwt.get_user)):
    order = crud.get_clothing_order_by_id(db, order_id)
    return order

@router.post("/orders/", response_model=ClothingOrderSchema)
async def create_clothing_order(order: ClothingOrderSchema, db: Session = Depends(get_db)):
    product = crud.get_clothing_product_by_id(db, order.product_id)
    order.total_price = product.price * order.quantity
    return crud.create_clothing_order(db, order)

@router.put("/orders/{order_id}", response_model=ClothingOrderSchema)
async def update_clothing_order(order_id: int, updated_order: ClothingOrderSchema, db: Session = Depends(get_db), user: User = Depends(jwt.get_user)):
    product = crud.get_clothing_product_by_id(db, updated_order.product_id)
    updated_order.total_price = product.price * updated_order.quantity
    order = crud.update_clothing_order(db, order_id, updated_order)
    if order is None:
        raise HTTPException(status_code=404, detail="Review not found")
    return order

@router.delete("orders/{order_id}", status_code=200)
async def delete_clothing_order(order_id:int, db: Session = Depends(get_db), user: User = Depends(jwt.get_user)):
    _ = crud.delete_clothing_order(db, order_id)

@router.get("/users/", response_model=UserListSchema)
async def get_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), user: User = Depends(jwt.get_user)):
    users = crud.get_users(db, skip, limit)
    return {"data": users}


@router.get("/users/{user_id}", response_model=UserSchema)
async def get_user(user_id: int = Path(..., title="User ID"), db: Session = Depends(get_db), user: User = Depends(jwt.get_user)):
    user = crud.get_user_by_id(db, user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.post("/users/", response_model=UserSchema)
async def create_user(user: UserSchema, db: Session = Depends(get_db)):
    return crud.create_user(db, user)

@router.put("/users/{user_id}", response_model=UserSchema)
async def update_user(user_id: int, updated_user: UserSchema, db: Session = Depends(get_db), user: User = Depends(jwt.get_user)):
    user = crud.update_user(db, user_id, updated_user)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.delete("/users/{user_id}", status_code=200)
async def delete_user(user_id: int, db: Session = Depends(get_db), user: User = Depends(jwt.get_user)):
    _ = crud.delete_user(db, user_id)


@router.post('/login', response_model=AccessToken)
async def login(user_credentials: LoginCredential , db: Session = Depends(get_db)):
    user = crud.get_user_by_username(db, user_credentials.username)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail=f"Invalid Credentials")
    if not verify(user_credentials.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail=f"Invalid Credentials")
    token = jwt.createJWT(user.id)

    return {"token" : token}
@router.get('/profile', response_model=UserSchema)
async def get_profile(db: Session = Depends(get_db), user: User = Depends(jwt.get_user)):
    user = crud.get_user_by_id(db, User.id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user
