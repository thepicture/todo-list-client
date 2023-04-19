import React from 'react';

import { Card as MuiCard, useMediaQuery } from '@mui/material';
import { MOBILE_SCREEN } from 'shared/config';

export const Card = ({
	noBordersOnMobile = false,
	children,
}: {
	noBordersOnMobile?: boolean;
	children: React.ReactNode;
}) => {
	const isMobileScreen = useMediaQuery(MOBILE_SCREEN);

	return (
		<MuiCard
			sx={{
				display: 'flex',
				flexDirection: 'column',
				padding: 5,
				gap: 4,
				...{
					...(isMobileScreen && {
						textAlign: 'center',
					}),
				},
			}}
			elevation={noBordersOnMobile && isMobileScreen ? 0 : 4}
		>
			{children}
		</MuiCard>
	);
};
