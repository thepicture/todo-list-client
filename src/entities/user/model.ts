import { storeApi } from 'shared/api';

export const useSession = () => {
	const { currentUser } = storeApi.useStoreContext();

	return { isLoggedIn: currentUser?.expiresAtTimestamp > Date.now() };
};
