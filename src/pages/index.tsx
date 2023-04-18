import React from 'react';
import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const AuthPage = lazy(() => import('./auth'));

const BASE_URL =
	process.env.NODE_ENV === 'development' ? '' : '/todo-list-client';

export const Routing = () => (
	<Routes>
		<Route path={`${BASE_URL}/auth`} element={<AuthPage />} />
		<Route path="*" element={<Navigate to={`${BASE_URL}/auth`} />} />
	</Routes>
);
