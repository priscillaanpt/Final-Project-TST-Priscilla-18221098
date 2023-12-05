from sqlalchemy.orm import Session
from app.models import ClothingProduct, ClothingReview, User, Order
from app.schemas import ClothingProductSchema, ClothingReviewSchema, UserSchema, ClothingOrderSchema
from app.config import engine
from app.crypto import hash,verify
# Operasi CRUD untuk ClothingProduct
def get_clothing_products(db: Session, skip: int = 0, limit: int = 100):
    return db.query(ClothingProduct).offset(skip).limit(limit).all()

def get_clothing_product_by_id(db: Session, product_id: int):
    return db.query(ClothingProduct).filter(ClothingProduct.id == product_id).first()

def create_clothing_product(db: Session, product: ClothingProductSchema):
    print(product)
    _product = ClothingProduct(**product.dict())
    db.add(_product)
    db.commit()
    db.refresh(_product)
    return _product

def update_clothing_product(db: Session, product_id: int, updated_product: ClothingProductSchema):
    _product = get_clothing_product_by_id(db=db, product_id=product_id)
    for field, value in updated_product.dict().items():
        setattr(_product, field, value)
    db.commit()
    db.refresh(_product)
    return _product

def delete_clothing_product(db: Session, product_id: int):
    _product = get_clothing_product_by_id(db=db, product_id=product_id)
    db.delete(_product)
    db.commit()

# Operasi CRUD untuk ClothingReview
def get_clothing_reviews(db: Session, skip: int = 0, limit: int = 100):
    return db.query(ClothingReview).offset(skip).limit(limit).all()

def get_clothing_review_by_id(db: Session, review_id: int):
    return db.query(ClothingReview).filter(ClothingReview.id == review_id).first()

def create_clothing_review(db: Session, review: ClothingReviewSchema):
    _review = ClothingReview(**review.dict())
    db.add(_review)
    db.commit()
    db.refresh(_review)
    return _review

def update_clothing_review(db: Session, review_id: int, updated_review: ClothingReviewSchema):
    _review = get_clothing_review_by_id(db=db, review_id=review_id)
    for field, value in updated_review.dict().items():
        setattr(_review, field, value)
    db.commit()
    db.refresh(_review)
    return _review

def delete_clothing_review(db: Session, review_id: int):
    _review = get_clothing_review_by_id(db=db, review_id=review_id)
    db.delete(_review)
    db.commit()

#operasi CRUD untuk order
def get_clothing_orders(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Order).offset(skip).limit(limit).all()

def get_clothing_order_by_id(db: Session, order_id: int):
    return db.query(Order).filter(Order.id == order_id).first()

def create_clothing_order(db: Session, order: ClothingOrderSchema):
    _order = Order(**order.dict())
    db.add(_order)
    db.commit()
    db.refresh(_order)
    return _order
def update_clothing_order(db: Session, order_id: int, updated_order: ClothingOrderSchema):
    _order = get_clothing_order_by_id(db=db, order_id=order_id)
    for field, value in updated_order.dict().items():
        setattr(_order, field, value)
    db.commit()
    db.refresh(_order)
    return _order
def delete_clothing_order(db: Session, order_id: int):
    _order = get_clothing_order_by_id(db=db, order_id=order_id)
    db.delete(_order)
    db.commit()
    
# Operasi CRUD untuk User
def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(User).offset(skip).limit(limit).all()

def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()
def get_user_by_email(db:Session, user_email: str):
    return db.query(User).filter(User.email == user_email).first()
def get_user_by_username(db:Session, username: str):
    return db.query(User).filter(User.username == username).first()
def create_user(db: Session, user: UserSchema):
    _user = User(**user.dict())
    _user.password = hash(_user.password)
    db.add(_user)
    db.commit()
    db.refresh(_user)
    return _user

def update_user(db: Session, user_id: int, updated_user: UserSchema):
    _user = get_user_by_id(db=db, user_id=user_id)
    for field, value in updated_user.dict().items():
        setattr(_user, field, value)
    db.commit()
    db.refresh(_user)
    return _user

def delete_user(db: Session, user_id: int):
    _user = get_user_by_id(db=db, user_id=user_id)
    db.delete(_user)
    db.commit()
