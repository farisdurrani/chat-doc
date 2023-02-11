import React, { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

const BACKEND_PORT = 8000;

const Home = () => {
  const questionRef = useRef();
  const [chatgptAnswer, setChatgptAnswer] = useState("dfdsf");

  const handleSubmit = () => {
    const question = questionRef.current.value;
    console.log("Querying question: ", question)
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
          <Form.Label><h2>Prompt</h2></Form.Label>
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
    </div>
  );
};

export default Home;
