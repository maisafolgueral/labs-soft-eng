'''
In this file, it is set the
schema of input and output data
'''

from marshmallow import Schema, fields, validate, ValidationError
from datetime import datetime, timedelta

'''
Validators
'''
def validate_birthday_within_range(value):
    today = datetime.now().date()
    min_birthdate = today - timedelta(days=30*365)  # 30 years ago
    max_birthdate = today - timedelta(days=14*365)  # 14 years ago
    
    if not min_birthdate <= value <= max_birthdate:
        raise ValidationError('Birthday must be between 14 and 30 years ago.')


'''
Schemas
'''
class FollowTopic(Schema):
    follower_id = fields.Integer(required=True)
    topic_id = fields.Integer(required=True)
    created_at = fields.DateTime(dump_only=True)


class FollowUser(Schema):
    follower_id = fields.Integer(required=True)
    followed_id = fields.Integer(required=True)
    created_at = fields.DateTime(load_only=True)


class User(Schema):
    id = fields.Integer(dump_only=True)
    name = fields.String(required=True, validate=[validate.Length(min=2, max=30)])
    surname = fields.String(required=True, validate=[validate.Length(min=2, max=60)])
    birthday = fields.Date(format='%Y-%m-%d', validate=[validate_birthday_within_range])
    gender = fields.String(required=True, validate=[validate.OneOf(['M', 'F'])])
    email = fields.Email(required=True)
    password = fields.String(required=True, load_only=True)
    is_bot = fields.Boolean(required=True)
    is_active = fields.Boolean(required=True)
    created_at = fields.DateTime(dump_only=True)


class Topic(Schema):
    id = fields.Integer(dump_only=True)
    subject = fields.String(required=True, validate=[validate.Length(min=3, max=100)])
    created_at = fields.DateTime(dump_only=True)


class Reaction(Schema):
    id = fields.Integer(dump_only=True)
    user_id = fields.Integer(required=True)
    post_id = fields.Integer(required=True)
    type = fields.String(
        required=True, 
        validate=[
            validate.OneOf(['loved', 'funny', 'surprised', 'sad', 'angry'])
        ]
    )
    created_at = fields.DateTime(dump_only=True)


class Post(Schema):
    id = fields.Integer(dump_only=True)
    user_id = fields.Integer(required=True)
    topic_id = fields.Integer(required=True)
    title = fields.String(required=True, validate=[validate.Length(min=10, max=100)])
    content = fields.String(required=True, validate=[validate.Length(min=10, max=300)])
    created_at = fields.DateTime(dump_only=True)


class Comment(Schema):
    id = fields.Integer(dump_only=True)
    user_id = fields.Integer(required=True)
    post_id = fields.Integer(required=True)
    content = fields.String(required=True, validate=[validate.Length(min=3, max=300)])
    created_at = fields.DateTime(dump_only=True)


class Feedback(Schema):
    id = fields.Integer(dump_only=True)
    user_id = fields.Integer(required=True)
    subject = fields.String(required=True, validate=[validate.Length(min=10, max=100)])
    description = fields.String(required=True, validate=[validate.Length(min=30, max=500)])
    created_at = fields.DateTime(dump_only=True)