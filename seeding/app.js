import {
	addCustomer,
	addSalesRep,
	addProject,
	addOnsiteWorker,
} from './firebase/data.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const mockCustData = require('./data/Customer.json');
const mockSalesRepData = require('./data/SalesRep.json');

for (let i = 0; i < mockCustData.length; i++) {
	addCustomer(mockCustData[i]);
}

for (let i = 0; i < mockSalesRepData.length; i++) {
	addSalesRep(mockSalesRepData[i]);
}
