import requests


def get_admission(code):
    url = f'http://admission_service:9010/api/admissions/{code}'
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    elif response.status_code == 404:
        return {'error': 404}
    else:
        return {'error': 500}
    
def update_admission(code, email):
    url = f'http://admission_service:9010/api/admissions/{code}'
    data_to_update = {
        'email': email,
        'status': 2
    }
    response = requests.put(url, json=data_to_update)
    if response.status_code == 200:
        return response.json()
    elif response.status_code == 404:
        return {'error': 404}
    else:
        return {'error': 500}