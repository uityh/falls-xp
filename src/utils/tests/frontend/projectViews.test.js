import {
	getAllProjects,
	getProjectByProjectId,
	getProjectByInvolvedId,
} from 'utils/data/projects';
import { FakeFirestore } from 'firestore-jest-mock';
describe('Tests', () => {
	beforeEach(() => {
		jest.resetModules();
		jest.clearAllMocks();
	});
	const db = (simulateQueryFilters = false) =>
		new FakeFirestore(
			{
				projects: [
					{
						id: 'project1',
						customerId: 'customer1',
						customerNotes: '',
						address: 'anywhere usa',
						assignedWorkers: ['field1', 'ops1', 'field2'],
						cost: 0,
						salesRepId: 'sales1',
						status: 'not started',
						startDate: '03-26-2023',
						imageUrls: [],
					},
					{
						id: 'project2',
						address: '123 main st usa',
						assignedWorkers: ['field2', 'ops1', 'ops2'],
						customerId: 'customer2',
						cost: 0,
						customerNotes: '',
						salesRepId: 'sales1',
						status: 'in progress',
						startDate: '03-26-2023',
						imageUrls: [],
					},
				],
				users: [
					{
						id: 'sales1',
						email: 'sales@fallsxp.com',
						firstName: 'Test',
						lastName: 'Sales',
						phone: '1',
						role: 'sales',
					},
					{
						id: 'field1',
						email: 'field1@fallsxp.com',
						firstName: 'Field',
						lastName: 'One',
						phone: '1',
						role: 'field',
					},
					{
						id: 'field2',
						email: 'field2@fallsxp.com',
						firstName: 'Field',
						lastName: 'Two',
						phone: '1',
						role: 'field',
					},
					{
						id: 'ops1',
						email: 'ops1@fallsxp.com',
						firstName: 'Ops',
						lastName: 'One',
						phone: '1',
						role: 'operations',
					},
					{
						id: 'ops2',
						email: 'ops2@fallsxp.com',
						firstName: 'Ops',
						lastName: 'Two',
						phone: '1',
						role: 'operations',
					},
					{
						id: 'customer1',
						email: 'customer1@fallsxp.com',
						firstName: 'Customer',
						lastName: 'One',
						phone: '1',
						role: 'customer',
					},
					{
						id: 'customer2',
						email: 'customer2@fallsxp.com',
						firstName: 'Customer',
						lastName: 'Two',
						phone: '1',
						role: 'customer',
					},
				],
			},
			{ simulateQueryFilters }
		);
	describe('Get user projects', () => {
		test('Get field1 projects', async () => {
			const projects = [
				{
					id: 'project1',
					customerId: 'customer1',
					customerNotes: '',
					address: 'anywhere usa',
					assignedWorkers: ['field1', 'ops1', 'field2'],
					cost: 0,
					salesRepId: 'sales1',
					status: 'not started',
					startDate: '03-26-2023',
					imageUrls: [],
				},
			];
			const retrievedProjects = await getProjectByInvolvedId('field1', db);
			expect(projects).toEqual(retrievedProjects);
		});
	});
});
