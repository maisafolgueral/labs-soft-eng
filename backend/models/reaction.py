'''
In this file, it is set the
model of a specified class
for ORM
'''

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
import datetime

Base = declarative_base()

class Reaction(Base):

    __tablename__ = 'reaction'

    id = Column(Integer, primary_key=True, autoincrement="auto")
    user_id = Column(Integer, ForeignKey('user.id'), nullable=False)
    post_id = Column(Integer, ForeignKey('post.id'), nullable=False)
    type = Column(String(30), nullable=False)
    created_at = Column(DateTime(timezone=True), default=datetime.datetime.now)

    user = relationship("User", back_populates="reactions")
    post = relationship("Post", back_populates="reactions")