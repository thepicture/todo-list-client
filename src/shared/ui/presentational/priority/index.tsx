import React from 'react';
import { Chip } from '@mui/material';

import { PRIORITY_MAPPERS } from './config';

export const Priority = ({ priority }: { priority: string }) => {
	const { title, color } = PRIORITY_MAPPERS[priority];

	return (
		<Chip
			variant="outlined"
			label={title}
			color={color}
			sx={{ pointerEvents: 'none' }}
		/>
	);
};
