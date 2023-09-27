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

class FollowTopicModel(Base):

    __tablename__ = 'follow topic'

    follower_id = Column(Integer, nullable=False)
    topic_id = Column(Integer, nullable=False)
