import { Box } from '@mui/material';
import React from 'react';

export const Task = ({ children }: { children: React.ReactNode }) => {
	return (
		<Box
			display="grid"
			gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
			gap={2}
			pt={8}
			m={2}
		>
			{children}
		</Box>
	);
};
