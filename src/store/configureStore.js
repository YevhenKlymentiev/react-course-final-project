import { configureStore } from '@reduxjs/toolkit';

import ENDPOINT_URL from 'constants/endpointURL';
import apiClient from 'helpers/apiClient';
import authReducer from './slices/auth';
import usersReducer from './slices/users';
import cardsReducer from './slices/cards';

export default function configureAppStore() {
  return configureStore({
    reducer: {
      auth: authReducer,
      users: usersReducer,
      cards: cardsReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: { apiClient, ENDPOINT_URL },
        }
      })
  });
}
