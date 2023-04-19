import React from 'react';

import { Box } from '@mui/material';

export const Row = ({ children }: { children: React.ReactNode }) => {
	return (
		<Box display="flex" alignItems="center" flexWrap="wrap" gap={1}>
			{children}
		</Box>
	);
};
