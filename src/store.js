import { createStore } from 'vuex';

export default createStore({
  state: {
    authToken: sessionStorage.getItem('AuthToken') ? JSON.parse(sessionStorage.getItem('AuthToken')) : null,
    isAppRootVisible: sessionStorage.getItem('AuthToken') ? true : false,
  },
  mutations: {
    SET_AUTH_TOKEN(state, token) {
      state.authToken = token;
      if(token) {
        state.isAppRootVisible = true;
      } else {
        state.isAppRootVisible = false;
      }
    },
  },
  actions: {
    setAuthToken({ commit }, token) {
      sessionStorage.setItem('AuthToken', JSON.stringify(token));
      commit('SET_AUTH_TOKEN', token);
    },
    clearAuthToken({ commit }) {
      sessionStorage.removeItem('AuthToken');
      commit('SET_AUTH_TOKEN', null);
    },
  },
  getters: {
    isAppRootVisible: state => state.isAppRootVisible,
  }
});


console.log('UserID '+sessionStorage.getItem('UserID'));