import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { Container, Row, Col, Card, Image, ListGroup } from 'react-bootstrap';
import * as networkService from '../../services/networkService';
import * as profileService from '../../services/profileService';
import * as friendService from '../../services/friendService';
import * as postService from '../../services/postService';
import { UserContext } from '../../contexts/UserContext';
import { formatDate } from '../../utils/formatDate';
import PostForm from '../PostForm/PostForm'; 
import defaultAvatar from '../../assets/no-picture-avatar.jpg';

const ProfilePage = ({ handleAddPost }) => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const { user: loggedInUser } = useContext(UserContext);
    
    const [networkData, setNetworkData] = useState(null);
    const [devSpaceData, setDevSpaceData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isFriend, setIsFriend] = useState(false);
    
    // boolean check if this is the user's own profile
    const isOwner = loggedInUser && loggedInUser.id === Number(userId);

    
    useEffect(() => {
        const fetchAllData = async () => {
            setLoading(true);
            try {
                // Fetch both blueprints in parallel
                const [network, devSpace] = await Promise.all([
                    networkService.getNetworkData(userId),
                    profileService.getDevSpaceData(userId)
                ]);
                
                setNetworkData(network);
                setDevSpaceData(devSpace?.user_id ? devSpace : null);

                // check if logged in user is in friend list
                const alreadyFriends = network.friends.some(f => f.id === loggedInUser?.id);
                setIsFriend(alreadyFriends);

            } catch (err) {
                console.error("Error loading profile:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchAllData();
    }, [userId, loggedInUser?.id]);

    const handleAddFriend = async () => {
        try {
            await friendService.addFriend(userId);

            const updatedNetwork = await networkService.getNetworkData(userId);
            setNetworkData(updatedNetwork);

            // update friend state
            setIsFriend(true);
        } catch (err) {
            console.error(err);
        }
    }

    const handleAddPostOnProfile = async (postFormData) => {
        try {
            const newPost = await postService.create(postFormData);

            setNetworkData((prev) => ({
                ...prev, 
                posts: [newPost, ...prev.posts]
            }));
            
            // update state
            if (handleAddPost) handleAddPost(newPost);

        } catch (err) {
            console.error(err);
        }
    }

    if (loading) return <p>Loading DevSpace...</p>;
    if (!networkData) return <p>User not found.</p>

    return (
        <Container className='mt-4'>
            <Row>
            {/* LEFT COLUMN */}
            <Col md={4}>
                {/* Header Section (Network Data) */}
                <Card className='mb-3 border-0 text-center p-3'>
                    <h2 className='fw-bold' style={{ fontFamily: 'Varela Round' }}>{networkData.user.username}'s Space</h2>
                        {/* Show Edit Button if it's the owner */}
                        {isOwner && (
                            <Link className="small text-muted text-decoration-none" to={(`/users/${userId}/edit`)}>
                                Edit Profile
                            </Link>
                        )}
                        <div className="d-flex align-items-center justify-content-between mb-3 mt-3 gap-3">
                            <Image 
                                src={devSpaceData?.profile_picture_url || defaultAvatar} 
                                alt='profile picture'
                                rounded 
                                width="auto" 
                                height="175" 
                                className="border"
                                style={{ objectFit: 'cover' }}
                            />
                            <p className="text-muted">"{devSpaceData?.bio_quote || "Hello World!"}"</p>
                            
                        </div>
                        {/* Online Now Indicator */}
                            <Image 
                                className="online-now "
                                src="https://archive.org/download/myspaceon/myspaceon.gif"
                                alt="online now"
                                width='100'
                                height='auto'
                            />
                </Card>
                
                {/* Contact Links */}
                <Card className='user-contact-links mb-3 border-0 shadow-sm'>
                    <Card.Body>
                        <Row className='g-2 d-flex justify-content-between small'>
                            <Col xs={6} className='d-flex justify-content-start'>
                                <a className="text-decoration-none" href={`mailto:${devSpaceData?.email}`} target="_blank" rel="noreferrer">
                                    <img src="../../src/assets/square-envelope-solid-full.svg" alt="Email Me" style={{ width:"30px", height:"auto"}}></img>
                                    Message Me
                                </a>
                            </Col>
                            <Col xs={6} className='d-flex justify-content-end'>
                                <a className="text-decoration-none" href={devSpaceData?.github_link} target="_blank">
                                    <img src="../../src/assets/square-github-brands-solid-full.svg" alt="GitHub Link" style={{ width:"30px", height:"auto"}}></img>
                                    Connect on GitHub
                                </a>
                            </Col>
                            <Col xs={6} className='d-flex justify-content-start'>
                                <a className="text-decoration-none" href={devSpaceData?.linkedin_link} target="_blank">
                                    <img src="../../src/assets/square-linkedin-brands-solid-full.svg" alt="LinkedIn" style={{ width:"30px", height:"auto"}}></img>
                                    Add on LinkedIn
                                </a>
                            </Col>
                            <Col xs={6} className='d-flex justify-content-end'>{!isOwner && loggedInUser && (
                                <button 
                                    onClick={handleAddFriend}
                                    disabled={isFriend}
                                    className={isFriend ? 'friend-btn-active rounded-pill' : 'friend-btn rounded-pill'}
                                >
                                    {isFriend ? '✓ Friends' : '+ Add Friend'}
                                </button>
                            )}
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

            {/* DevSpace Details (Profile Data) */}
            <Card className="user-info border-0 shadow-sm">
                <Card.Header>{networkData.user.username}'s Interests</Card.Header>
                {devSpaceData ? (
                    <>
                        <ListGroup>
                            <ListGroup.Item className='d-flex justify-content-start gap-2'><strong>Fun Fact:</strong> {devSpaceData.fun_fact}</ListGroup.Item>
                            <ListGroup.Item className='d-flex justify-content-start gap-2'><strong>Favorite Band:</strong> {devSpaceData.fav_band}</ListGroup.Item>
                            <ListGroup.Item className='d-flex justify-content-start gap-2'><strong>Fav Book:</strong> {devSpaceData.fav_book}</ListGroup.Item>
                            <ListGroup.Item className='d-flex justify-content-start gap-2'><strong>Fav Coding Language:</strong> {devSpaceData.fav_language}</ListGroup.Item>
                            <ListGroup.Item className='d-flex justify-content-start gap-2'><strong>Hobbies:</strong> {devSpaceData.hobbies}</ListGroup.Item>
                        </ListGroup>
                    </>
                ) : (
                    <div className='no-profile'>
                        <p>This user hasn't customized their DevSpace yet.</p>
                        {isOwner && <button onClick={() => navigate(`/users/${userId}/edit`)}>Create Yours Now</button>}
                    </div>
                )}
            </Card>
            </Col>
            
            {/* RIGHT COLUMN */}
            {/* Social Section (Network Data) */}
            <Col md={8}>
                {/* Post Creation (Only if it's the owner's profile) */}
                {isOwner && (
                    <Card className="mb-4 border-0 shadow-sm bg-white overflow-hidden">
                            <PostForm 
                                handleAddPost={handleAddPostOnProfile} 
                                shouldNavigate={false}
                                isProfile={true}
                            />
                    </Card>
                )}

                {/* User's Posts Feed */}
                <section className='user-posts-wall mb-5'>

                <h3 className='bg-white rounded pb-2 mb-3 fw-bold'>{networkData.user.username}'s Posts</h3>
                
                {/* map through posts */}
                {networkData.posts && networkData.posts.length > 0 ? (
                    <div className='posts-container'>
                        {networkData.posts.map((post) => (
                        <article key={post.id} className='post-card p-4 bg-white rounded text-center text-muted mb-3'>
                            <h4>{post.title}</h4>
                            <p>{post.content}</p>
                            <small>Posted on {formatDate(post.created_at)}</small>
                            <Link to={`/posts/${post.id}`}>View Discussion</Link>
                        </article>
                        ))}
                    </div>
                ) : (
                    <p className='no-posts'>This user hasn't posted anything yet!</p>
                )}
            </section>

            <section className='friends-list mb-3'>
                <h3 className='bg-secondary text-white p-2 h6 mb-3'>My Top 8! | Total Friends: {networkData.friend_count}</h3>
                <Row className='friends-grid g-3'>
                    {networkData.friends.slice(0, 8).map((friend) => (
                    <Col xs={3} key={friend.id} className='friend-item text-center'>
                        <div className="bg-light border" style={{ height: '120px', width: '100%' }}>
                        <Link to={`/users/${friend.id}/profile`} className='text-decoration-none'>
                            <div className="friend-photo-container mb-1">
                                <Image
                                    src={friend.profile_picture_url || defaultAvatar}
                                    alt={friend.username}
                                    className='border shadow-sm'
                                    style={{
                                        width: '100%',
                                        height: '90px',
                                        objectFit: 'cover'
                                        }}    
                                    >
                                </Image>
                            </div>
                            <p className='small text-truncate' style={{ color: '#00096b' }}>
                                {friend.username}
                            </p>
                        </Link>
                        </div>
                    </Col>
                    ))}
                </Row>
            </section>
            </Col>
            </Row>
        </Container>
    );
};

export default ProfilePage;