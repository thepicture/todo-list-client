import React, { useState } from 'react';

import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Tooltip,
} from '@mui/material';

import { observer } from 'mobx-react-lite';

import { useStoreContext } from 'shared/api/store';
import { DEFAULT_FILTER, filterList, getFilterById } from './config';

export const Filters = observer(() => {
	const { taskStore } = useStoreContext();

	const [isSelectOpen, setIsSelectOpen] = useState(false);

	return (
		<FormControl variant="standard" sx={{ m: 1, width: 200 }}>
			<Tooltip title={isSelectOpen ? '' : 'Группировать по'}>
				<Select
					defaultValue={DEFAULT_FILTER}
					sx={{ color: 'white' }}
					color="secondary"
					onOpen={() => setIsSelectOpen(true)}
					onClose={() => setIsSelectOpen(false)}
				>
					{filterList.map(({ id, title }) => (
						<MenuItem
							key={id}
							value={id}
							onClick={() => {
								taskStore.applyFilter(getFilterById(id));
							}}
						>
							<em>{title}</em>
						</MenuItem>
					))}
				</Select>
			</Tooltip>
		</FormControl>
	);
});
