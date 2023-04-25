import { db } from './index';
import { collection, addDoc } from '@firebase/firestore';

export const addUser = async (user) => {
	await addDoc(collection(db, 'users'), user);
};

export const addProject = async (project) => {
	try {
		const projectRef = await addDoc(collection(db, 'projects'), {
			first: 'Ada',
			last: 'Lovelace',
			born: 1815,
		});
		console.log('Document written with ID: ', projectRef.id);
	} catch (e) {
		console.error('Error adding document: ', e);
	}
};
