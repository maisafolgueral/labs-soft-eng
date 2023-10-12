'''
In this file, it is set the
model of a specified class
for ORM
'''

from sqlalchemy import Column
from sqlalchemy.types import Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
import datetime

Base = declarative_base()

class Topic(Base):

    __tablename__ = 'topic'

    id = Column(Integer, primary_key=True, autoincrement="auto")
    subject = Column(String(100), nullable=False)
    created_at = Column(DateTime(timezone=True), default=datetime.datetime.now)

    followers = relationship("User", secondary="follow_topic", back_populates="topics")
    posts = relationship("Post", back_populates="topic")