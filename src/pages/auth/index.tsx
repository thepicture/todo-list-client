import React from 'react';

import { CenteredLayout } from 'shared/ui/presentational';

import { Auth } from 'features/auth';

const AuthPage = () => {
	return (
		<CenteredLayout>
			<Auth />
		</CenteredLayout>
	);
};

export default AuthPage;
