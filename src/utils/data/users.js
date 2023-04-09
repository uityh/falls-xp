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

export const getAllUsers = async (testdb) => {
	if (testdb) {
		const usersCollection = await getDocs(collection(testdb, 'users'));
		const result = [];
		usersCollection.forEach((userDoc) => {
			result.push({
				id: userDoc.id,
				...userDoc.data(),
			});
		});
		return result;
	}
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

export const getUserById = async (id, testdb) => {
	if (testdb) {
		const userDoc = await testdb().collection('users').doc(id).get();
		if (!userDoc) throw new Error('No user found with the given Id');
		return {
			id,
			...userDoc.data(),
		};
	}
	const userDoc = await getDoc(doc(db, 'users', id));
	if (!userDoc) throw new Error('No user found with the given Id');
	return {
		id,
		...userDoc.data(),
	};
};

export const getUserByEmail = async (email, testdb) => {
	if (testdb) {
		const userDoc = await testdb()
			.collection('users')
			.where('email', '==', email);
		const result = [];
		userDoc.forEach((uDoc) => {
			result.push({
				id: uDoc.id,
				...uDoc.data(),
			});
		});
		if (result.length === 0)
			throw new Error('No user with provided email found');
		return result[0];
	}
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

const checkEmailExists = async (email, testdb) => {
	if (testdb) {
		try {
			const user = await getUserByEmail(email, testdb);
			if (user) return true;
		} catch (e) {
			return false;
		}
		return false;
	}
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
	let authKey;
	let authValue;
	try {
		const request = window.indexedDB.open('firebaseLocalStorageDb');
		request.onsuccess = () => {
			const indexedDB = request.result;
			const transaction = indexedDB.transaction(
				'firebaseLocalStorage',
				'readwrite'
			);
			const store = transaction.objectStore('firebaseLocalStorage');
			const keys = store.getAllKeys();
			keys.onsuccess = () => {
				authKey = keys.result.find((key) =>
					key.startsWith('firebase:authUser')
				);
				const authValueObj = store.get(authKey);
				authValueObj.onsuccess = () => {
					authValue = authValueObj.result.value;
				};
			};
		};
	} catch (e) {
		console.error(e);
	}
	if (await checkEmailExists(user.email))
		throw new Error('An account with this email already exists');
	const userDoc = await addDoc(collection(db, 'users'), user);
	await createUserWithEmailAndPassword(auth, user.email, userDoc.id);
	await sendPasswordResetEmail(auth, user.email);
	try {
		const request = window.indexedDB.open('firebaseLocalStorageDb');
		request.onsuccess = async () => {
			const indexedDB = request.result;
			const transaction = indexedDB.transaction(
				'firebaseLocalStorage',
				'readwrite'
			);
			const store = transaction.objectStore('firebaseLocalStorage');
			const clearRes = store.clear();
			clearRes.onsuccess = () => {
				store.put({
					fbase_key: authKey,
					value: authValue,
				});
			};
		};
	} catch (e) {
		console.error(e);
	}
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
