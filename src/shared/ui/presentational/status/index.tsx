import { Chip, Tooltip } from '@mui/material';
import React from 'react';

import { STATUS_MAPPERS } from './config';

export const Status = ({ status }: { status: string }) => {
	const { title, color } = STATUS_MAPPERS[status];

	return (
		<Tooltip title="Статус">
			<Chip label={title} color={color} sx={{ color: 'white' }} />
		</Tooltip>
	);
};
