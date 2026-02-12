import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Form, Button, Card } from 'react-bootstrap';

const CommentForm = ({ handleAddComment }) => {
  const [formData, setFormData] = useState({ content: '' });
  const navigate = useNavigate();

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleAddComment(formData)
    setFormData({ content: '' });
  };

  return (
    <Card className='mb-4 shadow-sm border-0 bg-light'>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3'>
          <Form.Label htmlFor='text-input'>Join the Conversation...</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              required
              name='content'
              id='content-input'
              placeholder='What are your thoughts?'
              value={formData.content}
              onChange={handleChange}
              className='border-0 shadow-none'
            />
          </Form.Group>

            {/* ACTION BUTTONS */}
            <div className="d-flex justify-content-end gap-3">
              <Button 
                type='submit'
                className='rounded-pill px-4 fw-bold text-white'
                style={{ backgroundColor: '#00096B', border: 'none' }}
              >
                Add Comment</Button>
              <Button 
                variant='outline-secondary' 
                onClick={() => navigate(-1)} 
                className="rounded-pill px-4"
              >
                Cancel
              </Button>
            </div>
        </Form>
      </Card.Body>
    </Card> 
    
  );
};

export default CommentForm;

