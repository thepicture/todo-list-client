import { Typography } from '@mui/material';
import React from 'react';

export const Heading = ({ children }: { children: React.ReactNode }) => (
	<Typography component="h1" variant="h4">
		{children}
	</Typography>
);
