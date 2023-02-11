import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
const HomePage = () => {
  return (
    <div>
      <Card className="text-center mx-4 my-2 bg-slate-50">
        <Card.Header as="h1">Hi </Card.Header>
        <Card.Body>
          <Card.Title>Welcome to ConnyCar</Card.Title>
          <Card.Text>Click to track</Card.Text>
          <Button variant="primary">Rent</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default HomePage;
