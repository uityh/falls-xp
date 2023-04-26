import { createRequire } from 'module';
import { addUser } from './firebase/data';

const require = createRequire(import.meta.url);
const mockUserData = require('./data/User.json');

for (let i = 0; i < mockUserData.length; i++) {
	addUser(mockUserData[i]);
}
