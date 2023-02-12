import openai
import os
import base64

openai.api_key = os.getenv("OPENAI_API_KEY")

def get_chatgpt_response(prompt):
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=prompt,
        temperature=0.6,
    )
    return response.choices[0].text


def image64ToImage(img_data):
    with open("imageToSave.png", "wb") as fh:
        fh.write(base64.decodebytes(img_data[22:]))
