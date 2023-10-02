from main import app 
from fastapi import Request
from pydantic import BaseModel

from nylas import APIClient


class DataSet(BaseModel):
  token: str

@app.post("/api/v1/contacts")
async def getContacts(dataSet: DataSet):    
    nylas = APIClient(
      os.environ["NYLAS_CLIENT_ID"],
      os.environ["NYLAS_CLIENT_SECRET"],
      dataSet.token
    )

    contacts = nylas.contacts.all()
    
    results = []
    
    for contact in contacts:
        email = list(contact.emails.values())[0][0]
        print("Name: {} {} | Email: {} | ID: {}".format(contact.given_name, contact.surname, email, contact.id))
        
        results.append({ "given_name": contact.given_name, "surname": contact.surname,  "email": email, "id": contact.id })
        
    return results
