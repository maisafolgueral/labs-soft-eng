'''
In this file, it is set the
model of a specified class
for ORM
'''

from sqlalchemy import Column
from sqlalchemy.types import Integer, String, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
import datetime

Base = declarative_base()

class Post(Base):

    __tablename__ = 'post'

    id = Column(Integer, primary_key=True, autoincrement="auto")
    user_id = Column(Integer, ForeignKey('user.id'), nullable=False)
    topic_id = Column(Integer, ForeignKey('topic.id'), nullable=False)
    title = Column(String(100), nullable=False)
    content = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), default=datetime.datetime.now)

    user = relationship("User", back_populates="posts")
    reactions = relationship("Reaction", back_populates="post")
    comments = relationship("Comment", back_populates="post")
    topic = relationship("Topic", back_populates="posts")