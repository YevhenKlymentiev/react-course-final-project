const ENDPOINT_URL = {
  authorize: process.env.REACT_APP_AUTHORIZE_ENDPOINT_URL,
  login: process.env.REACT_APP_LOGIN_ENDPOINT_URL,
  signup: process.env.REACT_APP_SIGNUP_ENDPOINT_URL,
  logout: process.env.REACT_APP_LOGOUT_ENDPOINT_URL,
  getUsers: process.env.REACT_APP_GET_USERS_ENDPOINT_URL,
  getCards: process.env.REACT_APP_GET_CARDS_ENDPOINT_URL,
  createCard: process.env.REACT_APP_CREATE_CARD_ENDPOINT_URL,
  updateCard: process.env.REACT_APP_UPDATE_CARD_ENDPOINT_URL,
  updateFavorite: process.env.REACT_APP_UPDATE_FAVORITE_ENDPOINT_URL
}

export default ENDPOINT_URL;
