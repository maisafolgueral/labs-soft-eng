'''
In this file, it is set the
schema of input and output data
'''

from marshmallow import Schema, fields


'''
Schemas
'''
class Admission(Schema):
    email = fields.Email(required=True)
    code = fields.String(dump_only=True)
    status = fields.Integer(required=True)
    created_at = fields.DateTime(dump_only=True)