from main import app 
from fastapi import Request, Response
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import os
import json
import base64

from google.cloud import texttospeech

client = texttospeech.TextToSpeechClient()
"""client = storage.Client()
bucket = client.get_bucket("https://console.firebase.google.com/project/zuri-genesys/storage/zuri-genesys.appspot.com/files")"""

class Data(BaseModel):
    text: str
    
    
@app.post("/api/v1/text/to/speech")
async def TextToSpeech(data: Data) -> Response:
    synthesis_input = texttospeech.SynthesisInput(text=data.text)

    voice = texttospeech.VoiceSelectionParams(
       language_code="en-US", ssml_gender=texttospeech.SsmlVoiceGender.NEUTRAL
    )

    audio_config = texttospeech.AudioConfig(
        audio_encoding=texttospeech.AudioEncoding.MP3
    )


    response = client.synthesize_speech(
        input=synthesis_input, voice=voice, audio_config=audio_config
    )
    
    base64_data = base64.b64encode(response.audio_content).decode('utf-8')
    
    
    return JSONResponse(base64_data)
        
    


