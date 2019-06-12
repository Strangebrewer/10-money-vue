<template>
	<b-nav-form @submit="onSubmit" @reset="onReset">
		<b-form-input
			v-model="form.username"
			type="text"
			size="xs"
			class="mr-sm-2"
			placeholder="Username"
		></b-form-input>

		<b-form-input
			v-model="form.password"
			type="password"
			size="sm"
			class="mr-sm-2"
			placeholder="Password"
		></b-form-input>
		<b-button size="sm" class="my-2 my-sm-0" type="submit">Signup</b-button>
	</b-nav-form>
</template>

<script>
export default {
	data() {
		return {
			form: {
				username: "",
				password: ""
				// checked: []
			},
			show: true
		};
	},
	methods: {
		async onSubmit(evt) {
			evt.preventDefault();
			const user = await this.$store.dispatch("login", this.form);
			console.log("Success!");
			console.log("user in Login.vue:::", user);
		},
		onReset(evt) {
			evt.preventDefault();
			// Reset our form values
			this.form.username = "";
			this.form.password = "";
			this.form.checked = [];
			// Trick to reset/clear native browser form validation state
			this.show = false;
			this.$nextTick(() => {
				this.show = true;
			});
		}
	}
};
</script>

<style>
</style>
