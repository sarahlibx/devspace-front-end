import { useParams, Link, useNavigate } from 'react-router'
import { useState, useEffect, useContext } from 'react'
import { Container, Card, Button, Badge } from 'react-bootstrap';
import * as postService from '../../services/postService'
import { UserContext } from '../../contexts/UserContext'
import CommentForm from '../CommentForm/CommentForm'

const PostDetails = ({ handleDeletePost }) => {
    const { postId } = useParams()
    const [post, setPost] = useState(null)
    const { user } = useContext(UserContext)
    const navigate = useNavigate();

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
        setPost({ 
            ...post, 
            comments: [newComment, ...post.comments] })
    }

    const handleDeleteComment = async (commentId) => {

        if (!commentId) {
        console.error("No commentId provided to delete function!");
        return;
    }

        const response = await postService.deleteComment(postId, commentId);
    
        if (!response.error) {
            // Filter out the deleted comment from the local state
            setPost({
                ...post,
                comments: post.comments.filter((c) => (c.id || c.comment_id) !== commentId)
            });
        }
    };

    if (!post) return <Container className="mt-5 text-center"><h3>Loading DevPost...</h3></Container>;
    
    return (
        <Container className='mt-5 mb-5'>
            {/* MAIN POST SECTION */}
            <Card className='shadow-sm border-0 mb-5'>
                <Card.Body className='p-4'>
                    <div className="d-flex justify-content-between align-items-start mb-3">
                        <div>
                            <h1>Post #{post.id}</h1>
                            <p>
                                {`${post.author_username} posted on
                                ${new Date(post.created_at).toLocaleDateString()}`}
                            </p>
                        </div>
                    
                        {Number(post.user_id) === Number(user.id) && (
                            <>
                            <div className="d-flex gap-2">
                                <Link 
                                    className="btn btn-outline-secondary rounded-pill px-3"
                                    to={`/posts/${postId}/edit`}>Edit</Link>
                                <Button 
                                    variant="outline-danger" 
                                    size="sm" 
                                    className="rounded-pill px-3" 
                                    onClick={() => handleDeletePost(postId)}
                                >
                                    Delete Post
                                </Button>
                            </div>
                            </>
                        )}
                    </div>
                    <hr />
                    <Card.Text sryle={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
                        {post.content}
                    </Card.Text>
                </Card.Body>
            </Card>

            {/* COMMENTS SECTION */}
            <section style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h3 className="mb-4 fw-bold">
                    Comments 
                    <Badge 
                        bg="secondary" 
                        className="ms-2"
                    >
                        {post.comments.length}
                    </Badge>
                </h3>

                <CommentForm handleAddComment={handleAddComment} />

                {!post.comments.length && <p className="text-muted text-center py-4">There are no comments.</p>}

                {post.comments.map((comment) => {
                    return (
                    <Card key={comment.comment_id || comment.id} className="mb-3 border-0 shadow-sm">
                        <Card.Body className='p-3'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <div>
                                    <span className='fw-bold text-primary'>{comment.author_username}:</span>
                                    <p className='mb-0 mt-1'>{comment.comment_text || comment.content}</p>
                                </div>

                                {Number(comment.user_id) === Number(user.id) && (
                                <Button 
                                    variant='link'
                                    className='text-danger text-decoration-none p-0'
                                    onClick={() => handleDeleteComment(comment.id || comment.comment_id)}
                                >
                                    Delete Comment
                                </Button>
                            )}
                            </div>
                        </Card.Body>
                    </Card>
                    );
                })}
            </section>
        </Container>
    );
};

export default PostDetails;
