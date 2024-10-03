// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3001/login', { email, password });
            console.log('Login successful:', res.data);
            // Save token or user data as needed
        } catch (err) {
            console.error('Login failed:', err);
        }
    };

    const handleGoogleSignIn = () => {
        // Handle Google OAuth logic here
        console.log('Google Sign-In');
    };


    const handleResetPassword = () => {
        // Handle reset password logic here
        console.log('Reset Password');
    };

    return (
        <div className="signin-container">
            <h2>Sign In</h2>
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
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <p>
                    Create a new account? <a href="/signup">Sign Up</a>
                </p>
                <button type="submit" className="btn">Sign In</button>
            </form>
            <button onClick={handleResetPassword} className="btn">Reset Password</button>
            <button onClick={handleGoogleSignIn} className="btn">Sign In with Google</button>
        </div>
    );
};

export default Login;