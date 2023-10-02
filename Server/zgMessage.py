from main import app 
from fastapi import Form
from fastapi.responses import JSONResponse
from starlette.datastructures import FormData
from starlette.requests import Request
from starlette.responses import Response
import json
import os

from nylas import APIClient


@app.post("/api/v1/send-message")
async def SendMessage(request: Request):
    async with request.form() as form_data:
        nylas = APIClient(
            os.environ["NYLAS_CLIENT_ID"],
            os.environ["NYLAS_CLIENT_SECRET"],
            form_data["token"]
          )
      
      
        if form_data["attachment"] is not None:
            draft =  nylas.drafts.create()
            draft.subject = form_data["subject"]
            draft.body = form_data["message"]
            draft.to = [{ "name": "Nylas Client", "email": form_data["receiver"] }]

            """attachment = form_data["attachment"]
            filename = form_data["attachment_name"]
            file = nylas.files.create()
            file.stream = attachment

            file.save()
            attachment.close()

            draft.attach(file)"""

            draft.send()


            return JSONResponse("Ok")
         
        else:
            draft =  nylas.drafts.create()
            draft.subject = form_data["subject"]
            draft.body = form_data["message"]
            draft.to = [{ "name": "Nylas Client", "email": form_data["receiver"] }]
            
            draft.send()
            
            return JSONResponse("Ok")




