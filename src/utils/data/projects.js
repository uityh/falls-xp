/* eslint-disable no-console */
import {
	collection,
	getDocs,
	getDoc,
	updateDoc,
	arrayUnion,
	doc,
	query,
	where,
	addDoc,
} from 'firebase/firestore';
import { db } from 'utils/firebase';
import { getUserById } from 'utils/data/users';

export const getAllProjects = async (testdb) => {
	if (testdb) {
		const projectsCollection = await testdb().collection('projects').get();
		const result = [];
		projectsCollection.forEach((projectDoc) => {
			result.push({
				id: projectDoc.id,
				...projectDoc.data(),
			});
		});
		return result;
	}
	const projectsCollection = await getDocs(collection(db, 'projects'));
	const result = [];
	projectsCollection.forEach((projectDoc) => {
		result.push({
			id: projectDoc.id,
			...projectDoc.data(),
		});
	});
	return result;
};

export const getProjectByProjectId = async (id, testdb) => {
	if (testdb) {
		const projectDoc = await testdb().collection('projects').doc(id).get();
		if (!projectDoc) throw new Error('No project exists for the given Id');
		return {
			id,
			...projectDoc.data(),
		};
	}
	const projectDoc = await getDoc(doc(db, 'projects', id));
	if (!projectDoc) throw new Error('No project exists for the given Id');
	return {
		id,
		...projectDoc.data(),
	};
};

export const getProjectByInvolvedId = async (id, testdb) => {
	if (testdb) {
		const thisUser = await getUserById(id, testdb);
		const result = [];
		let foundProjects = null;
		if (thisUser.role === 'admin') {
			return getAllProjects(testdb);
		}
		if (thisUser.role === 'customer') {
			foundProjects = query(
				collection(testdb, 'projects'),
				where('customerId', '==', id)
			);
		} else if (thisUser.role === 'sales') {
			foundProjects = query(
				collection(testdb, 'projects'),
				where('salesRepId', '==', id)
			);
		} else {
			foundProjects = testdb()
				.collection('projects')
				.where('assignedWorkers', 'array-contains', id);
		}
		console.log(foundProjects);
		const projectsDoc = await foundProjects.get();
		if (!projectsDoc) throw new Error('No projects found for the current user');
		projectsDoc.forEach((projectDoc) => {
			result.push({
				id: projectDoc.id,
				...projectDoc.data(),
			});
		});
		return result;
	}
	const thisUser = await getUserById(id);
	const result = [];
	let foundProjects = null;
	if (thisUser.role === 'admin') {
		return getAllProjects();
	}
	if (thisUser.role === 'customer') {
		foundProjects = query(
			collection(db, 'projects'),
			where('customerId', '==', id)
		);
	} else if (thisUser.role === 'sales') {
		foundProjects = query(
			collection(db, 'projects'),
			where('salesRepId', '==', id)
		);
	} else {
		foundProjects = query(
			collection(db, 'projects'),
			where('assignedWorkers', 'array-contains', id)
		);
	}
	const projectsDoc = await getDocs(foundProjects);
	if (!projectsDoc) throw new Error('No projects found for the current user');
	projectsDoc.forEach((projectDoc) => {
		result.push({
			id: projectDoc.id,
			...projectDoc.data(),
		});
	});
	return result;
};

export const getImageUrls = async (projectId, testdb) => {
	if (testdb) {
		const project = await testdb().collection('projects').doc(projectId).get();
		return project.data().imageUrls;
	}
	const project = await getDoc(doc(db, 'projects', projectId));
	return project.data().imageUrls;
};

export const addImageUrl = async (projectId, imageUrl) => {
	await updateDoc(doc(db, 'projects', projectId), {
		imageUrls: arrayUnion(imageUrl),
	});
	return getImageUrls(projectId);
};

export const getProjectsByCustomerId = async (customerId, testdb) => {
	if (testdb) {
		const userDoc = await testdb()
			.collection('users')
			.where('customerId', '==', customerId);
		const result = [];
		userDoc.forEach((uDoc) => {
			result.push({
				id: uDoc.id,
				...uDoc.data(),
			});
		});
		return result;
	}

	const userDoc = await getDocs(
		query(collection(db, 'projects'), where('customerId', '==', customerId))
	);
	const result = [];
	userDoc.forEach((uDoc) => {
		result.push({
			id: uDoc.id,
			...uDoc.data(),
		});
	});
	return result;
};

export const createNewProject = async (customerId, address = '') => {
	if (!customerId) {
		throw new Error('A customer ID is required to create a new project');
	}

	const thisCustomer = await getUserById(customerId);
	if (thisCustomer.role !== 'customer') {
		console.log('Error from backend');
		throw new Error('That is not a real customer!');
	}

	return addDoc(collection(db, 'projects'), {
		customerId,
		address,
		salesRepId: '',
		startDate: '',
		assignedWorkers: [],
		status: 'lead onboarded',
		tasks: [],
		cost: 0,
		customerNotes: '',
		imageUrls: [],
	});
};

// Create service request is the functionality to be used for creating a project
