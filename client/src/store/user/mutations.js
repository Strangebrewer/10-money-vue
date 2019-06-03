export default {
   setUser(state, user) {
      console.log('state:::', state);
      console.log('user in setUser mutation:::', user);
      state.currentUser = user;
      if (user)
         state.isUserLoggedIn = true;
      else
         state.isUserLoggedIn = false;
   }
}