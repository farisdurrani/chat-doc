# Chat-Doc
An AI chatbot that can give preliminary diagnosis of diseases and suggest remedies.

A hackathon project for Hackalytics 2023 submitted on [Devpost](https://devpost.com/software/philoh).

# How to start
1. Prerequisites:
- Python 3.10+
- Node.js 18 (with NPM 9)
2. To start the backend,
- Change your directory into backend and create an `.env` file from `.env.example`
```sh
cd backend
cp .env.example .env
```
- Get your OpenAI key from [OpenAI](https://platform.openai.com/docs/quickstart/build-your-application) and copy your secret API key. Set it as the OPENAI_API_KEY in your newly created `.env` file
- Install the requirements and start the server
```sh
pip install -r requirements.txt
python app.py
```
3. To start the frontend,
```sh
cd frontend
npm install
npm start
```
4. The application will be live at http://localhost:3000 (with the backend server running on http://localhost:8000)

# Preview
Demonstration of app's function without any uploaded image
<img width="1624" alt="Demonstration of app's function without any uploaded image" src="https://user-images.githubusercontent.com/40067313/218315216-403f72f6-db2d-406f-a849-cdf5126b1139.png">

Demonstration of app's function with an uploaded image (an option is presented to use the webcam as well)
<img width="1624" alt="Demonstration of app's function with an uploaded image" src="https://user-images.githubusercontent.com/40067313/218315568-354ce5ac-865d-4c53-8328-2646f60a77ce.png">


# License
This app is MIT licensed, as found in the [LICENSE](./LICENSE) file.

The app's documentation is Creative Commons licensed, as found in the [LICENSE-docs](./.github/LICENSE-docs) file.
