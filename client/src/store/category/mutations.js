export default {
    setCategories(state, categories) {
      state.all = categories;
   },
   setCategory(state, category) {
      state.current = category;
   }
}