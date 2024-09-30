import React, { useState } from 'react';
import './SignIn.css'; // Import the CSS file

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle sign-in logic here
        console.log('Email:', email);
        console.log('Password:', password);
    };

    const handleGoogleSignIn = () => {
        // Handle Google OAuth logic here
        console.log('Google Sign-In');
    };

    const handleDisguisSignIn = () => {
        // Handle Disguis OAuth logic here
        console.log('Disguis Sign-In');
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
            <button onClick={handleDisguisSignIn} className="btn">Sign In with Disguis</button>
        </div>
    );
};

export default SignIn;