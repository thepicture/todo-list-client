import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export const Header = ({
	title,
	logo,
	children,
}: {
	title: string;
	logo: React.ReactNode;
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
					<Box display="flex" alignItems="center" gap={2}>
						{logo}
						{title}
					</Box>
				</Typography>
				{children}
			</Toolbar>
		</AppBar>
	</Box>
);
