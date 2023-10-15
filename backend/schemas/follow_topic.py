'''
In this file, it is set the
schema to load and dump data
in a specified format
'''

from marshmallow import Schema, fields

class FollowTopic(Schema):

    follower_id = fields.Integer(dump_only=True)
    topic_id = fields.Integer(dump_only=True)
    created_at = fields.DateTime(dump_only=True)
