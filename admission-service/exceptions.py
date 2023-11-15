'''
In this file, should be all
the custom exceptions
'''

class AlreadyExistsError(Exception):
    """Exception raised for errors in cases that content already exists.

    Attributes:
        message -- explanation of the error
    """

    def __init__(self, message="Content already exists"):
        self.message = message
        super().__init__(self.message)