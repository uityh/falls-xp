import { collection, getDocs, getDoc, doc } from 'firebase/firestore';
import { db } from 'utils/firebase';

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
	return userDoc.data();
};
