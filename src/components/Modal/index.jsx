import { Dialog, Stack, Typography, Box, IconButton } from '@mui/material';
import React from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

function Modal({
	isOpen,
	handleClose,
	title,
	children,
	sx,
	titleAlignment = 'center',
}) {
	return (
		<Dialog open={isOpen} onClose={handleClose} maxWidth={false}>
			<Box sx={{ p: 4, width: '60vw', ...sx }}>
				<Stack direction="row" sx={{ alignItems: 'flex-start', mb: 3 }}>
					{typeof title === 'string' ? (
						<Typography
							variant="h5"
							textTransform="uppercase"
							sx={{
								width: '100%',
								textAlign: 'center',
								pl: 6,
								pr: 1,
								alignSelf: 'center',
							}}
						>
							{title}
						</Typography>
					) : (
						<Box
							sx={{
								width: '100%',
								pl: titleAlignment === 'center' ? 5 : 0,
								pr: 1,
							}}
						>
							{title}
						</Box>
					)}
					<IconButton onClick={handleClose}>
						<CloseRoundedIcon />
					</IconButton>
				</Stack>
				{children}
			</Box>
		</Dialog>
	);
}

export default Modal;
