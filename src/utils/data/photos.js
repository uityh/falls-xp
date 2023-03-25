import {
	getStorage,
	ref,
	uploadBytes,
	deleteObject,
	getDownloadURL,
} from 'firebase/storage';

export const uploadFile = (file, filePath) => {
	const storage = getStorage();
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
	const storage = getStorage();
	const storageRef = ref(storage, filePath);
	deleteObject(storageRef)
		.then(() => {
			console.log('File deleted successfully');
		})
		.catch((error) => {
			console.log(error);
		});
};
