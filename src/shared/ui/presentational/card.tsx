import React from 'react';

import { Card as MuiCard } from '@mui/material';

export const Card = ({ children }: { children: React.ReactNode }) => {
	return (
		<MuiCard
			sx={{
				display: 'flex',
				flexDirection: 'column',
				padding: 5,
				gap: 4,
			}}
		>
			{children}
		</MuiCard>
	);
};
