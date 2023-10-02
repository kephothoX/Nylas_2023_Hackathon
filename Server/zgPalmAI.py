from main import app 
import os
from fastapi import Request, Response
from pydantic import BaseModel
from fastapi.responses import JSONResponse
import json

from nylas import APIClient

import zgCalendar as cal

import google.generativeai as palm

palm.configure(api_key = os.environ["PALM_API_KEY"])



class Data(BaseModel):
    text: str
    

    
class DataSet(BaseModel):
    token: str
    
    

class ChatData(BaseModel):
    text: str
    context: str


@app.post("/api/v1/prompt")
async def Prompt(data: Data):
    models = [m for m in palm.list_models() if 'generateText' in m.supported_generation_methods]
    model = models[0].name
    res = palm.generate_text(
        model = model,
        prompt= data.text,
        temperature=0,
        max_output_tokens=800,
    )
    
    return JSONResponse(res.result)


@app.post("/api/v1/summarize")
async def Summarize(data: Data):
    defaults = {
      'model': 'models/text-bison-001',
      'temperature': 0.6,
      'candidate_count': 1,
      'top_k': 40,
      'top_p': 0.95,
      'max_output_tokens': 1024,
      'stop_sequences': [],
      'safety_settings': [{"category":"HARM_CATEGORY_DEROGATORY","threshold":1},{"category":"HARM_CATEGORY_TOXICITY","threshold":1},{"category":"HARM_CATEGORY_VIOLENCE","threshold":2},{"category":"HARM_CATEGORY_SEXUAL","threshold":2},{"category":"HARM_CATEGORY_MEDICAL","threshold":2},{"category":"HARM_CATEGORY_DANGEROUS","threshold":2}],
    }
        
    prompt = "Summarize ths paragraph and detail some relevant context. Text: {} Summary: ".format(data.text) 

    res = palm.generate_text(
        **defaults,
        prompt=prompt
    )
    
    return JSONResponse(res.result)


@app.post("/api/v1/summarize/calendar/events")
async def SummarizeJson(data: DataSet):
    defaults = {
      'model': 'models/text-bison-001',
      'temperature': 0.6,
      'candidate_count': 1,
      'top_k': 40,
      'top_p': 0.95,
      'max_output_tokens': 1024,
      'stop_sequences': [],
      'safety_settings': [{"category":"HARM_CATEGORY_DEROGATORY","threshold":1},{"category":"HARM_CATEGORY_TOXICITY","threshold":1},{"category":"HARM_CATEGORY_VIOLENCE","threshold":2},{"category":"HARM_CATEGORY_SEXUAL","threshold":2},{"category":"HARM_CATEGORY_MEDICAL","threshold":2},{"category":"HARM_CATEGORY_DANGEROUS","threshold":2}],
    }

        
    prompt = "Summarize ths paragraph and detail some relevant context. Text: {} Summary: ".format(cal.CalendarEvents(data.token)) 

    res = palm.generate_text(
        **defaults,
        prompt=prompt
    )
    
    return JSONResponse(res.result)


@app.post("/api/v1/chat")
async def Chat(chat_data: ChatData):
    defaults = {
      'model': 'models/chat-bison-001',
      'temperature': 0.25,
      'candidate_count': 1,
      'top_k': 40,
      'top_p': 0.95,
    }
    
    context = chat_data.context
    examples = []
    messages = [ chat_data.text  ]
    messages.append("NEXT REQUEST")
    response = palm.chat(
        **defaults,
        context=context,
        examples=examples,
        messages=messages
    )
    
    return JSONResponse(response.last)



@app.get("/api/v1/event/chat")
async def EventChat():
    defaults = {
      'model': 'models/chat-bison-001',
      'temperature': 0.25,
      'candidate_count': 1,
      'top_k': 40,
      'top_p': 0.95,
    }
    
    context = "An Event has a Name, Location, Date, Time, and a list of Invitees"
    examples = [["create Event Hannibal Groom party,  Location: Garden Towers, Time: Starts on : 12th October 2023 untill 14th October 2023, Invite Friends from my Contact List"]]
    messages = ["create event"]
    messages.append("NEXT REQUEST")
    response = palm.chat(
        **defaults,
        context=context,
        examples=examples,
        messages=messages
    )
    
    print(response.last)
    
    return JSONResponse(response.last)

