/* eslint-disable */
/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-unresolved
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import { getProjectsByStatus } from 'utils/data/projects';
import { Typography } from '@mui/material';

Chart.register(ArcElement, Tooltip, Legend);

async function siteReviewProjects() {
	const siteReview = await getProjectsByStatus('site review');
	let siteReviewCount = 0;
	for (let i = 0; i < siteReview.length; i++) {
		if (siteReview[i].status === 'site review') {
			siteReviewCount++;
		}
	}
	return siteReviewCount;
}

async function initialInspectionProjects() {
	const initialInspection = await getProjectsByStatus('initial inspection');
	let initialInspectionCount = 0;
	for (let i = 0; i < initialInspection.length; i++) {
		if (initialInspection[i].status === 'initial inspection') {
			initialInspectionCount++;
		}
	}
	return initialInspectionCount;
}

async function leadOnboardedProjects() {
	const leadOnboarded = await getProjectsByStatus('lead onboarded');
	let leadOnboardedCount = 0;
	for (let i = 0; i < leadOnboarded.length; i++) {
		if (leadOnboarded[i].status === 'lead onboarded') {
			leadOnboardedCount++;
		}
	}
	return leadOnboardedCount;
}

function ProjectChart() {
	const [loading, setLoading] = useState(true);
	const [site, setSite] = useState(0);
	const [initial, setInitial] = useState(0);
	const [lead, setLead] = useState(0);

	const fetchData = async () => {
		const siteData = await siteReviewProjects();
		const initialData = await initialInspectionProjects();
		const leadData = await leadOnboardedProjects();
		setLoading(false);
		setSite(siteData);
		setInitial(initialData);
		setLead(leadData);
	};

	useEffect(() => {
		fetchData();
	}, []);

	if (loading) return <Typography>Loading...</Typography>;

	const chartData = {
		labels: ['Site Review', 'Initial Inspection', 'Lead Onboarded'],
		datasets: [
			{
				label: 'Projects',
				data: [site, initial, lead],
				backgroundColor: [
					'rgba(0, 0, 139)',
					'rgba(255, 195, 0)',
					'rgba(21, 71, 52)',
				],
				borderColor: [
					'rgba(0, 0, 0)',
					'rgba(0, 0, 0)',
					'rgba(0, 0, 0)',
				],
				borderWidth: 1,
			},
		],
	};

	return (
		<div>
			<Pie data={chartData} />
		</div>
	);
}

export default ProjectChart;
