<template>
	<div class="account">
		<div v-if="loading" class="loading">Loading...</div>
      
	</div>
</template>

<script>
export default {
	data() {
		return {
         account: null,
			loading: true,
			error: null
		};
	},
	async created() {
		this.getAccount();
	},
	methods: {
		async getAccount() {
			try {
				await this.$store.dispatch("getAccount", this.$route.params.id);
				this.loading = false;
				this.account = this.$store.state.account.current;
				console.log("this.account:::", this.account);
			} catch (e) {
				this.loading = false;
				this.error = e.message;
			}
		}
	}
};
</script>

<style>
</style>
