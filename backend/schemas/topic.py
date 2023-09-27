'''
In this file, it is set the
schema to load and dump data
in a specified format
'''

from marshmallow import Schema, fields

class TopicSchema(Schema):

    id = fields.Integer(dump_only=True)
    subject = fields.String(required=True)
