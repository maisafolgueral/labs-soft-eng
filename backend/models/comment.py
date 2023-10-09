'''
In this file, it is set the
model of a specified class
for ORM
'''

from sqlalchemy import Column
from sqlalchemy.types import Integer, String
from sqlalchemy.ext.declarative import declarative_base
import datetime
import bcrypt

Base = declarative_base()

class CommentModel(Base):

    __tablename__ = 'comment'

    id = Column(Integer, primary_key=True, autoincrement="auto")
    user_id = Column(Integer, nullable=False)
    post_id = Column(Integer, nullable=False)
    content = Column(String(), nullable=False)