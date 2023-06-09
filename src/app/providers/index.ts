import compose from 'compose-function';
import { withLocalization } from './with-localization';
import { withNotifications } from './with-notifications';

import { withRouter } from './with-router';
import { withStore } from './with-store';
import { withTheme } from './with-theme';

export const withProviders = compose(
	withRouter,
	withTheme,
	withStore,
	withNotifications,
	withLocalization
);
