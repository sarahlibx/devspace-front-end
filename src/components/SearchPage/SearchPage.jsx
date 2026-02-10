import { useState } from 'react';
import { Link } from 'react-router';
import * as networkService from '../../services/networkService';

const SearchPage = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async (e) => {
        const val = e.target.value;
        setQuery(val);

        if (val.length > 1) {
            const data = await networkService.searchUsers(val);
            setResults(data);
        } else {
            setResults([]);
        }
    };

    return (
        <main className="search-container">
            <h1>Find Friends</h1>
            <input
                type="text"
                placeholder="Type a username..."
                value={query}
                onChange={handleSearch}
                autoFocus
            />

            <div className="search-results">
                {results.map(user => (
                    <div key={user.id} className="search-card">
                        <span>{user.username}</span>
                        {/* Use the specific profile path we registered */}
                        <Link to={`/users/${user.id}/profile`}>View Profile</Link>
                    </div>
                ))}
                {query.length > 1 && results.length === 0 && <p>No users found.</p>}
            </div>
        </main>
    );
};

export default SearchPage;