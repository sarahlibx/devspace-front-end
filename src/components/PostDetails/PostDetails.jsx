import { useParams, Link } from 'react-router'
import { useState, useEffect, useContext } from 'react'

import * as postService from '../../services/postService'
import { UserContext } from '../../contexts/UserContext'

import CommentForm from '../CommentForm/CommentForm'

const PostDetails = ({ handleDeletePost }) => {
    const { postId } = useParams()
    const [post, setPost] = useState(null)
    const { user } = useContext(UserContext)

    useEffect(() => {
        const fetchPost = async () => {
            const postData = await postService.show(postId)
            setPost(postData)
        }
        fetchPost()
    }, [postId])

    const handleAddComment = async (commentFormData) => {
        const newComment = await postService.createComment(
            postId,
            commentFormData,
        )
        setPost({ ...post, comments: [newComment, ...post.comments] })
        console.log('commentFormData -->', commentFormData)
    }

    const handleDeleteComment = async (commentId) => {
        if (!commentId) {
        console.error("No commentId provided to delete function!");
        return;
    }

        const response = await postService.deleteComment(commentId);
    
        if (!response.error) {
            // Filter out the deleted comment from the local state
            setPost({
                ...post,
                comments: post.comments.filter((c) => (c.id || c.comment_id) !== commentId)
            });
        }
    };

    if (!post) return <main>Loading...</main>
    console.log(post)

    console.log('Post Author ID:', post.user_id);
    console.log('Logged in User ID:', user.id);
    console.log('Do they match?', post.user_id === user.id);
    
    return (
        <main>
            <section>
                <header>
                    <h1>Post #{post.id}</h1>
                    <p>
                        {`${post.author_username} posted on
                        ${new Date(post.created_at).toLocaleDateString()}`}
                    </p>
                    
                    {Number(post.user_id) === Number(user.id) && (
                        <>
                            <Link to={`/posts/${postId}/edit`}>Edit</Link>
                            <button onClick={() => handleDeletePost(postId)}>
                                Delete Post
                            </button>
                        </>
                    )}
                </header>
                <p>{post.content}</p>
            </section>

            <section>
                <h2>Comments</h2>
                <CommentForm handleAddComment={handleAddComment} />

                {!post.comments.length && <p>There are no comments.</p>}

                {post.comments.map((comment) => (
                    <article key={comment.comment_id || comment.id}>
                            <p>{comment.author_username}: {comment.comment_text || comment.content}</p>
                            {console.log('This comment object:', comment)}
                    {Number(comment.user_id) === Number(user.id) && (
                        <button onClick={() => handleDeleteComment(comment.id)}>
                            Delete Comment
                        </button>
                    )}
                    </article>
                ))}
            </section>
        </main>
    )
}

export default PostDetails
