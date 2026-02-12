import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Form, Button, Container, Card } from 'react-bootstrap';
import * as postService from "../../services/postService";

const PostForm = ({ handleAddPost, handleUpdatePost }) => {
  const { postId } = useParams();
  const navigate = useNavigate();
  // console.log(postId);
  const [formData, setFormData] = useState({
    content: "",
  });

  useEffect(() => {
    const fetchPost = async () => {
      const postData = await postService.show(postId);
      setFormData({ content: postData.content });
    };
    if (postId) fetchPost();
    return () =>
      setFormData({
        content: ""
      });
  }, [postId]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log("formData", formData);
    if (postId) {
      handleUpdatePost(postId, formData);
      navigate('/posts');
    } else {
      handleAddPost(formData);
      navigate('/posts');
    }
  };

  return (
    <Container className="mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <Card.Title className="mb-4 fw-bold" style={{ fontFamily: 'Varela Round'}}>{postId ? "Edit Post" : "New Post"}</Card.Title>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>What's on your mind?</Form.Label>
                  <Form.Control
                    required
                    name="content" // Matches state key and backend data['content']
                    id="content-input"
                    value={formData.content}
                    onChange={handleChange}
                  />
                </Form.Group>
                <div className="d-flex gap-3 justify-content-center">
                  <Button variant='primary' type='submit' className="rounded-pill px-4">Post to Network</Button>
                  <Button variant='outline-secondary' onClick={() => navigate(-1)} className="rounded-pill px-4">Cancel</Button>
                </div>
            </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default PostForm;
