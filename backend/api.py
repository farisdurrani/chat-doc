import openai
import os
import base64
import re

openai.api_key = os.getenv("OPENAI_API_KEY")


def __remove_symbols(string):
    return re.sub(r"[^\w\s]", "", string)


def __split_string(string):
    rem_symbols_split = __remove_symbols(string).split(" ")
    return [word.lower() for word in rem_symbols_split]


def __get_cv_disease() -> str:
    # TODO: Replace with CV algorithm

    return "skin rashes"


def __compare_chatgpt_cv(chat_res, cv_res) -> str:
    chat_res_split = __split_string(chat_res)
    cv_res_split = set(__split_string(cv_res))
    count_match = 0
    for word in cv_res_split:
        if word in chat_res_split:
            count_match += 1
    return count_match / len(cv_res_split)


def __get_summary_diagnosis(comparison: float, cv_res: str) -> str:
    if comparison < 0.33:
        return f"Our image analysis does not provide enough information to make a summary diagnosis, but below is an extended analysis. Feel free to add more information.\n\n"
    elif comparison < 0.66:
        return f"Our image analysis suggests that you may have a {cv_res}. Below is an extended analysis. Feel free to add more information.\n\n"
    else:
        return f"Our image analysis strongly suggests that you may have a {cv_res} when compared to your symptoms. Below is an extended analysis.\n\n"


def get_advice(prompt: str, image64: str) -> str:
    prime_text = f"I would like your advice based on my current symtoms."
    question = f"{prime_text} {prompt}"

    if not image64:
        return __get_chatgpt_response(question)

    __generate_image64_image(image64)
    cv_res = __get_cv_disease()
    chat_res = __get_chatgpt_response(question)
    comparison = __compare_chatgpt_cv(chat_res, cv_res)
    summary = __get_summary_diagnosis(comparison, cv_res)
    return f"{summary}{chat_res}"


def __get_chatgpt_response(prompt: str) -> str:
    print("prompt", prompt)
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=prompt,
        temperature=0.6,
        max_tokens=2000,
    )
    return response.choices[0].text


def __generate_image64_image(img_data):
    with open("image.png", "wb") as fh:
        bytestr = bytes(img_data[22:], "utf-8")
        fh.write(base64.decodebytes(bytestr))
