import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { getUserById } from 'utils/data/users';

function SingleUser() {
	const router = useRouter();
	const { id } = router.query;
	const getUser = async () => {
		const data = await getUserById(id);
		console.log({ data });
	};
	useEffect(() => {
		getUser();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return <div>SingleUser {id}</div>;
}

export default SingleUser;
