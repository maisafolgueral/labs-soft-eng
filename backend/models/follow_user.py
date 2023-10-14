'''
In this file, it is set the
model of a specified class
for ORM
'''

from sqlalchemy import Column, Integer, DateTime, ForeignKey, Table
from sqlalchemy.ext.declarative import declarative_base
import datetime

Base = declarative_base()

follow_user = Table(
    'follow_user',
    Base.metadata,
    Column('follower_id', Integer, ForeignKey('user.id'), nullable=False),
    Column('followed_id', Integer, ForeignKey('user.id'), nullable=False),
    Column('created_at', DateTime(timezone=True), default=datetime.datetime.now)
)

