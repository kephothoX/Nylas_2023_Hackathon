from main import app
from fastapi.responses import JSONResponse
from bs4 import BeautifulSoup
from pydantic import BaseModel
import json

from expertai.nlapi.cloud.client import ExpertAiClient 
  

client = ExpertAiClient()


class Data(BaseModel):
    text: str


@app.post("/api/v1/expert-ai-analysis")
async def Expert_AI_Analysis(data: Data):
    text = data.text  
    
    entities = []
    relations = []
    key_phrases = []
    sentences = []
    topics = []
    phrases = []
    paragraphs = []
    tokens = []
    main_phrases = []
    main_sentences = []
    main_syncons = []
    knowledge = []
    response = {}
    iptc = []
    emotional_traits = []
    geotax = []
    behavioral_traits = []
    hate_speech = []
    temporal_information = []
    esg_sentiment = []
    sentiment = []

    output = client.full_analysis(body={"document": {"text": text}}, params={"language":  "en"})
    
    for lemma in output.main_lemmas:
        key_phrases.append(lemma.value)
        
    response["key_phrases"] = key_phrases
    
    for entity in output.entities:
        entities.append({"lemma": entity.lemma, "type": entity.type_ })

    response["entities"] = entities
    
    for relation in output.relations:
        for related in relation.related:
            relations.append({"relation": relation.verb.lemma, "related_to": related.relation, "by": related.lemma })
            
    response["relations"] = relations
    
    sentiment_score = int(output.sentiment.overall)
    
    if sentiment_score < 1:
        sentiment = "Negative"
    else:
        sentiment = "Positive"
    
    response["sentiment"] = {"sentiment": sentiment, "score": sentiment_score }
        

    iptc_output = client.classification(body={"document": {"text": text}}, params={"taxonomy": "iptc", "language":  "en"})
    for category in iptc_output.categories:        
        iptc.append({ "id": category.id_, "hierarchy": category.hierarchy })
        
    response["iptc"] = iptc


    geotax_output = client.classification(body={"document": {"text": text}}, params={"taxonomy": "geotax", "language":  "en"})
    for category in geotax_output.categories:
        geotax.append({ "id": category.id_, "hierarchy": category.hierarchy })   
        
    response["geotax"] = geotax




    emotional_traits_output = client.classification(body={"document": {"text": text}}, params={"taxonomy": "emotional-traits", "language":  "en"})
    for category in emotional_traits_output.categories:
        emotional_traits.append({ "id": category.id_, "hierarchy": category.hierarchy })
        
    response["emotional_traits"] = emotional_traits

    

    behavioral_traits_output = client.classification(body={"document": {"text": text}}, params={"taxonomy": "behavioral-traits", "language":  "en"})
    for category in behavioral_traits_output.categories:
        behavioral_traits.append({ "id": category.id_, "hierarchy": category.hierarchy })
        
    response["behavioral_traits"] = behavioral_traits


    pii_output = client.detection(body={"document": {"text": text}}, params={"detector": "pii", "language":  "en"})
    response["pii"] = json.dumps(pii_output.extra_data, indent=4, sort_keys=True)


    write_print_output = client.detection(body={"document": {"text": text}}, params={"detector": "writeprint", "language":  "en"})
    response["write_print"] = json.dumps(write_print_output.extra_data, indent=4, sort_keys=True)


    temporal_information_output = client.detection(body={"document": {"text": text}}, params={"detector": "temporal-information", "language": "en"})
    response["temporal_information"] = json.dumps(temporal_information_output.extra_data, indent=4, sort_keys=True)


    hate_speech_output = client.detection(body={"document": {"text": text}}, params={"detector": "hate-speech", "language":  "en"})
    for category in hate_speech_output.categories:
        hate_speech.append({"id":  category.id_, "hierarchy": category.hierarchy })


    i = 1
    for extraction in hate_speech_output.extractions:
        for field in extraction.fields:
            hate_speech.append({"record": i, "name": field.name, "value": field.value })
        i = i + 1
    response["hate_speech"] = hate_speech 
    
    """esg_sentiment_output = client.detection(body={"document": {"text": text}}, params={"detector": "esg-sentiment", "language": "en"})

    print("Categorization, list of categories (id and hierarchy):")

    for category in output.categories:
        esg_sentiment.append({ "id": category.id_, "hierarchy": category.hierarchy })
        
    

    print("\nExtraction, list of records:")

    i = 1
    for extraction in esg_sentiment_output.extractions:
        for field in extraction.fields:
            esg_sentiment.append({"name": field.name, "value": field.value })
        i = i + 1
        
        
    response["esg_sentiment"] = esg_sentiment"""

    
    return JSONResponse(response)