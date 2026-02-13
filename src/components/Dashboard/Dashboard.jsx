import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router';
import { UserContext } from '../../contexts/UserContext'
import * as userService from '../../services/userService'
import { Container, Col, Row, Card } from 'react-bootstrap';

const Dashboard = () => {
    const { user } = useContext(UserContext)
    const [users, setUsers] = useState([])
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const fetchedUsers = await userService.index()
                setUsers(fetchedUsers)
            } catch (err) {
                console.log(err)
            }
        }
        if (user) fetchUsers()
    }, [user])

    return (
        <Container className='mt-4'>
            <h2 className='mb-4'>Your DevSpace Dashboard</h2>
            <Row className='g-4'>
                {/* GRID 1: my most recent post */}
                <Col md={6}>
                    <Card className='h-100 shadow-sm border-0'>
                        <Card.Header className='bg-primary text-white'>My Latest Post:</Card.Header>
                        <Card.Body>
                            {myLatestPost ? (
                                <div>
                                    <h5>{myLatestPost.title}</h5>
                                    <p className="text-muted small">{formatDate(myLatestPost.created_at)}</p>
                                    <Link to={`/posts/${myLatestPost.id}`} className='btn btn-outline-primary btn-sm'></Link>
                                </div>
                            ):(
                                <p>You haven't posted anything yet!</p>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
                {/* GRID 2: recent activity (commented thread) */}
                <Col md={6}>
                    <Card className='h-100 shadow-sm border-0'>
                        <Card.Header className='bg-primary text-white'>Recent Conversation:</Card.Header>
                        <Card.Body>
                            {recentCommentedPost ? (
                                <div>
                                    <p className="mb-1">You commented on:</p>
                                    <h6 className="fw-bold">{recentCommentedPost.title}</h6>
                                    <Link to={`/posts/${recentCommentedPost.id}`} className="btn btn-outline-success btn-sm">Jump back in</Link>
                                </div>
                            ) : (
                                <p>No recent comments found.</p>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
                {/* GRID 3: friend's most recent post */}
                <Col md={6}>
                    <Card className='h-100 shadow-sm border-0'>
                        <Card.Header className='bg-primary text-white'>Friend Activity:</Card.Header>
                        <Card.Body>
                            
                        </Card.Body>
                    </Card>
                </Col>
                {/* GRID 4: friends list link */}
                <Col md={6}>
                    <Card className='h-100 shadow-sm border-0'>
                        <Card.Body>
                            
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
export default Dashboard
