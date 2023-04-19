import styled from '@emotion/styled';
import React from 'react';

const Centered = styled('section')(() => ({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	height: '100vh',
}));

export const CenteredLayout = ({ children }: { children: React.ReactNode }) => (
	<Centered>{children}</Centered>
);
