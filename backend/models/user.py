'''
In this file, it is set the
model of a specified class
for ORM
'''

from sqlalchemy import Column, Integer, String, Date, DateTime, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from models.follow_user import follow_user
from models.follow_topic import follow_topic
from models.feedback import Feedback
import datetime
import bcrypt

Base = declarative_base()

class User(Base):

    __tablename__ = 'user'

    id = Column(Integer, primary_key=True, autoincrement="auto")
    name = Column(String(30), nullable=False)
    surname = Column(String(60), nullable=False)
    birthday = Column(Date)
    gender = Column(String(1), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    is_active = Column(Boolean, nullable=False)
    is_bot = Column(Boolean, nullable=False)
    created_at = Column(DateTime(timezone=True), default=datetime.datetime.now)
    
    # followers = relationship("User", secondary=follow_user, back_populates="followeds")
    # followeds = relationship("User", secondary=follow_user, back_populates="followers")
    # topics = relationship("Topic", secondary=follow_topic, back_populates="followers")
    # reactions = relationship("Reaction", back_populates="user")
    # posts = relationship("Post", back_populates="user")
    # comments = relationship("Comment", back_populates="user")
    feedbacks = relationship(Feedback, back_populates="user")