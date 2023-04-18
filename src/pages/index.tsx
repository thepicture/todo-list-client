import React, { lazy } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import { userModel } from 'entities/user';
import { storeApi } from 'shared/api';
import { AUTH_PATH, BASE_URL } from 'shared/config';

const AuthPage = lazy(() => import('./auth'));
const TasksPage = lazy(() => import('./tasks'));

const RequireAuth: React.FC<{ children: React.ReactElement }> = ({
	children,
}) => {
	const { uiStore } = storeApi.useStoreContext();
	const { isLoggedIn } = userModel.useSession();

	if (!isLoggedIn) {
		uiStore.notify('Время сессии истекло');
		return <Navigate to={AUTH_PATH} />;
	}
	return children;
};

export const Routing = () => (
	<Routes>
		<Route path={`${BASE_URL}/auth`} element={<AuthPage />} />
		<Route
			path={`${BASE_URL}/tasks`}
			element={
				<RequireAuth>
					<TasksPage />
				</RequireAuth>
			}
		/>
		<Route path="*" element={<Navigate to={`${BASE_URL}/auth`} />} />
	</Routes>
);
