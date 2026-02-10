import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import * as networkService from '../../services/networkService';
import * as profileService from '../../services/profileService';
import * as friendService from '../../services/friendService';
import { UserContext } from '../../contexts/UserContext';
import { formatDate } from '../../utils/formatDate';

const ProfilePage = () => {
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

    if (loading) return <p>Loading DevSpace...</p>;
    if (!networkData) return <p>User not found.</p>

    return (
        <main>
            {/* Header Section (Network Data) */}
            <section className='bio-container'>
                <h1>{networkData.user.username}'s Space</h1>
                {/* Show Edit Button if it's the owner */}
                {isOwner && (
                    <button onClick={() => navigate(`/users/${userId}/edit`)}>
                        Edit Profile
                    </button>
                )}
            </section>

            <section className='user-contact-links'>
                <a href={`mailto:${devSpaceData?.email}`} target="_blank" rel="noreferrer">Message Me</a>
                <a href={devSpaceData?.github_link} target="_blank">Connect on GitHub</a>
                <a href={devSpaceData?.linkedin_link} target="_blank">Add on LinkedIn</a>
                {!isOwner && loggedInUser && (
                    <button 
                        onClick={handleAddFriend}
                        disabled={isFriend}
                        className={isFriend ? 'friend-btn-active' : 'friend-btn'}
                    >
                        {isFriend ? '✓ Friends' : '+ Add Friend'}
                    </button>
                )}
            </section>

            {/* DevSpace Details (Profile Data) */}
            <section className="user-info">
                {devSpaceData ? (
                    <>
                        <blockquote>"{devSpaceData.bio_quote}"</blockquote>
                        <ul>
                            <li><strong>Fun Fact:</strong> {devSpaceData.fun_fact}</li>
                            <li><strong>Fav Language:</strong> {devSpaceData.fav_language}</li>
                            {/* TODO Render other fields... */}
                        </ul>
                    </>
                ) : (
                    <div className='no-profile'>
                        <p>This user hasn't customized their DevSpace yet.</p>
                        {isOwner && <button onClick={() => navigate(`/users/${userId}/edit`)}>Create Yours Now</button>}
                    </div>
                )}
            </section>

            {/* Social Section (Network Data) */}
            <section className='user-posts-wall'>

                <h3>{networkData.user.username}'s Posts</h3>
                
                {networkData.posts && networkData.posts.length > 0 ? (
                    <div className='posts-container'>
                        {networkData.posts.map((post) => (
                        <article key={post.id} className='post-card'>
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

            <section className='friends-list'>
                <h3>Friends ({networkData.friend_count})</h3>
                <div className='friends-grid'>
                    {networkData.friends.map((friend) => (
                    <div key={friend.id} className='friend-item'>
                        <Link to={`/users/${friend.id}/profile`}>
                            <p>{friend.username}</p>
                        </Link>
                    </div>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default ProfilePage;