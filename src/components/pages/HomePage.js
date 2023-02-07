import { useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { AuthContext } from "../../contexts/AuthContext";
import { PostContext } from "../../contexts/PostContext";
import SinglePost from "../posts/SinglePost";
const HomePage = () => {
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
  if (posts.length === 0) {
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

  return <>{body}</>;
};

export default HomePage;
