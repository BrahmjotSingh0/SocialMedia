import React, { useState } from 'react';
import './Signup.css'; // Import the CSS file

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            console.log('Passwords do not match');
            return;
        }
        // Handle sign-up logic here
        console.log('Email:', email);
        console.log('Password:', password);
    };

    const handleGoogleSignUp = () => {
        // Handle Google OAuth logic here
        console.log('Google Sign-Up');
    };

    const handleDisguisSignUp = () => {
        // Handle Disguis OAuth logic here
        console.log('Disguis Sign-Up');
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
            <button onClick={handleDisguisSignUp} className="btn">Sign Up with Disguis</button>
        </div>
    );
};

export default Signup;