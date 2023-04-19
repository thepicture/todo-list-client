import React from 'react';

import { ButtonBase } from '@mui/material';

export const CardButton = ({
	children,
	onClick,
}: {
	children: React.ReactNode;
	onClick: () => void;
}) => (
	<ButtonBase
		sx={{
			display: 'flex',
			flexDirection: 'column',
			width: '100%',
			height: '100%',
		}}
		tabIndex={0}
		onClick={onClick}
	>
		{children}
	</ButtonBase>
);
