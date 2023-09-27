'''
In this file, it is set the
schema to load and dump data
in a specified format
'''

from marshmallow import Schema, fields

class FollowUserSchema(Schema):

    follower_id = fields.Integer(dump_only=True)
    followed_id = fields.Integer(dump_only=True)