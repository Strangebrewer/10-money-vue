<template>
   <div class="category">
      <div v-if="loading" class="loading">Loading...</div>

   </div>
</template>

<script>
export default {
   data() {
      return {
         category: null,
         loading: true,
         error: null
      }
   },
	async created() {
		this.getCategory();
	},
	methods: {
		async getCategory() {
			try {
				await this.$store.dispatch("getCategory", this.$route.params.id);
				this.loading = false;
				this.category = this.$store.state.category.current;
				console.log("this.category:::", this.category);
			} catch (e) {
				this.loading = false;
				this.error = e.message;
			}
		}
	},
   mounted() {
      console.log('this.category:::', this.category);
   }
}
</script>

<style>

</style>
