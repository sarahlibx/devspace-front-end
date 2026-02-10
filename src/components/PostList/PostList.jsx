import { Link } from 'react-router';
import { formatDate } from '../../utils/formatDate';

const PostList = ({ posts }) => {

    if (!posts || !Array.isArray(posts)) {
        return <main><p>Loading posts...</p></main>;
    }

    return (
        <main>
            {posts.map((post) => (
                <Link key={post.id} to={`/posts/${post.id}`}>
                    <article>
                        <header>
                            <h2>Post #{post.id}</h2>
                            <p>
                                {post.author_username} posted on {formatDate(post.created_at)}
                            </p>
                        </header>
                        <p>{post.content}</p>
                    </article>
                </Link>
            ))}
        </main>
    )
}

export default PostList
