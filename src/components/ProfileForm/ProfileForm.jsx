import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Form, Button, Container, Card, Row, Col, CardHeader, Image } from 'react-bootstrap';
import * as profileService from '../../services/profileService';
import defaultAvatar from '../../assets/no-picture-avatar.jpg';

const ProfileForm = ({ existingData, onSuccess }) => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(defaultAvatar);
    
    const [formData, setFormData] = useState({
        bio_quote: '',
        fun_fact: '',
        fav_band: '',
        fav_book: '',
        hobbies: '',
        fav_language: '',
        email: '',
        github_link: '',
        linkedin_link: '', 
        profile_song: ''
    });
    
    // fetch data if existingData is not provided
    useEffect(() => {
        const fetchProfile = async () => {
            // Only fetch if we don't have existingData and we have a userId
            if (!existingData && userId) {
                try {
                    const data = await profileService.getDevSpaceData(userId);
                    if (data) {
                        setFormData({
                            bio_quote: data.bio_quote || '',
                            fun_fact: data.fun_fact || '',
                            fav_band: data.fav_band || '',
                            fav_book: data.fav_book || '',
                            hobbies: data.hobbies || '',
                            fav_language: data.fav_language || '',
                            email: data.email || '',
                            github_link: data.github_link || '',
                            linkedin_link: data.linkedin_link || '',
                            profile_song: data.profile_song || ''
                        });
                        if (data.profile_picture_url) {
                            setPreviewUrl(data.profile_picture_url);
                        } else {
                            // A standard default avatar
                            setPreviewUrl(defaultAvatar);
                        }
                    }
                } catch (err) {
                    console.error("Error fetching profile for edit:", err);
                }
            }
        };

        fetchProfile();
    }, [userId, existingData]);

    // prefill form with data if user has profile
    useEffect(() => {
        // Only run if existingData isn't null/undefined
        if (existingData && Object.keys(existingData).length > 0) {
            console.log("Pre-filling form with:", existingData);
            setFormData(existingData);
        
            // Also set the image preview if it exists
            if (existingData.profile_picture_url) {
                setPreviewUrl(existingData.profile_picture_url || defaultAvatar);
            }
        }
    }, [existingData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // for profile picture
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const MAX_SIZE = 10 * 1024 * 1024; // 10MB in bytes
        
        // check file size re: cloudinary constraints
        if (file && file.size > MAX_SIZE) {
        alert("This file is too big! Please choose an image smaller than 10MB.");
        e.target.value = null; // Clear the input
        return; 
        }
        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
    };

    // helper for the counter char limits
    const renderCounter = (text, limit) => {
        const remaining = limit - (text?.length || 0);
        return (
            <small className={`char-counter ${remaining < 5 ? 'warning' : ''}`}>
                {remaining} characters left
            </small>
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // new package that accepts text & images
            const data = new FormData();
            // append the file if user picked one
            if (selectedFile) {
                data.append('photo', selectedFile);
            }
            // append text fields from state
            Object.keys(formData).forEach((key) => {
                data.append(key, formData[key]);
            });

            // send data FormData instead of formData object
            const updatedProfile = await profileService.updateDevSpace(data);

            if (onSuccess) onSuccess(updatedProfile);
            navigate(`/users/${userId}/profile`);
        } catch (err) {
            console.error('Failed to update profile', err);
        }
    }

    return (
        <Container>
            <Row className='justify-content-center'>
                <Col md={10} lg={8}>
                    <Card className='shadow-sm border-0 bg-transparent'>
                        <Card.Body className='p-5'>
                            <Card.Title className='bg-white'>Customize Your DevSpace</Card.Title>
                        
                            <Form onSubmit={handleSubmit} className="profile-form">
                            
                            {/* PHOTO UPLOAD SECTION */}
                            <div className="text-center mb-4">
                                <label htmlFor="profile_picture_url" style={{ cursor: 'pointer' }}>
                                    <div className='position-relative d-inline-block'>
                                        <Image 
                                            src={previewUrl || "https://via.placeholder.com/150"} 
                                            rounded 
                                            width="auto" 
                                            height="175" 
                                            className="border shadow-sm mb-2"
                                            style={{ objectFit: 'cover' }}
                                        />
                                        <div className="position-absolute bottom-0 end-0 bg-primary text-white rounded-circle p-2 shadow-sm" style={{ transform: 'translate(25%, 25%)' }}>
                                            <small>✎</small>
                                        </div>
                                    </div>
                                    <p className="text-primary fw-bold small mt-2">Change Profile Photo</p>
                                </label>
                                <Form.Control 
                                    id="profile_picture_url"
                                    name='profile_picture_url'
                                    type="file" 
                                    accept="image/*" 
                                    onChange={handleFileChange} 
                                    className="d-none"
                                />
                            </div>

                            {/* BIO CARD */}
                            <Card className='mb-4 shadow-sm'>
                                <Card.Header className="bg-white fw-bold">The Basics</Card.Header>
                                <Card.Body>
                                    <Form.Group>
                                        <Form.Label>Bio Quote</Form.Label>
                                            <Form.Control 
                                                name="bio_quote"
                                                maxLength="140"
                                                value={formData.bio_quote}
                                                onChange={handleChange}
                                                placeholder="Something witty... *"
                                            />
                                            <Form.Text className='text-muted d-block text-end'> {renderCounter(formData.bio_quote, 140)}
                                            </Form.Text>
                                    </Form.Group>
                                </Card.Body>
                            </Card>

                            {/* INTERESTS CARD */}
                            <Card className='mb-4 shadow-sm'>
                                <Card.Header className="bg-white fw-bold">Interests</Card.Header>
                                <Card.Body>
                                    <Row>
                                        <Col md={6} className='mb-3'>
                                            <Form.Control 
                                                name="fun_fact" 
                                                placeholder="Fun Fact *" 
                                                maxLength="100" 
                                                value={formData.fun_fact} 
                                                onChange={handleChange} 
                                            />
                                            <Form.Text className='text-muted d-block text-end'>
                                                {renderCounter(formData.fun_fact, 100)}
                                            </Form.Text>
                                        </Col>
                                        
                                        <Col md={6} className='mb-3'>
                                            <Form.Control
                                                name="fav_band" 
                                                placeholder="Favorite Band *" 
                                                maxLength="100" 
                                                value={formData.fav_band} 
                                                onChange={handleChange} 
                                            />
                                            <Form.Text className='text-muted d-block text-end'>
                                                {renderCounter(formData.fav_band, 100)}
                                            </Form.Text>
                                        </Col> 

                                        <Col md={6} className='mb-3'>
                                            <Form.Control 
                                                name="fav_book" 
                                                placeholder="Favorite Book *" 
                                                maxLength="100" 
                                                value={formData.fav_book} 
                                                onChange={handleChange} 
                                            />
                                            <Form.Text className='text-muted d-block text-end'>
                                                {renderCounter(formData.fav_book, 100)}
                                            </Form.Text>
                                        </Col>

                                        <Col md={6} className='mb-3'>
                                            <Form.Control 
                                                name="fav_language" 
                                                placeholder="Favorite Coding Language *" 
                                                maxLength="100" 
                                                value={formData.fav_language} 
                                                onChange={handleChange} />
                                            <Form.Text className='text-muted d-block text-end'>
                                                {renderCounter(formData.fav_language, 100)}
                                            </Form.Text>
                                        </Col>

                                        <Col md={12} className='mb-3'>
                                            <Form.Control 
                                                name="hobbies" 
                                                placeholder="Hobbies *" 
                                                maxLength="100" 
                                                value={formData.hobbies} 
                                                onChange={handleChange} 
                                            />
                                            <Form.Text className='text-muted d-block text-end'>
                                                {renderCounter(formData.hobbies, 100)}
                                            </Form.Text>
                                        </Col>
                                        
                                    </Row>
                                </Card.Body>
                            </Card>

                            {/* CONTACT CARD */}
                            <Card className='mb-4 shadow-sm'>
                                <Card.Header>Contact Info</Card.Header>
                                <Card.Body>
                                    <Form.Group>
                                        <Form.Control className='mb-3'
                                            name="email" 
                                            type="email" 
                                            placeholder="Public Email *" 
                                            value={formData.email} 
                                            onChange={handleChange} 
                                        />

                                        <Form.Control className='mb-3'
                                            name="github_link" 
                                            type='url'
                                            placeholder="GitHub URL *" 
                                            value={formData.github_link} 
                                            onChange={handleChange} 
                                        />
                
                                        <Form.Control className='mb-3'
                                            name="linkedin_link" 
                                            type='url'
                                            placeholder="LinkedIn URL *" 
                                            value={formData.linkedin_link} 
                                            onChange={handleChange} 
                                        />
                                    </Form.Group>
                                </Card.Body>
                            </Card>

                            {/* PROFILE SONG CARD */}
                            <Card className='mb-4 shadow-sm'>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold">Profile Song</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="profile_song"
                                        placeholder="Artist - Song Name (e.g. My Chemical Romance - Helena)" 
                                        value={formData.profile_song}
                                        onChange={(e) => setFormData({ ...formData, profile_song: e.target.value })}
                                    />
                                    <Form.Text className="text-muted">
                                        We'll search the iTunes library for this song to play on your profile.
                                    </Form.Text>
                                </Form.Group>
                            </Card>
                            
                                {/* ACTION BUTTONS */}
                                <div className="d-flex gap-3 mt-4 justify-content-center">
                                    <Button variant="primary" type="submit" className="rounded-pill px-5 fw-bold" style={{ backgroundColor: '#00096b' }}>
                                        Save Changes
                                    </Button>
                                    <Button variant="outline-secondary" className="rounded-pill px-5 fw-bold" onClick={() => navigate(-1)}>
                                        Cancel
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ProfileForm;