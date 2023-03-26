import { FakeFirestore } from 'firestore-jest-mock';
import { mockCollection, mockDoc } from 'firestore-jest-mock/mocks/firestore';
import { addImageUrl, getImageUrls } from '../data/projects';

describe('Queries', () => {
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
						address: '123 Main St',
						assignedWorkers: ['bob', 'joe', 'jane'],
						customerId: 'customer1',
						cost: 1000,
						customerNotes: 'notes',
						salesRepId: 'sales1',
						status: 'in progress',
						startDate: '2021-01-01',
						imageUrls: ['url1', 'url2'],
					},
				],
			},
			{ simulateQueryFilters }
		);

	describe('Get image urls', () => {
		test('get image urls returns the correct image urls', async () => {
			const imageUrls = ['url1', 'url2'];
			const projectId = 'project1';

			const retrievedImageUrls = await getImageUrls(projectId, db);
			expect(imageUrls).toEqual(retrievedImageUrls);
		});
	});
});
