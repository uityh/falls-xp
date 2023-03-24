/* eslint-disable no-console */
import {
	collection,
	getDocs,
	getDoc,
	doc,
	addDoc,
	query,
	where,
} from 'firebase/firestore';
import {
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth, db } from 'utils/firebase';

export const getAllUsers = async () => {
	const usersCollection = await getDocs(collection(db, 'users'));
	const result = [];
	usersCollection.forEach((userDoc) => {
		result.push({
			id: userDoc.id,
			...userDoc.data(),
		});
	});
	return result;
};

export const getUserById = async (id) => {
	const userDoc = await getDoc(doc(db, 'users', id));
	return {
		id,
		...userDoc.data(),
	};
};

export const getUserByEmail = async (email) => {
	const userDoc = await getDocs(
		query(collection(db, 'users'), where('email', '==', email))
	);
	const result = [];
	userDoc.forEach((uDoc) => {
		result.push({
			id: uDoc.id,
			...uDoc.data(),
		});
	});
	if (result.length === 0) throw new Error('No user with provided email found');
	return result[0];
};

const checkEmailExists = async (email) => {
	try {
		const user = await getUserByEmail(email);
		if (user) return true;
	} catch (e) {
		return false;
	}
	return false;
};

export const authenticateUser = async (email, password) => {
	try {
		const res = await signInWithEmailAndPassword(auth, email, password);
		const { user } = res;
		const userObj = await getUserByEmail(user.email);
		return userObj;
	} catch (e) {
		throw new Error('Email or password is incorrect');
	}
};

export const createUser = async (user) => {
	if (await checkEmailExists(user.email))
		throw new Error('An account with this email already exists');
	const userDoc = await addDoc(collection(db, 'users'), user);
	await createUserWithEmailAndPassword(auth, user.email, userDoc.id);
	await sendPasswordResetEmail(auth, user.email);
	return getUserById(userDoc.id);
};

// export const createUserPassword = async (user) => {
// 	if (checkEmailExists(user.email))
// 		throw new Error('An account with this email already exists');
// 	const { password } = user;
// 	const uploadData = user;
// 	delete uploadData.password;
// 	const userDoc = await addDoc(collection(db, 'users'), uploadData);
// 	await createUserWithEmailAndPassword(auth, user.email, password);
// 	await authenticateUser(user.email, password);
// 	return getUserById(userDoc.id);
// };
