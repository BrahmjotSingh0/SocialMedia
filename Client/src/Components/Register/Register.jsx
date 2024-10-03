// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'; 

const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        try {
            const res = await axios.post('http://localhost:3001/register', { email, username, password });
            alert(res.data.message);
        } catch (err) {
            if (err.response && err.response.data) {
                alert(err.response.data.message);
            } else {
                alert('Registration failed');
            }
        }
    };

    const handleGoogleSignUp = () => {
        // Handle Google OAuth logic here
        console.log('Google Sign-Up');
    };


    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    
                </div>
                <p>
                    Already have an account? <a href="/signin">Sign in</a>
                </p>
                <button type="submit" className="btn">Sign Up</button>
            </form>
            <button onClick={handleGoogleSignUp} className="btn">Sign Up with Google</button>
        </div>
    );
};

export default Register;