import React from 'react';

import { ButtonBase } from '@mui/material';

export const CardButton = ({ children }: { children: React.ReactNode }) => (
	<ButtonBase
		sx={{
			display: 'flex',
			flexDirection: 'column',
			width: '100%',
			height: '100%',
		}}
	>
		{children}
	</ButtonBase>
);
