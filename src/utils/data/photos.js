import {
	ref,
	uploadBytes,
	deleteObject,
	getDownloadURL,
} from 'firebase/storage';
import { storage } from 'utils/firebase';

export const uploadFile = async (file, filePath) => {
	const storageRef = ref(storage, filePath);
	try {
		const snapshot = await uploadBytes(storageRef, file);
		return getDownloadURL(snapshot.ref);
	} catch (e) {
		console.error(e);
	}
	return undefined;
};

export const deleteFile = (filePath) => {
	const storageRef = ref(storage, filePath);
	deleteObject(storageRef)
		.then(() => {
			console.log('File deleted successfully');
		})
		.catch((error) => {
			console.log(error);
		});
};
