from Server import app 

from flask import request, Response, jsonify, json
from flask_cors import CORS

import requests

from flask_restful import Resource, Api

api = Api(app, prefix="/api/v1")

from google.cloud import language_v1
from google.oauth2 import service_account


#credentials = service_account.Credentials.from_service_account_file("/media/kephotho/feline/Spaces/Devpost_Hackathons/Nylas/key.json")
client = language_v1.LanguageServiceClient()
client.key = "AIzaSyCMSVvf2m3np9WCJbJp_k3ef90FTWpYFdw"


#Select Google Cloud  Project: gcloud config set project PROJECT_ID
#Enable the Cloud Natural Language API: gcloud services enable language.googleapis.com
#Create local authentication credentials for your Google Account: gcloud auth application-default login

#If the gcloud CLI prints a warning that your account doesn't have the serviceusage.services.use permission,
#then some gcloud CLI commands and client libraries might not work.
#Ask an administrator to grant you the Service Usage Consumer IAM role (roles/serviceusage.serviceUsageConsumer),
#then run the following command: gcloud auth application-default set-quota-project PROJECT_ID

class AnalyzeText(Resource):
    def post(self):
        data = json.loads(request.data.decode("utf-8"))
        print(data)

        document = language_v1.types.Document(
            content = data["text"],
            type_ = language_v1.types.Document.Type.PLAIN_TEXT
        )

        print(document)

        sentiment = client.analyze_sentiment(
            request = { "document": document }
        ).document_sentiment

        print(sentiment)

        print(f"Sentiment: {sentiment.score},  {sentiment.magnitude }")


        return jsonify(response = f"Sentiment: {sentiment.score},  {sentiment.magnitude }")


api.add_resource(AnalyzeText, "/analyze-text")