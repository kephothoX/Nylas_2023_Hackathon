from main import app 
from fastapi import Request, Response
from pydantic import BaseModel, parse_obj_as
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from typing import List
import os 

from nylas import APIClient


class DataSet(BaseModel):
  token: str
  
@app.post("/api/v1/messages", response_model=None)
async def getMessages(dataSet: DataSet) -> Response: 
    nylas = APIClient(
      os.environ["NYLAS_CLIENT_ID"],
      os.environ["NYLAS_CLIENT_SECRET"],
      dataSet.token
    )

    messages = nylas.messages.all(limit=10)
    
    results = []
    for message in messages:
        res = {
            "id": str(message["id"]), 
            "bcc": str(message["bcc"]),
            "body": str(message["body"]),
            "cc": str(message["cc"]),
            "date": str(message["date"]),
            "files": list(message["files"]),
            "from": list(message["from"]),
            "from_": list(message["from_"]),
            "to": list(message["to"]),
            "subject": str(message["subject"]),
            "unread": str(message["unread"]),
            "reply_to": list(message["reply_to"]),
            "received_at": str(message["received_at"])
        }
        
        results.append(res) 
        
    return  JSONResponse(results)



class DataSet(BaseModel):
  token: str
  message_id: str
  
@app.post("/api/v1/message", response_model=None)
async def openMessage(dataSet: DataSet) -> Response: 
    nylas = APIClient(
      os.environ["NYLAS_CLIENT_ID"],
      os.environ["NYLAS_CLIENT_SECRET"],
      dataSet.token
    )

    message =  dict(nylas.messages.get(dataSet.message_id))
    
    result = {
        "id": str(message["id"]), 
        "bcc": str(message["bcc"]),
        "body": str(message["body"]),
        "cc": str(message["cc"]),
        "date": str(message["date"]),
        "files": list(message["files"]),
        "from": list(message["from"]),
        "from_": list(message["from_"]),
        "subject": str(message["subject"]),
        "thread_id": str(message["thread_id"]),
        "to": list(message["to"]),
        "unread": str(message["unread"]),
        "reply_to": list(message["reply_to"]),
    }    
        
        
    return  JSONResponse(result)


  
@app.post("/api/v1/message/mark-as-read", response_model=None)
async def markMessageAsRead(dataSet: DataSet) -> Response: 
    nylas = APIClient(
      os.environ["NYLAS_CLIENT_ID"],
      os.environ["NYLAS_CLIENT_SECRET"],
      dataSet.token
    )
    
    message = nylas.messages.get(dataSet.message_id)

    message.mark_as_read()
    
    return Response("Success")

@app.post("/api/v1/message/mark-as-unread", response_model=None)
async def markMessageAsUnRead(dataSet: DataSet) -> Response: 
    nylas = APIClient(
      os.environ["NYLAS_CLIENT_ID"],
      os.environ["NYLAS_CLIENT_SECRET"],
      dataSet.token
    )
    
    message = nylas.messages.get(dataSet.message_id)

    message.mark_as_unread()
    
    return Response("Success")
  

@app.post("/api/v1/message/star", response_model=None)
async def starMessage(dataSet: DataSet) -> Response: 
    nylas = APIClient(
      os.environ["NYLAS_CLIENT_ID"],
      os.environ["NYLAS_CLIENT_SECRET"],
      dataSet.token
    )
    
    message = nylas.messages.get(dataSet.message_id)

    message.star()
    
    return Response("Success")
  
  
@app.post("/api/v1/message/unstar", response_model=None)
async def unStarMessage(dataSet: DataSet) -> Response: 
    nylas = APIClient(
      os.environ["NYLAS_CLIENT_ID"],
      os.environ["NYLAS_CLIENT_SECRET"],
      dataSet.token
    )
    
    message = nylas.messages.get(dataSet.message_id)

    message.unstar()
    
    return Response("Success")



