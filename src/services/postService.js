const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/posts` || 'http://127.0.0.1:5000/posts';

const index = async () => {
    try {
        const res = await fetch(BASE_URL, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        return res.json();
    } catch (err) {
        console.log(err)
    }
};

const show = async (postId) => {
    try {
        const res = await fetch(`${BASE_URL}/${postId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        return res.json();
    } catch (err) {
        console.log(err);
    }
}

const create = async (postFormData) => {
    try {
        const res = await fetch(`${BASE_URL}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postFormData)
        });
        return res.json();
    } catch (err) {
        console.log(err);
    }
};

const createComment = async (postId, commentFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${postId}/comments`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};


const deletePost = async (postId) => {
  try {
    const res = await fetch(`${BASE_URL}/${postId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const updatePost = async (postId, postFormData) => {
    try {
        const res = await fetch(`${BASE_URL}/${postId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postFormData),
        });
        return res.json();
    } catch (err) {
        console.log(err)
    };
};

const deleteComment = async (postId, commentId) => {
    try {
        const res = await fetch(`${BASE_URL}/${postId}/comments/${commentId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        return res.json();
    } catch (err) {
        console.log(err)
    };
};

export {
  index,
  show,
  create,
  createComment,
  deletePost,
  updatePost,
  deleteComment
};


