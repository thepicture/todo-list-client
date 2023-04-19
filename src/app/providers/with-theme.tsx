import React from 'react';

import { createTheme, ThemeProvider } from '@mui/material';
import { green } from '@mui/material/colors';

const theme = createTheme({
	palette: {
		primary: {
			main: green[500],
		},
		secondary: {
			main: '#fff',
		},
	},
	components: {
		MuiButton: {
			defaultProps: {
				variant: 'contained',
				sx: {
					color: 'white',
				},
			},
		},
		MuiTextField: {
			defaultProps: {
				variant: 'standard',
			},
		},
	},
});

export const withTheme = (component: () => React.ReactNode) => () =>
	<ThemeProvider theme={theme}>{component()}</ThemeProvider>;
