import { collection, addDoc } from 'firebase/firestore';
import { db } from 'utils/firebase';

export const createServiceRequest = async (customerId, salesRepId, address, startDate) => {
	return await addDoc(collection(db, 'projects'), { 
		customerId: customerId,
		salesRepId: salesRepId,
		startDate: startDate,
		address: address,
		onsiteWorkers: [],
		status: "not started",
		tasks: ["initial inspection"],
		cost: 1
	});
}