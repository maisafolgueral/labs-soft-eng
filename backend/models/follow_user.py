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

class FollowUserModel(Base):

    __tablename__ = 'follow user'

    follower_id = Column(Integer, nullable=False)
    followed_id = Column(Integer, nullable=False)
