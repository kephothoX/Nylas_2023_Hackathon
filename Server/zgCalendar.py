from main import app 
from fastapi import Request, Response
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from typing import List

from pydantic import BaseModel
import os
import json
import datetime
from datetime import datetime

from nylas import APIClient

  
class DataSet(BaseModel):
  token: str

@app.post("/api/v1/calendar")
async def getCalendar(dataSet: DataSet):    
    nylas = APIClient(
      os.environ["NYLAS_CLIENT_ID"],
      os.environ["NYLAS_CLIENT_SECRET"],
      dataSet.token
    )
    
     
    calendars = nylas.calendars.all()
    for calendar in calendars:
        print(calendar)
        print("Id: {} | Name: {} | Description: {} | Read Only: {}".format(calendar.id, calendar.name, calendar.description, calendar.read_only))   
        
        print("_____________________________________________________") 
        
        now = int(datetime.now().timestamp())
        #calendar = nylas.calendars.first()
        print(calendar.id)
        events = nylas.events.where(calendar_id=calendar.id).all()
        for event in events:
            events.append(event)
            print(event)
            print("Title: {} | When: {} | Participants: {}".format(event.title, event.when, event.participants))
  
  
  
  
  
@app.post("/api/v1/calendar/events")
async def getEvents(dataSet: DataSet) -> List[str]:    
    nylas = APIClient(
      os.environ["NYLAS_CLIENT_ID"],
      os.environ["NYLAS_CLIENT_SECRET"],
      dataSet.token
    )
    
    cal_events = []   
    
    
    calendars = nylas.calendars.all()
    for calendar in calendars:
        now = int(datetime.now().timestamp())
        events = nylas.events.where(calendar_id=calendar.id,).all()
        for event in events:
          if "start_time" in dict(event["when"]):
              cal_events.append({"id": event["id"], "account_id":  event["account_id"], "title": event["title"], "description": event["description"], "location": event["location"], "read_only": event["read_only"], "when": dict(event["when"]), "busy": event["busy"], "participants": event["participants"], "calendar_id": event["calendar_id"], "status": event["status"], "owner": event["owner"], "object": event["object"], "message_id": event["message_id"], "ical_uid": event["ical_uid"], "visibility": event["visibility"]})
            
            
    
          
    return JSONResponse(cal_events)
  
  
def CalendarEvents(token):
    nylas = APIClient(
      os.environ["NYLAS_CLIENT_ID"],
      os.environ["NYLAS_CLIENT_SECRET"],
      token
    )
    
    cal_events = []   
    
    
    calendars = nylas.calendars.all()
    for calendar in calendars:
        now = int(datetime.now().timestamp())
        events = nylas.events.where(calendar_id=calendar.id,).all()
        for event in events:
          if "start_time" in dict(event["when"]):
              cal_events.append({"id": event["id"], "account_id":  event["account_id"], "title": event["title"], "description": event["description"], "location": event["location"], "read_only": event["read_only"], "when": dict(event["when"]), "busy": event["busy"], "participants": event["participants"], "calendar_id": event["calendar_id"], "status": event["status"], "owner": event["owner"], "object": event["object"], "message_id": event["message_id"], "ical_uid": event["ical_uid"], "visibility": event["visibility"]})
              
    return cal_events