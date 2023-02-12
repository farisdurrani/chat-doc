import React, { useState, useRef, useCallback } from "react";
import { Button, Form, Accordion } from "react-bootstrap";
import axios from "axios";
import Webcam from "react-webcam";
import {
  answerPlaceholder,
  disclaimer,
  questionPlaceholder,
} from "./constants";
import { toast } from "react-toastify";

const BACKEND_PORT = 8000;

const Home = () => {
  const questionRef = useRef();
  const webcamRef = useRef(null);
  const [takePhoto, setTakePhoto] = useState(false);
  const [chatgptAnswer, setChatgptAnswer] = useState();
  const [image64, setImage64] = useState();
  const [loadingAnswer, setLoadingAnswer] = useState(false);

  const videoConstraints = {
    width: 500,
    height: 281,
    facingMode: "user",
  };

  const capture = useCallback(() => {
    setImage64(null);
    const imageSrc = webcamRef.current.getScreenshot();
    setImage64(imageSrc);
  }, [webcamRef]);

  const handleSubmit = () => {
    const question = questionRef.current.value;
    if (!question) {
      toast.error("Please enter your symptoms");
      return;
    }

    console.log("Capturing photo...");
    capture();
    console.log("Querying question: ", question);
    if (takePhoto) {
      toast.info("Uploading photo and querying symptoms...");
    } else {
      toast.info("Querying symptoms...");
    }
    setLoadingAnswer(true);
    axios
      .post(`http://localhost:${BACKEND_PORT}/api/question`, {
        body: JSON.stringify({ question: question, image64: image64 }),
      })
      .then((res) => {
        console.log("Response received", res.data);
        setChatgptAnswer(res.data.answer);
      });
  };

  return (
    <div className="container pt-4" id="home">
      <h1>Doc AI</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>
            <h2>Prompt</h2>
          </Form.Label>
          <Form.Control
            className="promptBox"
            as="textarea"
            placeholder={questionPlaceholder}
            ref={questionRef}
          />
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Take photo"
              onChange={() => setTakePhoto((current) => !current)}
            />
          </Form.Group>
        </Form.Group>
      </Form>

      {takePhoto ? (
        <Webcam
          audio={false}
          height={720}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={1280}
          videoConstraints={videoConstraints}
        />
      ) : null}

      <Form>
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>

        <Form.Control
          className="answerBox mt-4"
          readOnly
          as="textarea"
          placeholder={
            loadingAnswer ? "Generating response..." : answerPlaceholder
          }
          value={chatgptAnswer}
        />
      </Form>
      <p className="disclaimer mt-5">{disclaimer}</p>
    </div>
  );
};

export default Home;
