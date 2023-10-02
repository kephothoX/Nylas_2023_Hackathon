from fastapi import FastAPI
import os

app = FastAPI()

os.environ["EAI_USERNAME"] = ""
os.environ["EAI_PASSWORD"] = ""
os.environ["NYLAS_CLIENT_ID"] =  ""
os.environ["NYLAS_CLIENT_SECRET"] =  ""
os.environ["PALM_API_KEY"] ="" 

os.environ["OPENAI_KEY"] = ""

os.environ["NYLAS_ACCESS_TOKEN"] = ""


import zgMessages
import zgExpertAIAnalysis
import zgPalmAI
import zgExtractEmailText
import zgMessage
import zgContacts
import zgTextToSpeech
import zgCalendar



