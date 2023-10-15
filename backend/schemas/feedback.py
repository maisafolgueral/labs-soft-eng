'''
In this file, it is set the
schema to load and dump data
in a specified format
'''

from marshmallow import Schema, fields

class Feedback(Schema):

    id = fields.Integer(dump_only=True)
    user_id = fields.Integer(required=True)
    subject = fields.String(required=True)
    description = fields.String(required=True)
    created_at = fields.DateTime(dump_only=True)