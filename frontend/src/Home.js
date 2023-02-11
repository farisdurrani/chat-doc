import React, { useState, useRef, useCallback } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import Webcam from "react-webcam";

const BACKEND_PORT = 8000;

const Home = () => {
  const questionRef = useRef();
  const [chatgptAnswer, setChatgptAnswer] = useState("dfdsf");
  const [image64, setImage64] = useState();

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  const webcamRef = useRef(null);
  const capture = useCallback(() => {
    setImage64(null);
    const imageSrc = webcamRef.current.getScreenshot();
    setImage64(imageSrc);
  }, [webcamRef]);

  const handleSubmit = () => {
    const question = questionRef.current.value;
    console.log("Querying question: ", question);
    axios
      .post(`http://localhost:${BACKEND_PORT}/api/question`, {
        body: JSON.stringify({ question: question }),
      })
      .then((res) => {
        console.log("Response received", res.data);
        setChatgptAnswer(res.data.answer);
      });
  };

  return (
    <div className="container pt-4" id="home">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>
            <h2>Prompt</h2>
          </Form.Label>
          <Form.Control type="text" placeholder="Question" ref={questionRef} />
        </Form.Group>
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
      <div className="chatgptAnswer mt-3 p-4">
        <h2>Answer</h2>
        <p>{chatgptAnswer}</p>
      </div>
      <Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
        videoConstraints={videoConstraints}
      />
      <button onClick={capture}>Capture photo</button>
    </div>
  );
};

export default Home;
