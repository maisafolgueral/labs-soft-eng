'''
In this file, it is set the
model of a specified class
for ORM
'''

from sqlalchemy import Column
from sqlalchemy.types import Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
import datetime
import bcrypt

Base = declarative_base()

class PostModel(Base):

    __tablename__ = 'post'

    id = Column(Integer, primary_key=True, autoincrement="auto")
    user_id = Column(Integer, nullable=False)
    topic_id = Column(Integer)
    title = Column(String(100), nullable=False)
    content = Column(String(), nullable=False)
    created_at = Column(DateTime(timezone=True), default=datetime.datetime.now)
