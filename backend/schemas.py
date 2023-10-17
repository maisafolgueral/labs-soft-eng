'''
In this file, it is set the
schema to load and dump data
in a specified format
'''

from marshmallow import Schema, fields


class FollowTopic(Schema):
    follower_id = fields.Integer(required=True)
    topic_id = fields.Integer(required=True)
    created_at = fields.DateTime(dump_only=True)


class FollowUser(Schema):
    follower_id = fields.Integer(required=True)
    followed_id = fields.Integer(required=True)
    created_at = fields.DateTime(dump_only=True)


class User(Schema):
    id = fields.Integer(dump_only=True)
    name = fields.String(required=True)
    surname = fields.String(required=True)
    birthday = fields.Date()
    gender = fields.String(required=True)
    email = fields.Email(required=True)
    password = fields.String(required=True, load_only=True)
    is_bot = fields.Boolean(required=True)
    is_active = fields.Boolean(required=True)
    created_at = fields.DateTime(dump_only=True)


class Topic(Schema):
    id = fields.Integer(dump_only=True)
    subject = fields.String(required=True)
    created_at = fields.DateTime(dump_only=True)


class Reaction(Schema):
    id = fields.Integer(dump_only=True)
    user_id = fields.Integer(required=True)
    post_id = fields.Integer(required=True)
    type = fields.String(required=True)
    created_at = fields.DateTime(dump_only=True)


class Post(Schema):
    id = fields.Integer(dump_only=True)
    user_id = fields.Integer(required=True)
    topic_id = fields.Integer(required=True)
    title = fields.String(required=True)
    content = fields.String(required=True)
    created_at = fields.DateTime(dump_only=True)


class Comment(Schema):
    id = fields.Integer(dump_only=True)
    user_id = fields.Integer(required=True)
    post_id = fields.Integer(required=True)
    content = fields.String(required=True)
    created_at = fields.DateTime(dump_only=True)


class Feedback(Schema):
    id = fields.Integer(dump_only=True)
    user_id = fields.Integer(required=True)
    subject = fields.String(required=True)
    description = fields.String(required=True)
    created_at = fields.DateTime(dump_only=True)