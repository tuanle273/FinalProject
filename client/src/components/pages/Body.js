import { useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import { AuthContext } from "../../contexts/AuthContext";
import { PostContext } from "../../contexts/PostContext";
const Body = () => {
  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);
  const {
    postState: { posts, postsLoading },
    getPosts,
  } = useContext(PostContext);

  //Start get all post
  useEffect(() => getPosts(), []);

  let body = null;

  if (postsLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (posts.length === 0) {
    body = (
      <>
        <Card className="text-center mx-5 my-5">
          <Card.Header as="h1">Hi {username}</Card.Header>
          <Card.Body>
            <Card.Title>Welcome to ConnyCar</Card.Title>
            <Card.Text>Click to track</Card.Text>
            <Button variant="primary">Rent</Button>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    body = (
      <>
        <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
          {posts.map((post) => (
            <Col key={post._id} className="my-2">
              <SinglePost post={post}></SinglePost>
            </Col>
          ))}
        </Row>
      </>
    );
  }

  return <h1>Home</h1>;
};

export default Body;
