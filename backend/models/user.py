'''
In this file, it is set the
model of a specified class
for ORM
'''

from sqlalchemy import Column
from sqlalchemy.types import Integer, String, Date, DateTime
from sqlalchemy.ext.declarative import declarative_base
import datetime
import bcrypt

Base = declarative_base()

class UserModel(Base):

    __tablename__ = 'user'

    id = Column(Integer, primary_key=True, autoincrement="auto")
    name = Column(String(30), nullable=False)
    surname = Column(String(60), nullable=False)
    birthday = Column(Date)
    gender = Column(String(1), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    created_at = Column(DateTime(timezone=True), default=datetime.datetime.now)