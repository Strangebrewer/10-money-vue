<template>
	<b-container fluid class="landing text-center">
		<b-jumbotron :header="msg"></b-jumbotron>
		<b-row v-if="$store.state.user.isUserLoggedIn" align-h="center">
			<b-col cols="12" sm="10" md="8" lg="4">
				<b-card title="Accounts" class="shadow border-primary text-left my-3">
					<b-list-group>
						<b-list-group-item
							v-for="account in accounts"
							:key="account._id"
							class="d-flex justify-content-between align-items-center"
						>
							{{ account.name }}
							<span>{{ account.money }}</span>
						</b-list-group-item>
					</b-list-group>
				</b-card>
			</b-col>

			<b-col cols="12" sm="10" md="8" lg="4">
				<b-card title="Spending Categories" class="shadow border-primary text-left my-3">
					<b-list-group>
						<b-list-group-item
							v-for="category in categories"
							:key="category._id"
							class="d-flex justify-content-between align-items-center"
						>{{ category.name }}</b-list-group-item>
					</b-list-group>
				</b-card>
			</b-col>

			<b-col cols="12" sm="10" md="8" lg="4">
				<b-card title="Monthly Bills" class="shadow border-primary text-left my-3">
					<b-list-group>
						<b-list-group-item
							v-for="monthly in monthlies"
							:key="monthly._id"
							class="d-flex justify-content-between align-items-center"
						>{{ monthly.name }}</b-list-group-item>
					</b-list-group>
				</b-card>
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
import Login from "../components/Forms/Login";
import formatMoney from "../lib/formatMoney";

export default {
	components: {
		Login
	},

	data() {
		return {
			msg: "Landing Page"
		};
	},

	computed: {
		accounts() {
			const accounts = this.$store.state.user.currentUser.accounts.map(
				account => {
					// const money = `$${parseFloat(account.balance / 100).toFixed(2)}`;
					const money = `${formatMoney(account.balance)}`;
					account.money = money;
					return account;
				}
			);
			return accounts;
		},
		categories() {
			return this.$store.state.user.currentUser.categories;
		},
		monthlies() {
			const rent_id = this.$store.state.user.currentUser.monthlies.filter(
				monthly => true
			);
			console.log("rent_id:::", rent_id);
			console.log(
				"transactions taht are AFCU Visa:::",
				this.$store.state.user.currentUser.transactions_month.filter(
					transaction => transaction.monthly === "5cf60e1a06c6a22444cb99e4"
				)
			);
			return this.$store.state.user.currentUser.monthlies;
		}
	},

	mounted() {
		console.log("this.$store.state:::", this.$store.state);
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
