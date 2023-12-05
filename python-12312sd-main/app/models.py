from sqlalchemy import Column, Integer, String, ForeignKey, Enum, DateTime
import enum
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from .config import Base

class ClothingProduct(Base):
    __tablename__ = "clothing_products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    description = Column(String)
    price = Column(Integer)
    # Tambahkan kolom lain yang diperlukan, seperti ukuran, warna, dll.

    # Hubungan dengan ulasan
    reviews = relationship("ClothingReview", back_populates="product")
    orders = relationship("Order", back_populates="product")

class ClothingReview(Base):
    __tablename__ = "clothing_reviews"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    product_id = Column(Integer, ForeignKey("clothing_products.id"))
    rating = Column(Integer)
    review_text = Column(String)

    # Hubungan dengan pengguna
    user = relationship("User", back_populates="reviews")
    # Hubungan dengan produk pakaian
    product = relationship("ClothingProduct", back_populates="reviews")

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String)
    email = Column(String)
    password = Column(String, nullable=False)
    # Tambahkan kolom lain yang diperlukan, seperti kata sandi, informasi profil, dll.

    # Hubungan dengan ulasan
    reviews = relationship("ClothingReview", back_populates="user")
class StatusOrder (enum.Enum):
    NOT_PAID = 0
    PAID = 1
    IN_COURIER = 2
    DELIVERED = 3
class Order(Base):
    __tablename__ = "orders"
    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("clothing_products.id"))
    quantity = Column(Integer)
    order_status = Column(Enum(StatusOrder))
    order_date = Column(DateTime(timezone=True), server_default=func.now())
    total_price = Column(Integer)
     # Hubungan dengan pengguna
    # Hubungan dengan produk pakaian
    product = relationship("ClothingProduct", back_populates="orders")