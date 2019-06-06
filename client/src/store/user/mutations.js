export default {
   setUser(state, user) {
      if (user) {
         state.currentUser = user;
         state.isUserLoggedIn = true;
      }
      else {
         state.currentUser = {};
         state.isUserLoggedIn = false;
      }
   }
}