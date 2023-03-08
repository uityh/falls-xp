import { collection, addDoc } from 'firebase/firestore';
import { db } from 'utils/firebase';
import { checkString, checkDateString } from 'utils/helpers/validation';

export const createServiceRequest = async (customerId, salesRepId, address, startDate, customerNotes) => {

	customerId = checkString(customerId, 'customerId');
	salesRepId = checkString(salesRepId, 'salesRepId');
	address = checkString(address, 'address');
	startDate = checkDateString(startDate, 'startDate');
	customerNotes = checkString(customerNotes, 'customerNotes');

	startDate.setHours(0, 0, 0);

	return await addDoc(collection(db, 'projects'), { 
		customerId: customerId,
		salesRepId: salesRepId,
		startDate: startDate,
		address: address,
		onsiteWorkers: [],
		status: "not started",
		tasks: ["initial inspection"],
		cost: 0,
		customerNotes: customerNotes
	});
}