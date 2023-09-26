'''
In this file, it is set the
schema to load and dump data
in a specified format
'''

from marshmallow import Schema, fields

class UserSchema(Schema):

    id = fields.Integer(dump_only=True)
    name = fields.String(required=True)
    surname = fields.String(required=True)
    birthday = fields.Date()
    gender = fields.String(required=True)
    email = fields.Email(required=True)
    password = fields.String(required=True, load_only=True)
    created_at = fields.DateTime(dump_only=True)