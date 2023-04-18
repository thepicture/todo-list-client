import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export const Header = ({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) => (
	<Box sx={{ flexGrow: 1 }}>
		<AppBar position="fixed">
			<Toolbar>
				<Typography
					variant="h6"
					component="div"
					sx={{ flexGrow: 1 }}
					color="secondary"
				>
					{title}
				</Typography>
				{children}
			</Toolbar>
		</AppBar>
	</Box>
);
