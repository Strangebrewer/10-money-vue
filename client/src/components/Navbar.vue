<template>
	<b-navbar toggleable="lg" type="dark" variant="info" sticky>
		<b-navbar-brand :to="{ name: 'landing' }">Money Vue</b-navbar-brand>

		<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

		<b-collapse id="nav-collapse" is-nav>
			<b-navbar-nav>
				<b-nav-item :to="{ name: 'vue-links' }">Vue Links</b-nav-item>
				<b-nav-item href="#" disabled>Disabled</b-nav-item>
			</b-navbar-nav>

			<!-- Right aligned nav items -->
			<b-navbar-nav class="ml-auto">
				<login v-if="show_login && !$store.state.user.isUserLoggedIn"/>
				<b-nav-item @click="showLogin" v-if="!$store.state.user.isUserLoggedIn">Login</b-nav-item>
				<b-nav-item :to="{ name: 'signup' }" v-if="!$store.state.user.isUserLoggedIn">Sign Up</b-nav-item>

				<b-nav-item-dropdown text="Quick Links" right>
					<b-dropdown-item href="#">EN</b-dropdown-item>
					<b-dropdown-item href="#">ES</b-dropdown-item>
					<b-dropdown-item href="#">RU</b-dropdown-item>
					<b-dropdown-item href="#">FA</b-dropdown-item>
				</b-nav-item-dropdown>

				<b-nav-item-dropdown right>
					<!-- Using 'button-content' slot -->
					<template slot="button-content">
						<em>User</em>
					</template>
					<b-dropdown-item @click="testAccountSetup">Profile</b-dropdown-item>
					<b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
				</b-nav-item-dropdown>
			</b-navbar-nav>
		</b-collapse>
	</b-navbar>
</template>

<script>
import Login from "./Forms/Login";

export default {
	components: {
		Login
	},
	data() {
		return {
			show_login: false,
			show_signup: false,
			account: {
            name: "AMEX",
            type: 'debt',
				description: "Best card for groceries and gas",
				balance: 700000,
				status: "active"
			}
		};
	},
	methods: {
		showLogin() {
			let show = true;
			if (this.show_login) show = false;
			this.show_login = show;
			this.show_signup = false;
		},
		logout() {
			this.$store.dispatch("logout");
			this.$router.push({ name: "landing" });
		},

		testAccountSetup() {
			this.$store.dispatch("newAccount", this.account);
		}
   }
};
</script>

<style>
</style>
