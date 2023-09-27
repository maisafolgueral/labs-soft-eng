'''
In this file, it is set the
schema to load and dump data
in a specified format
'''

from marshmallow import Schema, fields

class FollowTopicSchema(Schema):

    follower_id = fields.Integer(dump_only=True)
    topic_id = fields.Integer(dump_only=True)
