import React from 'react';

import { Chip } from '@mui/material';

import { STATUS_MAPPERS } from './config';

export const Status = ({ status }: { status: string }) => {
	const { title, color } = STATUS_MAPPERS[status];

	return (
		<Chip
			label={title}
			color={color}
			sx={{ color: 'white', pointerEvents: 'none' }}
		/>
	);
};
