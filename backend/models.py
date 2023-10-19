'''
In this file, it is set the
database models for ORM
'''

from sqlalchemy import (
    Column, 
    Integer, 
    String, 
    Date, 
    DateTime, 
    Boolean,
    ForeignKey,
    Table
)
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
import datetime
import bcrypt

Base = declarative_base()

follow_user = Table(
    'follow_user',
    Base.metadata,
    Column('follower_id', Integer, ForeignKey('user.id'), nullable=False),
    Column('followed_id', Integer, ForeignKey('user.id'), nullable=False),
    Column('created_at', DateTime(timezone=True), default=datetime.datetime.now)
)

follow_topic = Table(
    'follow_topic',
    Base.metadata,
    Column('follower_id', Integer, ForeignKey('user.id'), nullable=False),
    Column('topic_id', Integer, ForeignKey('topic.id'), nullable=False),
    Column('created_at', DateTime(timezone=True), default=datetime.datetime.now)
)


class User(Base):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True, autoincrement='auto')
    name = Column(String(30), nullable=False)
    surname = Column(String(60), nullable=False)
    birthday = Column(Date)
    gender = Column(String(1), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    is_active = Column(Boolean, nullable=False)
    is_bot = Column(Boolean, nullable=False)
    created_at = Column(DateTime(timezone=True), default=datetime.datetime.now)
    followers = relationship(
        'User',
        secondary='follow_user',
        primaryjoin='User.id == follow_user.c.followed_id',
        secondaryjoin='User.id == follow_user.c.follower_id',
        back_populates='followed'
    )
    followed = relationship(
        'User',
        secondary='follow_user',
        primaryjoin='User.id == follow_user.c.follower_id',
        secondaryjoin='User.id == follow_user.c.followed_id',
        back_populates='followers'
    )
    topics = relationship('Topic', secondary='follow_topic', back_populates='followers')
    reactions = relationship('Reaction', back_populates='user')
    posts = relationship('Post', back_populates='user')
    comments = relationship('Comment', back_populates='user')
    feedbacks = relationship('Feedback', back_populates='user')


class Topic(Base):
    __tablename__ = 'topic'

    id = Column(Integer, primary_key=True, autoincrement='auto')
    subject = Column(String(100), nullable=False)
    created_at = Column(DateTime(timezone=True), default=datetime.datetime.now)
    followers = relationship('User', secondary='follow_topic', back_populates='topics')
    posts = relationship('Post', back_populates='topic')


class Reaction(Base):
    __tablename__ = 'reaction'

    id = Column(Integer, primary_key=True, autoincrement='auto')
    user_id = Column(Integer, ForeignKey('user.id'), nullable=False)
    post_id = Column(Integer, ForeignKey('post.id'), nullable=False)
    type = Column(String(30), nullable=False)
    created_at = Column(DateTime(timezone=True), default=datetime.datetime.now)
    user = relationship('User', back_populates='reactions')
    post = relationship('Post', back_populates='reactions')


class Post(Base):
    __tablename__ = 'post'

    id = Column(Integer, primary_key=True, autoincrement='auto')
    user_id = Column(Integer, ForeignKey('user.id'), nullable=False)
    topic_id = Column(Integer, ForeignKey('topic.id'), nullable=False)
    title = Column(String(100), nullable=False)
    content = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), default=datetime.datetime.now)
    user = relationship('User', back_populates='posts')
    reactions = relationship('Reaction', back_populates='post')
    comments = relationship('Comment', back_populates='post')
    topic = relationship('Topic', back_populates='posts')


class Comment(Base):
    __tablename__ = 'comment'

    id = Column(Integer, primary_key=True, autoincrement='auto')
    user_id = Column(Integer, ForeignKey('user.id'), nullable=False)
    post_id = Column(Integer, ForeignKey('post.id'), nullable=False)
    content = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), default=datetime.datetime.now)
    user = relationship('User', back_populates='comments')
    post = relationship('Post', back_populates='comments')


class Feedback(Base):
    __tablename__ = 'feedback'

    id = Column(Integer, primary_key=True, autoincrement='auto')
    user_id = Column(Integer, ForeignKey('user.id'), nullable=False)
    subject = Column(String(100), nullable=False)
    description = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), default=datetime.datetime.now)
    user = relationship('User', back_populates='feedbacks')