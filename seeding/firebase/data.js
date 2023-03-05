import { db } from './index.js';
import { collection, addDoc } from '@firebase/firestore';

export const addCustomer = async (customer) => {
	await addDoc(collection(db, 'customers'), customer);
};

export const addSalesRep = async (salesRep) => {
	await addDoc(collection(db, 'salesReps'), salesRep);
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

export const addOnsiteWorker = (onsiteWorker) => {
	db.collection('onsiteWorkers').add(onsiteWorker);
};
