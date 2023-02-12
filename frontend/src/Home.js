import React, { useState, useRef, useCallback } from "react";
import { Button, Form } from "react-bootstrap";
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
  const [loadingAnswer, setLoadingAnswer] = useState(false);
  const [uploadedImage, setUploadedImage] = useState();

  const capture = useCallback(() => {
    return webcamRef.current.getScreenshot();
  }, [webcamRef]);

  const handleSubmit = () => {
    const question = questionRef.current.value;
    if (!question) {
      toast.error("Please enter your symptoms");
      return;
    }
    setLoadingAnswer(true);
    setChatgptAnswer("");

    console.log("Querying question: ", question);
    let image64;
    if (takePhoto) {
      image64 = uploadedImage ? uploadedImage : capture();
      toast.info("Uploading photo and querying symptoms...");
    } else {
      toast.info("Querying symptoms...");
    }
    console.log({ question: question, image64Size: image64?.length });
    axios
      .post(`http://localhost:${BACKEND_PORT}/api/question`, {
        body: JSON.stringify({ question: question, image64: image64 }),
      })
      .then((res) => {
        console.log("Response received");
        setChatgptAnswer(res.data.answer);
        setLoadingAnswer(false);
      });
  };

  async function handleUpload() {
    const file = document.querySelector("#file-upload")?.files[0];
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        const image64 = reader.result;
        setUploadedImage(image64);
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className="container pt-4" id="home">
      <h1>Upside Healthcare</h1>
      <Form>
        <Form.Group className="mt-5 mb-3" controlId="formBasicPassword">
          <Form.Label>
            <h2>
              Hi. Tell us your symptoms and maybe upload a picture. We'll
              provide suggestions
            </h2>
          </Form.Label>
          <Form.Control
            className="promptBox"
            as="textarea"
            placeholder={questionPlaceholder}
            ref={questionRef}
          />
          <Form.Group className="mt-3 mb-3" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Take photo"
              onChange={() => setTakePhoto((current) => !current)}
            />
          </Form.Group>
        </Form.Group>
      </Form>

      {takePhoto ? (
        <div className="webcam-upload d-flex flex-column align-items-center justify-content-center ms-auto me-auto">
          <Webcam
            audio={false}
            className="mb-3"
            height={563}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={1000}
          />
          <p>OR</p>
          <Form.Control
            onChange={handleUpload}
            type="file"
            id="file-upload"
            className="file-upload mt-1"
          />
        </div>
      ) : null}

      <Form className="mt-3">
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={loadingAnswer}
        >
          Submit
        </Button>

        <Form.Control
          className="answerBox mt-5"
          readOnly
          as="textarea"
          placeholder={
            loadingAnswer ? "Generating response..." : answerPlaceholder
          }
          value={chatgptAnswer}
        />
      </Form>
      <p className="disclaimer mt-5 mb-5">{disclaimer}</p>
    </div>
  );
};

export default Home;
