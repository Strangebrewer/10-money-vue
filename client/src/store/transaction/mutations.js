export default {
   setTransactions(state, transactions) {
      state.all = transactions;
   },
   setTransaction(state, transaction) {
      state.current = transaction;
   }
}