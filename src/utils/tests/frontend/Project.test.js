import React from 'react';
import {
	getProjectByProjectId,
	checkProjectInvolvement,
} from 'utils/data/projects';
import moment from 'moment';
import Project from 'pages/Project';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, cleanup } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';

afterEach(cleanup);

jest.mock('utils/data/projects');
jest.mock('contexts/Auth', () => ({
	...jest.requireActual('contexts/Auth'),
	useAuthContext: () => ({
		user: mockAdmin,
		basename: 'randomBasename',
	}),
}));
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useParams: () => ({
		projectid: mockAdminProjects.id,
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
const mockAdminProjects = {
	id: 'F9ieqoKKXEmLOik946Nb',
	address: '308 Negra Arroyo Lane',
	assignedWorkers: ['random guy'],
	cost: 0,
	customerId: 'eAE62yKcuRK4OCQYvmHc',
	salesRepId: 'smwmzTSYJzeGMbUC5HZm',
	status: 'not started',
	startDate: 'March 25, 2023 at 12:00:00 AM UTC-4',
	customerNotes: 'testing for images',
	tasks: [
		{
			name: 'initial inspection',
			startDate: moment(),
			status: 'not started',
			team: 'onsite',
		},
	],
	imageUrls: ['randomUrl1', 'randomUrl2'],
};

describe('Project Test', () => {
	beforeEach(() => {
		getProjectByProjectId.mockResolvedValue(mockAdminProjects);
		checkProjectInvolvement.mockResolvedValue(true);
	});
	afterEach(() => {
		jest.resetAllMocks();
	});
	it('Renders project page properly', async () => {
		await act(async () => {
			const { container } = render(
				<MemoryRouter>
					<Project />
				</MemoryRouter>
			);
		});
		expect(screen.getAllByTestId('id-item')).toBeInTheDocument;
		expect(screen.getAllByTestId('progress-item')).toBeInTheDocument;
		expect(screen.getAllByTestId('task-item')).toBeInTheDocument;
		expect(screen.getAllByTestId('status-item')).toBeInTheDocument;
		expect(screen.getAllByTestId('address-item')).toBeInTheDocument;
		expect(screen.getAllByTestId('cost-item')).toBeInTheDocument;
		expect(screen.getAllByTestId('notes-item')).toBeInTheDocument;
		expect(screen.getAllByTestId('workers-item')).toBeInTheDocument;
		expect(screen.getAllByTestId('photo-item')).toBeInTheDocument;
	});
});
