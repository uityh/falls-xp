import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import { Route, MemoryRouter } from 'react-router-dom';

import PhotoReview from 'pages/PhotoReview';
import { getProjectByProjectId } from 'utils/data/projects';

afterEach(cleanup);

describe('PhotoReview', () => {
	it('renders loading div', () => {
		const tree = renderer.create(<PhotoReview />).toJSON();
		expect(tree).toMatchSnapshot();
	});
});



const mockProject = {
	id: 'F9ieqoKKXEmLOik946Nb',
	address: '308 Negra Arroyo Lane',
	assignedWorkers: [],
	cost: 0,
	customerId: 'eAE62yKcuRK4OCQYvmHc',
	salesRepId: 'smwmzTSYJzeGMbUC5HZm',
	status: 'not started',
	startDate: 'March 25, 2023 at 12:00:00 AM UTC-4',
	customerNotes: 'testing for images',
	tasks: 'initial inspection',
	imageUrls: [
		'https://firebasestorage.googleapis.com/v0/b/cs555-falls-xp.appspot.com/o/test_images%2Fkrabs.jpg?alt=media&token=56f1311f-4853-4e5e-9029-2fb4b1ab6a89',
		'https://firebasestorage.googleapis.com/v0/b/cs555-falls-xp.appspot.com/o/test_images%2Fsponge.png?alt=media&token=33eb6ca0-ea41-4242-98a7-98ce1d7cc837',
		'https://firebasestorage.googleapis.com/v0/b/cs555-falls-xp.appspot.com/o/test_images%2Fkrabs.jpg?alt=media&token=56f1311f-4853-4e5e-9029-2fb4b1ab6a89',
		'https://firebasestorage.googleapis.com/v0/b/cs555-falls-xp.appspot.com/o/test_images%2Fsponge.png?alt=media&token=33eb6ca0-ea41-4242-98a7-98ce1d7cc837',
		'https://firebasestorage.googleapis.com/v0/b/cs555-falls-xp.appspot.com/o/test_images%2Fkrabs.jpg?alt=media&token=56f1311f-4853-4e5e-9029-2fb4b1ab6a89',
		'https://firebasestorage.googleapis.com/v0/b/cs555-falls-xp.appspot.com/o/test_images%2Fsponge.png?alt=media&token=33eb6ca0-ea41-4242-98a7-98ce1d7cc837',
	],
};

jest.mock('utils/data/projects');

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useParams: () => ({
		projectid: mockProject.id,
	})
}));

describe('PhotoReview component', () => {
	beforeEach(() => {
		getProjectByProjectId.mockResolvedValue(mockProject);
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it('Renders the correct project data', async () => {
		const { container } = render(<PhotoReview/>);
		await act(async () => {
			expect(getProjectByProjectId).toHaveBeenCalledTimes(1);
		});
		expect(screen.getByTestId('photo-review-box')).toBeInTheDocument();
		expect(screen.getByText("Inspection Photo Review")).toBeInTheDocument();
		expect(screen.getByText(`Project ID: ${mockProject.id}`)).toBeInTheDocument();
		expect(screen.getByText(`Address: ${mockProject.address}`)).toBeInTheDocument();
		expect(screen.getByText(`Photo 1 of ${mockProject.imageUrls.length}`)).toBeInTheDocument();
		expect(screen.getByTestId('photo-review-thumbnail-0')).toBeInTheDocument();
		expect(screen.getByTestId('photo-review-thumbnail-1')).toBeInTheDocument();
		expect(screen.getByTestId('photo-review-thumbnail-2')).toBeInTheDocument();
		expect(screen.getByTestId('photo-review-thumbnail-3')).toBeInTheDocument();
	});

	it('Renders the correct images when the right and left arrows are clicked', async () => {
		const { container } = render(<PhotoReview />);
		await act(async () => {
			expect(getProjectByProjectId).toHaveBeenCalledTimes(1);
		});

		await act(async () => {
			userEvent.click(screen.getByTestId('photo-review-next-page-button'));
		});
		expect(screen.getByTestId('photo-review-thumbnail-4')).toBeInTheDocument();
		expect(screen.getByTestId('photo-review-thumbnail-5')).toBeInTheDocument();
		await act(async () => {
			userEvent.click(screen.getByTestId('photo-review-previous-page-button'));
		});
		expect(screen.getByTestId('photo-review-thumbnail-0')).toBeInTheDocument();
		expect(screen.getByTestId('photo-review-thumbnail-1')).toBeInTheDocument();
		expect(screen.getByTestId('photo-review-thumbnail-2')).toBeInTheDocument();
		expect(screen.getByTestId('photo-review-thumbnail-3')).toBeInTheDocument();
	});

	it('Renders the correct images when the thumbnail view buttons are clicked', async () => {
		const testIdx = 1;
		const { container } = render(<PhotoReview />);
		await act(async () => {
			expect(getProjectByProjectId).toHaveBeenCalledTimes(1);
		});

		await act(async () => {
			userEvent.click(screen.getByTestId(`photo-review-view-button-${testIdx}`));
		});
		expect(screen.getByTestId('photo-review-large')).toHaveAttribute('src', mockProject.imageUrls[testIdx]);

	});

});

// describe('PhotoReview', () => {

// 	it('Page renders correctly with data',  async () => {

// 		await act( async () => {
// 			render(
// 				<MemoryRouter initialEntries={[{pathName: '/photo-review/F9ieqoKKXEmLOik946Nb'}]}>
// 					<PhotoReview />
// 				</MemoryRouter>
// 			);

// 		});

// 		await waitFor(() => {
// 			expect(screen.findByTestId('photo-review-box')).toBeInTheDocument();
// 			expect(screen.findByTestId('photo-review-thumbnail-0')).toBeInTheDocument();
// 			}
// 		);

// 	})
// });
