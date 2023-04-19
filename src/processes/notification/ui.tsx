import React from 'react';

import { IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { observer } from 'mobx-react-lite';

import { storeApi } from 'shared/api';
import { AUTOHIDE_DURATION_MS } from './config';

export const Notification = observer(() => {
	const { uiStore } = storeApi.useStoreContext();

	const handleClose = (_event: React.MouseEvent, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}

		uiStore.closeNotification();
	};

	const action = (
		<IconButton
			size="small"
			aria-label="close"
			color="inherit"
			onClick={handleClose}
		>
			<CloseIcon fontSize="small" />
		</IconButton>
	);

	return (
		<div>
			<Snackbar
				open={uiStore.isNotificationOpen}
				autoHideDuration={AUTOHIDE_DURATION_MS}
				message={uiStore.notificationMessage}
				action={action}
				onClose={handleClose}
			/>
		</div>
	);
});
