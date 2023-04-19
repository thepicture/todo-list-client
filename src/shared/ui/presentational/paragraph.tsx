import { Typography } from '@mui/material';
import React from 'react';

export const Paragraph = ({ children }: { children: React.ReactNode }) => {
	return <Typography component="p">{children}</Typography>;
};
