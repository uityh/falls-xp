import { collection, arrayUnion, updateDoc, getDoc } from 'firebase/firestore';
import { db } from 'utils/firebase';

export const getImageUrls = async (projectId) => {
	const project = await getDoc(doc(db, 'projects', projectId));
	return project.data().imageUrls;
};

export const addImageUrl = async (projectId, imageUrl) => {
	await updateDoc(doc(db, 'projects', projectId), {
		imageUrls: arrayUnion(imageUrl),
	});
	return getImageUrls(projectId);
};
