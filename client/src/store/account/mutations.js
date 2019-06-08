export default {
   setAccounts(state, accounts) {
      state.all = accounts;
   },
   setAccount(state, account) {
      state.current = account;
   }
}