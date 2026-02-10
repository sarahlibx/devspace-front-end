import { useState } from 'react';

const CommentForm = ({ handleAddComment }) => {
  const [formData, setFormData] = useState({ content: '' });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    // add handleAddComment
    handleAddComment(formData)
    setFormData({ content: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='text-input'>Your comment:</label>
      <textarea
        required
        type='text'
        name='content'
        id='content-input'
        value={formData.content}
        onChange={handleChange}
      />
      <button type='submit'>SUBMIT COMMENT</button>
    </form>
  );
};

export default CommentForm;

