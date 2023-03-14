import React from 'react';
import { useParams } from 'react-router-dom';

function SingleUser() {
	const { id } = useParams();
	return <div>Single User {id}</div>;
}

export default SingleUser;
