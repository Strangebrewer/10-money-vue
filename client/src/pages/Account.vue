<template>
	<div class="account">
		<div v-if="loading">Loading...</div>
		<div v-if="error">Loading...</div>
		<div v-if="account">{{account}}</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			loading: false,
			account: null,
			error: null
		};
	},
	async created() {
		this.fetchAccount();
		await this.$store.dispatch("getAccount", this.$route.params.id);
	},
	methods: {
		async fetchAccount() {
         this.error = this.account = null;
         this.loading = true;
         await this.$store.dispatch("getAccount", this.$route.params.id);
         this.loading = false;
         this.account = this.$store.state.account.current;
		}
	},
	mounted() {
		console.log(
			"this.$store.state.account.current:::",
			this.$store.state.account.current
		);
	}
};
</script>

<style>
</style>
