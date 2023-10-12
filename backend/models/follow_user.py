'''
In this file, it is set the
model of a specified class
for ORM
'''

from sqlalchemy import Column
from sqlalchemy.types import Integer, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
import datetime

Base = declarative_base()

class FollowUser(Base):

    __tablename__ = 'follow_user'

    follower_id = Column(Integer, ForeignKey('user.id'), nullable=False)
    followed_id = Column(Integer, ForeignKey('user.id'), nullable=False)
    created_at = Column(DateTime(timezone=True), default=datetime.datetime.now)
