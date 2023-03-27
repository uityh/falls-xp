// import renderer from 'react-test-renderer';
// import { render, screen, cleanup, waitFor, shallow } from '@testing-library/react';
// import PhotoReview from 'pages/PhotoReview';
// import { Route, MemoryRouter } from 'react-router-dom';
// import { getProjectByProjectId } from 'utils/data/projects';
// import { act } from 'react-dom/test-utils';



// afterEach(cleanup);

// const fetchTestData = async () => {
// 	const data = await getProjectByProjectId('F9ieqoKKXEmLOik946Nb');
// 	return data;
// };

// const foundData = fetchTestData();

// // describe('PhotoReviewLoading', () => {
// // 	it('renders loading div', () => {
// // 		const tree = renderer.create(<PhotoReview />).toJSON();
// // 		expect(tree).toMatchSnapshot();
// // 	})
// // });

// // jest.mock('react-router-dom', () => ({
// // 	...jest.requireActual('react-router-dom'),
// // 	useParams: () => ({
// // 		projectid: 'F9ieqoKKXEmLOik946Nb',
// // 	}),
// // 	useRouteMatch: () => ({ url: '/photo-review/F9ieqoKKXEmLOik946Nb' })
// // }));

// // jest.mock('../../utils/data/projects', () => ({
// // 	...jest.requireActual('../utils/data/projects'),
// // 	getProjectByProjectId: () => ({
// // 		id: 'F9ieqoKKXEmLOik946Nb',
// // 		address: '308 Negra Arroyo Lane',
// // 		assignedWorkers: [],
// // 		cost: 0,
// // 		customerId: 'eAE62yKcuRK4OCQYvmHc',
// // 		salesRepId: 'smwmzTSYJzeGMbUC5HZm',
// // 		status: 'not started',
// // 		startDate: 'March 25, 2023 at 12:00:00 AM UTC-4',
// // 		customerNotes: 'testing for images',
// // 		tasks: 'initial inspection',
// // 		imageUrls: [
// // 			'https://firebasestorage.googleapis.com/v0/b/cs555-falls-xp.appspot.com/o/test_images%2Fkrabs.jpg?alt=media&token=56f1311f-4853-4e5e-9029-2fb4b1ab6a89',
// // 			'https://firebasestorage.googleapis.com/v0/b/cs555-falls-xp.appspot.com/o/test_images%2Fsponge.png?alt=media&token=33eb6ca0-ea41-4242-98a7-98ce1d7cc837',
// // 			'https://firebasestorage.googleapis.com/v0/b/cs555-falls-xp.appspot.com/o/test_images%2Fkrabs.jpg?alt=media&token=56f1311f-4853-4e5e-9029-2fb4b1ab6a89',
// // 			'https://firebasestorage.googleapis.com/v0/b/cs555-falls-xp.appspot.com/o/test_images%2Fsponge.png?alt=media&token=33eb6ca0-ea41-4242-98a7-98ce1d7cc837',
// // 			'https://firebasestorage.googleapis.com/v0/b/cs555-falls-xp.appspot.com/o/test_images%2Fkrabs.jpg?alt=media&token=56f1311f-4853-4e5e-9029-2fb4b1ab6a89',
// // 			'https://firebasestorage.googleapis.com/v0/b/cs555-falls-xp.appspot.com/o/test_images%2Fsponge.png?alt=media&token=33eb6ca0-ea41-4242-98a7-98ce1d7cc837',
// // 		]
// // 	})
// // }));



// describe('PhotoReview', () => { 
// 	it('renders correctly',  async () => {

// 		await act( async () => { 
// 			render(
// 				<MemoryRouter initialEntries={[{pathName: '/photo-review/F9ieqoKKXEmLOik946Nb'}]}>
// 					<PhotoReview />
// 				</MemoryRouter>
// 			);
// 		});
// 		await waitFor(() => expect(screen.findByTestId('photo-review-box')));


// 		// expect(screen.getByTestId('photo-review-box')).toBeInTheDocument();
// 		// expect(screen.getByText('Inspection Photo Review')).toBeInTheDocument();
// 	})
// });


// // it("blah", () => { 
// // 	const { asFragment } = render(
		
// // 		// <MemoryRouter>
// // 		// 	<Route path='/project-views/:projectid'>
// // 		// 		<PhotoReview />
// // 		// 	</Route>
// // 		// </MemoryRouter>,
// // 		// {
// // 		// 	route: '/project-views/F9ieqoKKXEmLOik946Nb'
// // 		// }
// // 	);
// // 	expect(asFragment(<PhotoReview />)).toMatchSnapshot();
// // });

