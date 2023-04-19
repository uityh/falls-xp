/* eslint-disable no-console */
/* eslint-disable */
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
import { checkString, checkDateString } from 'utils/helpers/validation';

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

export const getProjectByProjectId = async (id) => {
	const projectDoc = await getDoc(doc(db, 'projects', id));
	if (!projectDoc) throw new Error('No project exists for the given Id');
	return {
		id,
		...projectDoc.data(),
	};
};

export const checkProjectInvolvement = async (projectId, userId) => {
	const projectData = await getProjectByProjectId(projectId);
	const thisUser = await getUserById(userId);
	if (thisUser.role === 'admin' || thisUser.role === 'sales') {
		return true;
	}
	if (thisUser.role === 'customer') {
		if (projectData.customerId === userId) {
			return true;
		}
		return false;
	}
	if (projectData.assignedWorkers.includes(userId)) {
		return true;
	}
	return false;
};

export const getProjectByInvolvedId = async (id) => {
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

export const markTaskAsComplete = async (projectId, taskName, taskNotes) => {
	const foundProject = await getProjectByProjectId(projectId);
	const idx = foundProject.tasks.findIndex((task) => task.name === taskName);
	foundProject.tasks[idx].status = 'complete';
	foundProject.tasks[idx].endDate = today;
	foundProject.tasks[idx].taskNotes = taskNotes;

	await updateDoc(doc(db, 'projects', projectId), {
		tasks: foundProject.tasks,
	});

	return foundProject.tasks;
};

export const addTaskToProject = async (
	projectId,
	taskName,
	taskNotes = '',
	completePreviousTask = false
) => {
	const taskTeamRelations = {
		'initial inspection': 'onsite',
		'site review': 'operations',
		'customer confirmation': 'sales',
		installation: 'onsite',
	};
	taskName = checkString(taskName);
	if (!Object.keys(taskTeamRelations).includes(taskName))
		throw new Error('Invalid task name');
	if (taskNotes !== '') taskNotes = checkString(taskNotes);
	if (typeof completePreviousTask !== 'boolean')
		throw new Error('Invalid completePreviousTask value (must be boolean)');

	const foundProject = await getProjectByProjectId(projectId);
	if (!foundProject) throw new Error('No project found for the given id');
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const task = {
		name: taskName,
		status: 'in progress',
		startDate: today,
		endDate: endDate,
		team: taskTeamRelations[taskName],
		taskNotes: taskNotes,
	};
	foundProject.tasks.push(task);

	if (foundProject.tasks.length > 1 && completePreviousTask) {
		const idx = foundProject.tasks.findIndex((task) => task.name === taskName);
		foundProject.tasks[idx - 1].status = 'complete';
		foundProject.tasks[idx - 1].endDate = today;
	}

	await updateDoc(doc(db, 'projects', projectId), {
		tasks: foundProject.tasks,
	});

	return foundProject.tasks;
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

export const getProjectsByStatus = async (status) => {
	const projectsDoc = await getDocs(
		query(collection(db, 'projects'), where('status', '==', status))
	);
	let result = [];
	projectsDoc.forEach((pDoc) => {
		result.push({
			id: pDoc.id,
			...pDoc.data(),
		});
	});
	result = await Promise.all(
		result.map(async (p) => {
			const customer = await getUserById(p.customerId);
			return {
				...p,
				customer,
			};
		})
	);
	return result;
};

export const getProjectsForSales = async () => {
	const projectsDoc = await getDocs(
		query(collection(db, 'projects'), where('status', '!=', 'lead onboarded'))
	);
	let result = [];
	projectsDoc.forEach((pDoc) => {
		result.push({
			id: pDoc.id,
			...pDoc.data(),
		});
	});
	result = await Promise.all(
		result.map(async (p) => {
			const customer = await getUserById(p.customerId);
			return {
				...p,
				customer,
			};
		})
	);
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

export const getProjectLeads = async () => {
	const projectDoc = await getDocs(
		query(collection(db, 'projects'), where('status', '==', 'lead onboarded'))
	);
	let result = [];
	projectDoc.forEach((pDoc) => {
		result.push({
			id: pDoc.id,
			...pDoc.data(),
		});
	});
	result = await Promise.all(
		result.map(async (p) => {
			const customer = await getUserById(p.customerId);
			return {
				...p,
				customer,
			};
		})
	);
	return result;
};

export const createServiceRequest = async (
	projectIdParam,
	salesRepIdParam,
	startDateParam,
	customerNotesParam
) => {
	const projectId = checkString(projectIdParam, 'projectId');
	await getProjectByProjectId(projectId);

	const salesRepId = checkString(salesRepIdParam, 'salesRepId');
	const startDate = checkDateString(startDateParam, 'startDate');
	let customerNotes = '';
	if (customerNotesParam !== '') {
		customerNotes = checkString(customerNotesParam, 'customerNotes');
	}

	const task = {
		taskName: 'initial inspection',
		startDate,
		status: 'in progress',
		team: 'onsite',
		taskNotes: '',
	};

	await updateDoc(doc(db, 'projects', projectId), {
		status: 'initial inspection',
		salesRepId,
		customerNotes,
		startDate,
		tasks: [task],
	});

	return getProjectByProjectId(projectId);
};

// Create service request is the functionality to be used for creating a project
