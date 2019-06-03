<template>
	<b-container fluid class="signup-page text-center my-5">
		<b-row align-h="center">
			<b-col cols="10" sm="8" md="6" lg="5" xl="4" class>
				<b-card title="Sign Up" class="shadow border-primary text-left">
					<b-form @submit="onSubmit" @reset="onReset" v-if="show">
						<b-form-group label="Username:" label-for="username">
							<b-form-input id="username" v-model="form.username"></b-form-input>
						</b-form-group>

						<b-form-group label="Your Password:" label-for="password">
							<b-form-input id="password" v-model="form.password" type="password"></b-form-input>
						</b-form-group>

						<b-form-group
							label="Email address:"
							label-for="email"
							description="For password recovery only - we'll never share your email with anyone else."
						>
							<b-form-input id="email" v-model="form.email" type="email"></b-form-input>
						</b-form-group>

						<b-form-group label="Your First Name:" label-for="first-name">
							<b-form-input id="first-name" v-model="form.first_name"></b-form-input>
						</b-form-group>

						<b-form-group label="Your Last Name:" label-for="last-name">
							<b-form-input id="last-name" v-model="form.last_name"></b-form-input>
						</b-form-group>

						<b-button type="submit" variant="primary">Submit</b-button>
						<b-button type="reset" variant="danger">Reset</b-button>
					</b-form>
				</b-card>
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
export default {
	data() {
		return {
			form: {
				username: "",
				password: "",
				email: "",
				first_name: "",
				last_name: ""
			},
			show: true
		};
	},
	methods: {
		async onSubmit(evt) {
			evt.preventDefault();
			alert(JSON.stringify(this.form));
			const user = await this.$store.dispatch("register", this.form);
			this.onReset();
			console.log("Success!");
			console.log("user in Signup.vue:::", user);
			this.$router.push({ name: "landing" });
		},
		onReset(evt) {
			if (evt) evt.preventDefault();
			// Reset our form values
			this.form.email = "";
			this.form.username = "";
			this.form.password = "";
			this.form.first_name = "";
			this.form.last_name = "";
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
