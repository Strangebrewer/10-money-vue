export default {
   setMonthlies(state, monthlies) {
      state.all = monthlies;
   },
   setMonthly(state, monthly) {
      state.current = monthly;
   }
}