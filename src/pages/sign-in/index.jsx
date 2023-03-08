import React, { useState } from 'react';
import { auth } from 'utils/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function SignIn() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const signIn = (e) => {
		e.preventDefault();
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				document.write('Logged In!');
				console.log(userCredential);
			})
			.catch((error) => {
				document.write('Login Failed!');
				console.log(error);
			});
	};

	return (
		<div className="sign-in-container">
			<form onSubmit={signIn}>
				<h1>Log In to your Account</h1>
				<input
					type="email"
					placeholder="Enter your email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Enter your password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type="submit">Log In</button>
			</form>
		</div>
	);
}
