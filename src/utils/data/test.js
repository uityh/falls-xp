import { collection, getDocs } from 'firebase/firestore';
import { db } from 'utils/firebase';

export const getTestData = async () => {
	const snapshot = await getDocs(collection(db, 'test'));
	const result = [];
	snapshot.forEach((doc) => {
		result.push({
			id: doc.id,
			...doc.data(),
		});
	});
	return result;
};

export const getTestDataById = async (id) => {
	const doc = await getDocs(collection(db, 'test', id));
	return doc.data();
};
