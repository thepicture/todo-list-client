import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export const withLocalization = (component: () => React.ReactNode) => () =>
	(
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<DemoContainer components={['DateTimePicker']}>
				{component()}
			</DemoContainer>
		</LocalizationProvider>
	);
