import React from 'react';

import { Tooltip } from '@mui/material';

import { Avatar as MuiAvatar } from '@mui/material';

export const Avatar = ({
	title,
	tooltip,
}: {
	title: string;
	tooltip?: string;
}) => {
	return (
		<Tooltip title={tooltip || title}>
			<MuiAvatar
				sx={{
					textTransform: 'capitalize',
				}}
			>
				{title}
			</MuiAvatar>
		</Tooltip>
	);
};
