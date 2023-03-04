import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'utils/firebase';

export default function signUp() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const signUp = (e) => {
		e.preventDefault();
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				document.write('Account created!');
				console.log(userCredential);
			})
			.catch((error) => {
				document.write('Failed to create account');
				console.log(error);
			});
	};

	return (
		<div className="sign-in-container">
			<form onSubmit={signUp}>
				<h1>Create Account</h1>
				<input
					type="email"
					placeholder="Enter your email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				></input>
				<input
					type="password"
					placeholder="Enter your password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				></input>
				<button type="submit">Sign Up</button>
			</form>
		</div>
	);
}
