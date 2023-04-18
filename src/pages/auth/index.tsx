import React from 'react';

import { CenteredLayout } from 'shared/ui/presentational';

import { AuthContainer } from 'features/auth';

const AuthPage = () => (
	<CenteredLayout>
		<AuthContainer />
	</CenteredLayout>
);

export default AuthPage;
