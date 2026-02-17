import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { UserContext } from '../../contexts/UserContext';
import * as userService from '../../services/userService';
import * as postService from '../../services/postService';
import * as networkService from '../../services/networkService';
import { formatDate } from '../../utils/formatDate';
import { Container, Col, Row, Card } from 'react-bootstrap';

const Dashboard = () => {
    const { user: loggedInUser } = useContext(UserContext);
    const [allPosts, setAllPosts] = useState([]);
    const [networkData, setNetworkData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Fetch posts and friends in parallel
                const [posts, network] = await Promise.all([
                    postService.index(),
                    networkService.getNetworkData(loggedInUser.id)
                ]);
                setAllPosts(posts);
                setNetworkData(network);
            } catch (err) {
                console.error("Dashboard error:", err);
            } finally {
                setLoading(false);
            }
        };
        if (loggedInUser) fetchDashboardData();
    }, [loggedInUser]);

    // LOADING GUARD
    if (loading) {
        return <Container className="mt-4"><p>Loading your dashboard...</p></Container>;
    }

    // GRID 1: My Latest Post
    const myLatestPost = allPosts
        .filter(p => String(p.user_id) === String(loggedInUser?.id))
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];

    // GRID 2: Recent Conversation (Checking the user_id inside comments)
    const recentCommentedPost = allPosts
        .filter(p => p.comments?.some(c => String(c.user_id) === String(loggedInUser?.id)))
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];

    // GRID 3: Friend activity
    const friendIds = networkData?.friends?.map(f => String(f.id)) || [];
    const latestFriendPost = allPosts
        .filter(p => friendIds.includes(String(p.user_id)))
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];

    return (
        <Container className='mt-5 pt-5'>
            <h2 className='mb-4'>Your DevSpace Dashboard</h2>
            <Row className='g-4'>
                {/* GRID 1: my most recent post */}
                <Col md={6}>
                    <Card className='h-100 shadow-sm border-0'>
                        <Card.Header className='bg-primary text-white'>My Latest Post:</Card.Header>
                        <Card.Body>
                            {myLatestPost ? (
                                <div>
                                    <h5>{myLatestPost.content}</h5>
                                    <p className="text-muted small">{formatDate(myLatestPost.created_at)}</p>
                                    <Link to={`/posts/${myLatestPost.id}`} className='btn btn-outline-primary rounded-pill btn-sm'>Read More</Link>
                                </div>
                            ):(
                                <p>You haven't posted anything yet!</p>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
                {/* GRID 2: recent conversation (checking the user_id inside comments) */}
                <Col md={6}>
                    <Card className='h-100 shadow-sm border-0'>
                        <Card.Header className='bg-primary text-white'>Recent Conversation:</Card.Header>
                        <Card.Body>
                            {recentCommentedPost ? (
                                <div>
                                    <p className="mb-1">You commented on:</p>
                                    <h6 className="fw-bold">{recentCommentedPost.content}</h6>
                                    <Link to={`/posts/${recentCommentedPost.id}`} className="btn btn-outline-primary rounded-pill btn-sm">Jump back in</Link>
                                </div>
                            ) : (
                                <p>No recent comments found.</p>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
                {/* GRID 3: friend activity */}
                <Col md={6}>
                    <Card className='h-100 shadow-sm border-0'>
                        <Card.Header className='bg-primary text-white'>Friend Activity:</Card.Header>
                        <Card.Body>
                            {latestFriendPost ? (
                                <div>
                                    <h6 className="fw-bold">{latestFriendPost.author_username} posted:</h6>
                                    <p>"{latestFriendPost.content}"</p>
                                    <Link to={`/posts/${latestFriendPost.id}`} className="btn btn-sm btn-outline-primary rounded-pill">Read More</Link>
                                </div>
                            ) : (
                                <p>Your friends are quiet...</p>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
                {/* GRID 4: friends list link */}
                <Col md={6}>
                    <Card className='h-100 shadow-sm border-0'>
                        <Card.Body className="d-flex flex-column justify-content-center">
                            <h4>My Network</h4>
                            <h2 className="fw-bold text-primary">{networkData?.friends?.length || 0}</h2>
                            <p className="text-muted">Friends</p>
                            <Link to={`/users/${loggedInUser?.id}/friends`} className="btn btn-dark rounded-pill">View All Friends</Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
export default Dashboard
