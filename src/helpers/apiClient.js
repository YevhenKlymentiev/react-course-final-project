import { nanoid } from '@reduxjs/toolkit';

import ENDPOINT_URL from 'constants/endpointURL';
import REST_METHOD from 'constants/restMethod';
import { AUTH_TEXT } from 'constants/text';
import { getFromStorage, updateStorage } from 'helpers/storage';

const createUser = (fields) => ({ ...fields, id: nanoid(), cardIds: [], favoriteIds: [] });
const createCard = (fields, currentUserId) => (
  { ...fields, id: nanoid(), creationDate: new Date().toString(), authorId: currentUserId }
);

const service = {
  [ENDPOINT_URL.authorize]: (resolve, reject, accessToken, hasError) => {
    if (hasError) return reject();

    const allUsers = getFromStorage('allUsers');

    return resolve(allUsers.find(curr => curr.id === accessToken));
  },
  [ENDPOINT_URL.login]: (resolve, reject, { email, password, isStayedLogged }) => {
    const allUsers = getFromStorage('allUsers', []);
    const matchUser = allUsers.find(curr => (curr.email === email) && (curr.password === password));

    if (!matchUser) return reject(AUTH_TEXT.loginError);

    const storage = isStayedLogged ? localStorage : sessionStorage;
    storage.setItem('accessToken', matchUser.id);

    return resolve(matchUser);
  },
  [ENDPOINT_URL.signup]: (resolve, reject, fields) => {
    const allUsers = getFromStorage('allUsers', []);
    const matchUser = allUsers.find(curr => curr.email === fields.email);

    if (matchUser) return reject(AUTH_TEXT.emailTakenError);

    const newUser = createUser(fields);
    sessionStorage.setItem('accessToken', newUser.id);
    updateStorage('allUsers', [...allUsers, newUser]);

    return resolve(newUser);
  },
  [ENDPOINT_URL.createCard]: (resolve, reject, fields, hasError) => {
    if (hasError) return reject();

    const currentUserId = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
    const newCard = createCard(fields, currentUserId);

    const allUsers = getFromStorage('allUsers');
    const updatedUserIndex = allUsers.findIndex(curr => curr.id === currentUserId);
    const updatedUser = allUsers[updatedUserIndex];

    allUsers[updatedUserIndex] = { ...updatedUser, cardIds: [...updatedUser.cardIds, newCard.id] };
    updateStorage('allUsers', allUsers);

    const allCards = getFromStorage('allCards', []);
    updateStorage('allCards', [...allCards, newCard]);

    return resolve(newCard);
  },
  [ENDPOINT_URL.updateCard]: (resolve, reject, { cardId, fields }, hasError) => {
    if (hasError) return reject();

    const allCards = getFromStorage('allCards');
    const updatedCardIndex = allCards.findIndex(curr => curr.id === cardId);
    const updatedCard = { ...allCards[updatedCardIndex], ...fields }

    allCards[updatedCardIndex] = updatedCard;
    updateStorage('allCards', allCards);

    return resolve(updatedCard);
  },
  [ENDPOINT_URL.updateFavorite]: (resolve, reject, { cardId, method }) => {
    const allUsers = getFromStorage('allUsers');
    const currentUserId = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
    const updatedUserIndex = allUsers.findIndex(curr => curr.id === currentUserId);
    const updatedUser = allUsers[updatedUserIndex];
    let favoriteIds = updatedUser.favoriteIds;

    if (method === REST_METHOD.post) { favoriteIds.push(cardId); }
    if (method === REST_METHOD.delete) { favoriteIds = favoriteIds.filter(curr => curr !== cardId); }

    allUsers[updatedUserIndex] = { ...updatedUser, favoriteIds };
    updateStorage('allUsers', allUsers);

    return resolve(favoriteIds);
  }
};

export default function apiClient(endpointPath, payload) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const hasError = getFromStorage('withErrors') && Math.random() < 0.3;

      service[endpointPath](resolve, reject, payload, hasError);
    }, 2000);
  });
}
