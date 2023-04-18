import React from 'react';
import { Chip, Tooltip } from '@mui/material';

import { PRIORITY_MAPPERS } from './config';

export const Priority = ({ priority }: { priority: string }) => {
	const { title, color } = PRIORITY_MAPPERS[priority];

	return (
		<Tooltip title="Приоритет">
			<Chip variant="outlined" label={title} color={color} />
		</Tooltip>
	);
};
