import { Auth } from 'features/auth';
import React from 'react';
import { CenteredLayout } from 'shared/ui/presentational';

const AuthPage = () => {
	return (
		<CenteredLayout>
			<Auth />
		</CenteredLayout>
	);
};

export default AuthPage;
