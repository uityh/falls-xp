import {
	getAllProjects,
	getProjectByProjectId,
	getProjectByInvolvedId,
} from 'utils/data/projects';
import ProjectViews from 'pages/ProjectViews';
import { render, screen, cleanup } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

afterEach(cleanup);

jest.mock('utils/data/projects');
jest.mock('contexts/Auth', () => ({
	...jest.requireActual('contexts/Auth'),
	useAuthContext: () => ({
		user: mockAdmin,
	}),
}));

const mockAdmin = {
	email: 'rancom@test./com',
	firstName: 'test',
	id: '1',
	lastName: 'test',
	phone: '0',
	role: 'admin',
};
const mockSales = {
	email: 'rancom@test./com',
	firstName: 'test',
	id: '1',
	lastName: 'test',
	phone: '0',
	role: 'sales',
};

const mockAdminProjects = [
	{
		id: 'F9ieqoKKXEmLOik946Nb',
		address: '308 Negra Arroyo Lane',
		assignedWorkers: ['random guy'],
		cost: 0,
		customerId: 'eAE62yKcuRK4OCQYvmHc',
		salesRepId: 'smwmzTSYJzeGMbUC5HZm',
		status: 'not started',
		startDate: 'March 25, 2023 at 12:00:00 AM UTC-4',
		customerNotes: 'testing for images',
		tasks: ['initial inspection'],
		imageUrls: [],
	},
	{
		id: 'temp',
		address: '308 Negra Arroyo Lane',
		assignedWorkers: ['assignee1'],
		cost: 0,
		customerId: 'eAE62yKcuRK4OCQYvmHc',
		salesRepId: 'smwmzTSYJzeGMbUC5HZm',
		status: 'not started',
		startDate: 'March 25, 2023 at 12:00:00 AM UTC-4',
		customerNotes: 'testing for images',
		tasks: ['initial inspection'],
		imageUrls: [],
	},
];
const mockSalesProjects = [
	{
		id: 'F9ieqoKKXEmLOik946Nb',
		address: '308 Negra Arroyo Lane',
		assignedWorkers: ['random guy'],
		cost: 0,
		customerId: 'eAE62yKcuRK4OCQYvmHc',
		salesRepId: 'smwmzTSYJzeGMbUC5HZm',
		status: 'not started',
		startDate: 'March 25, 2023 at 12:00:00 AM UTC-4',
		customerNotes: 'testing for images',
		tasks: ['initial inspection'],
		imageUrls: [],
	},
];

describe('Admin test', () => {
	beforeEach(() => {
		getProjectByInvolvedId.mockResolvedValue(mockAdminProjects);
	});
	afterEach(() => {
		jest.resetAllMocks();
	});
	it('Renders correct version', async () => {
		await act(async () => {
			const { container } = render(<ProjectViews />);
		});
		expect(screen.getAllByTestId('id-cell')).toBeInTheDocument;
		expect(screen.getAllByTestId('tasks-cell')).toBeInTheDocument;
		expect(screen.getAllByTestId('status-cell')).toBeInTheDocument;
		expect(screen.getAllByTestId('address-cell')).toBeInTheDocument;
		expect(screen.getAllByTestId('cost-cell')).toBeInTheDocument;
		expect(screen.getAllByTestId('notes-cell')).toBeInTheDocument;
		expect(screen.getAllByTestId('assigned-workers-cell')).toBeInTheDocument;
	});
});

//! Cannot currently mock UseAuthContext more than once, need to figure out why
// describe('Sales test', () => {
// 	beforeEach(() => {
// 		getProjectByInvolvedId.mockResolvedValue(mockSalesProjects);
// 	});
// 	afterEach(() => {
// 		jest.resetAllMocks();
// 	});
// 	it('Renders correct version', async () => {
// 		await act(async () => {
// 			const { container } = render(<ProjectViews />);
// 		});
// 		expect(screen.getAllByTestId('id-cell')).toBeInTheDocument;
// 		expect(screen.getAllByTestId('status-cell')).toBeInTheDocument;
// 		expect(screen.getAllByTestId('address-cell')).toBeInTheDocument;
// 		expect(screen.getAllByTestId('cost-cell')).toBeInTheDocument;
// 		expect(screen.getAllByTestId('notes-cell')).toBeInTheDocument;
// 		expect(screen.getAllByTestId('assigned-workers-cell')).toBeInTheDocument;
// 	});
// });
