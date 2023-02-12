from flask import Flask, request
from flask_cors import CORS
import json
from api import get_advice
import openai

app = Flask(__name__)
CORS(app)


PORT = 8000


@app.route("/")
def hello_world():
    return {"hello": "world"}


@app.route("/api/question", methods=["POST"])
def process_question():
    body = json.loads(request.json["body"])
    question = body["question"]
    image64 = body["image64"]
    return {"answer": 111}
    response = get_advice(question, image64)
    return {"answer": response}


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=PORT)
