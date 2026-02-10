import { useState, useEffect } from 'react';
import * as profileService from '../../services/profileService';

const ProfileForm = ({ existingData, onSuccess }) => {
    const [formData, setFormData] = useState({
        bio_quote: '',
        fun_fact: '',
        fav_band: '',
        fav_book: '',
        hobbies: '',
        fav_language: '',
        email: '',
        github_link: '',
        linkedin_link: ''
    });

    // prefill form with data if user has profile
    useEffect(() => {
        if (existingData) {
            setFormData(existingData);
        }
    }, [existingData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
            const updatedProfile = await profileService.updateDevSpace(formData);
            if (onSuccess) onSuccess(updatedProfile);
            alert('DevSpace updated successfully!');
        } catch (err) {
            console.error('Failed to update profile', err);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="profile-form">
            <h2>Customize your DevSpace</h2>
            
            <section>
                <h3>The Basics</h3>
                <label>Bio Quote (140 chars)</label>
                <textarea 
                    name="bio_quote"
                    maxLength="140"
                    value={formData.bio_quote}
                    onChange={handleChange}
                    placeholder="Something witty..."
                />
                <small>{renderCounter(formData.bio_quote, 140)}</small>
            </section>

            <section>
                <h3>Interests (100 chars max each)</h3>
                <input name="fun_fact" placeholder="Fun Fact" maxLength="100" value={formData.fun_fact} onChange={handleChange} />
                <input name="fav_band" placeholder="Favorite Band" maxLength="100" value={formData.fav_band} onChange={handleChange} />
                <input name="fav_book" placeholder="Favorite Book" maxLength="100" value={formData.fav_book} onChange={handleChange} />
                <input name="hobbies" placeholder="Hobbies" maxLength="100" value={formData.hobbies} onChange={handleChange} />
                <input name="fav_language" placeholder="Favorite Coding Language" maxLength="100" value={formData.fav_language} onChange={handleChange} />
                {renderCounter(formData.fun_fact, 100)}
            </section>

            <section>
                <h3>Contact Info (Optional)</h3>
                <input name="email" type="email" placeholder="Public Email" value={formData.email} onChange={handleChange} />
                <input name="github_link" placeholder="GitHub URL" value={formData.github_link} onChange={handleChange} />
                <input name="linkedin_link" placeholder="LinkedIn URL" value={formData.linkedin_link} onChange={handleChange} />
            </section>

            <button type="submit">Save DevSpace</button>
        </form>
    );
};

export default ProfileForm;