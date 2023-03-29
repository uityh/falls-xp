/* eslint-disable object-shorthand */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-await */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
import { collection, addDoc } from 'firebase/firestore';
import { db } from 'utils/firebase';
import { checkString, checkDateString } from 'utils/helpers/validation';
import { getUserById } from './users';

export const createServiceRequest = async (
	customerId,
	salesRepId,
	address,
	startDate,
	customerNotes
) => {
	customerId = checkString(customerId, 'customerId');
	const thisCustomer = await getUserById(customerId);
	if (thisCustomer.role !== 'customer') {
		console.log('Error from backend');
		throw new Error('That is not a real customer!');
	}
	salesRepId = checkString(salesRepId, 'salesRepId');
	address = checkString(address, 'address');
	startDate = checkDateString(startDate, 'startDate');
	if (customerNotes !== '') {
		customerNotes = checkString(customerNotes, 'customerNotes');
	}

	startDate.setHours(0, 0, 0);

	return await addDoc(collection(db, 'projects'), {
		customerId: customerId,
		salesRepId: salesRepId,
		startDate: startDate,
		address: address,
		assignedWorkers: [],
		status: 'not started',
		tasks: ['initial inspection'],
		cost: 0,
		customerNotes: customerNotes,
		imageUrls: [],
	});
};
