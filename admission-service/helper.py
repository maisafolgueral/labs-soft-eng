import random
import string
from models import Admission as AdmissionModel


def has_admission(email):
    try:
        existing_admission = AdmissionModel.objects.raw({"email": email}).first()
        return existing_admission is not None
    except AdmissionModel.DoesNotExist:
        return False
    
def generate_random_string():
    # characters to include in the random string
    characters = string.ascii_uppercase + string.digits
    
    # length of the string (6 digits)
    length = 6
    
    # select characters randomly and concatenate them
    random_string = ''.join(random.choice(characters) for _ in range(length))
    
    return random_string
