import React, { useRef } from "react";
import PropTypes from "prop-types";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

const BACKEND_PORT = 8000;

const Home = () => {
  const questionRef = useRef();
  const handleSubmit = () => {
    const question = questionRef.current.value;
    console.log(question);
    axios
      .post(`http://localhost:${BACKEND_PORT}/api/question`, {
        body: JSON.stringify({question: question}),
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  return (
    <div className="container">
      <h1>Write your question</h1>
      <Form >
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="text" placeholder="Question" ref={questionRef} />
        </Form.Group>
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

Home.propTypes = {};

export default Home;
