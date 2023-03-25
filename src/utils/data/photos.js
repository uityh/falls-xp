import {
	ref,
	uploadBytes,
	deleteObject,
	getDownloadURL,
} from 'firebase/storage';
import { storage } from 'utils/firebase';

export const uploadFile = (file, filePath) => {
	const storageRef = ref(storage, filePath);
	uploadBytes(storageRef, file)
		.then((snapshot) => {
			console.log('Uploaded a blob or file!');
			return getDownloadURL(snapshot.ref);
		})
		.catch((error) => {
			console.log(error);
		});
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
