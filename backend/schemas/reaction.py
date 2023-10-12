'''
In this file, it is set the
schema to load and dump data
in a specified format
'''

from marshmallow import Schema, fields

class Reaction(Schema):

    id = fields.Integer(dump_only=True)
    user_id = fields.Integer(dump_only=True)
    post_id = fields.Integer(dump_only=True)
    type = fields.String(required=True)
