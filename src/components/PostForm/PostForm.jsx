import { useState, useEffect } from "react";
import { useParams } from "react-router";

import * as postService from "../../services/postService";

const PostForm = ({ handleAddPost, handleUpdatePost }) => {
  const { postId } = useParams();
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
    } else {
      handleAddPost(formData);
    }
  };

  return (
    <main>
      <h1>{postId ? "Edit Post" : "New Post"}</h1>
      <form onSubmit={handleSubmit}>
        
        <label htmlFor="content-input">What's on your mind?</label>
        <textarea
          required
          name="content" // Matches state key and backend data['content']
          id="content-input"
          value={formData.content}
          onChange={handleChange}
        />
        
        <button type="submit">SUBMIT</button>
      </form>
    </main>
  );
};

export default PostForm;
