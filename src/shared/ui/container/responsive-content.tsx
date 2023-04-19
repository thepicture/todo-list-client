import { DialogContent, useMediaQuery } from '@mui/material';
import React from 'react';
import { MOBILE_SCREEN } from 'shared/config';

export const ResponsiveContent = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const isMobileScreen = useMediaQuery(MOBILE_SCREEN);

	return (
		<DialogContent
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: 2,
				minWidth: isMobileScreen ? 'initial' : '400px',
			}}
		>
			{children}
		</DialogContent>
	);
};
