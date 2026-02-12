import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Form, Button, Container, Card } from 'react-bootstrap';
import * as networkService from '../../services/networkService';

const SearchPage = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        const val = e.target.value;
        setQuery(val);

        if (val.trim().length >= 3) {
            const data = await networkService.searchUsers(val);
            setResults(data);
        } else {
            setResults([]);
        }
    };

    return (
        <Container className="search-container mt-5">
            <div className='row justify-content-center'>
                <div className="col-md-8 col-lg-6">
                    <Card className="shadow-sm">
                        <Card.Body className="p-4">
                            <Card.Title className="mb-4 fw-bold" style={{ fontFamily: 'Varela Round'}}>Find Friends</Card.Title>
                            {/* SEARCH AREA */}
                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Type a username..."
                                    value={query}
                                    onChange={handleSearch}
                                    autoFocus
                                />
                            </Form.Group>
                            {/* RESULTS AREA */}
                            <div className="search-results">
                                <div className="list-group list-group-flush border rounded">
                                    {results.map(user => (
                                        <Link 
                                            key={user.id} 
                                            className="search-card list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                                            to={`/users/${user.id}/profile`}
                                        >
                                            <span className='fw-bold'>{user.username}</span>{' '}
                                            {/* Use the specific profile path we registered */}
                                            <small className='text-primary'>View Profile &rarr;</small>
                                        </Link>
                                    ))}
                                </div>
                                {query.length > 1 && results.length === 0 && <p>No users found.</p>}
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </Container>
    );
};

export default SearchPage;