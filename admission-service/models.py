'''
In this file, it is set the
database models for ODM
'''

import hashlib
from pymodm import connect, fields, MongoModel
from datetime import datetime
from config import CONNECTION_STRING

connect(CONNECTION_STRING)


class Admission(MongoModel):
    email = fields.EmailField()
    code = fields.CharField()
    status = fields.IntegerField(default=0)
    created_at = fields.DateTimeField(default=datetime.utcnow)

    def save(self, *args, **kwargs):
        if not self.code:
            self.code = hashlib.md5(self.email.encode('utf-8')).hexdigest()

        super(Admission, self).save(*args, **kwargs)