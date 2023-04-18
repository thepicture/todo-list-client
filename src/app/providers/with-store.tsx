import React from 'react';
import { storeApi } from 'shared/api';

export const withStore = (component: () => React.ReactNode) => () =>
	(
		<storeApi.Context.Provider value={storeApi.rootStoreInstance}>
			{component()}
		</storeApi.Context.Provider>
	);
