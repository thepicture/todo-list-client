import { Notification } from 'processes/notification';
import React from 'react';

export const withNotifications = (component: () => React.ReactNode) => () =>
	(
		<>
			<Notification />
			{component()}
		</>
	);
