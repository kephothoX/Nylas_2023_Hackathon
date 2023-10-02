from main import app
from fastapi.responses import JSONResponse
from bs4 import BeautifulSoup
from pydantic import BaseModel
import json


class Data(BaseModel):
    html: str


@app.post("/api/v1/extract")
async def ExtractTextFromEmail(data: Data):
    html = data.html
    
    soup = BeautifulSoup(html, "html.parser")
    text = soup.get_text().replace("\n", "")
    
    
    return JSONResponse(text)