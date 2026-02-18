import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Form, Button, Container, Card } from 'react-bootstrap';
import * as postService from "../../services/postService";

const PostForm = ({ handleAddPost, handleUpdatePost, shouldNavigate = true, isProfile = false}) => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    const fetchPost = async () => {
      const postData = await postService.show(postId);
      setFormData({ 
        title: postData.title,
        content: postData.content });
    };
    if (postId) fetchPost();
    return () =>
      setFormData({
        title: "",
        content: ""
      });
  }, [postId]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      if (postId) {
        // Logic for EDITING an existing post
        await handleUpdatePost(postId, formData);
        navigate('/posts');
      } else {
        // logic for CREATING a new post
        await handleAddPost(formData);
        setFormData({ title: '', content: '' });
        if (shouldNavigate) navigate('/posts');
      }
    } catch (err) {
      console.error('Form submission error', err);
  }
}

  const formContent = (
    <Form onSubmit={handleSubmit} className="p-3">
      <Form.Group className="mb-3">
          <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Give your post a title:"
              required
          />
          {/* <Form.Label>What's on your mind?</Form.Label> */}
          <Form.Control
            className="mt-3"
            required
            name="content" // Matches state key and backend data['content']
            id="content-input"
            placeholder="What's on your mind?"
            type="text"
            value={formData.content}
            onChange={handleChange}
          />
      </Form.Group>
      <div className="d-flex gap-3 pt-3 justify-content-center">
        <Button variant='primary' type='submit' className="rounded-pill px-4">Post to Network</Button>
        <Button variant='outline-secondary' onClick={() => navigate(-1)} className="rounded-pill px-4">Cancel</Button>
      </div>
    </Form>
  );

  if (isProfile) {
    return formContent;
  };

  return (
    <Container className="mt-5 pt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <Card.Title className="mb-2 fw-bold" style={{ fontFamily: 'Varela Round'}}>{postId ? "Edit Post" : "New Post"}</Card.Title>
              {formContent}
            </Card.Body>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default PostForm;
