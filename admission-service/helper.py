from models import Admission as AdmissionModel


def has_admission(email):
    try:
        existing_admission = AdmissionModel.objects.raw({"email": email}).first()
        return existing_admission is not None
    except AdmissionModel.DoesNotExist:
        return False
