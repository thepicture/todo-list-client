import { Box } from '@mui/material';
import React from 'react';
import { useStoreContext } from 'shared/api/store';

export const Task = ({ children }: { children: React.ReactNode }) => {
	const { taskStore } = useStoreContext();

	return (
		<Box
			display={Array.isArray(taskStore.filteredTasks) ? 'grid' : 'block'}
			gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
			gap={2}
			pt={6}
			pr={2}
			pb={2}
			pl={2}
		>
			{children}
		</Box>
	);
};
