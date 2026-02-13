import { Link} from 'react-router';
import { formatDate } from '../../utils/formatDate';
import { Container, Row, Col, Card, Image} from 'react-bootstrap';
import defaultAvatar from '../../assets/no-picture-avatar.jpg';

const PostList = ({ posts }) => {

    if (!posts || !Array.isArray(posts)) {
        return <main><p>Loading posts...</p></main>;
    }

    return (
        <Container className='shadow-sm border-0 bg-transparent'>
            <Row className='justify-content-center'>
                <Col md={8}>
                    <h2 className='my-4 py-1 rounded' style={{ fontFamily: 'Varela Round', backgroundColor: '#4b5ae4', color: '#FFFFFF' }}>Your Community Feed</h2>
                    {posts.map((post) => (
                        <Card key={post.id} className='mb-3 shadow-sm border-0'>
                            <Card.Body>
                                <div className='d-flex align-items-center mb-3'>
                                    <Image 
                                        src={post.profile_picture_url || defaultAvatar} 
                                        roundedCircle 
                                        width="50" 
                                        height="50" 
                                        className="me-2"
                                    />
                                    <div>
                                        <Link to={`/users/${post.user_id}/profile`} className='fw-bold text-decoration-none'>
                                            {post.author_username}
                                        </Link>
                                    </div>
                                    <div className='text-muted small'>
                                        posted on {formatDate(post.created_at)}
                                    </div>
                                    </div>
                                <Card.Text>{post.content}</Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </Col>
            </Row>
        </Container>
    )
}

export default PostList
