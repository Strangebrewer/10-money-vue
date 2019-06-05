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
							<span class="font-weight-bold">{{ moneyFormat(account.balance) }}</span>
						</b-list-group-item>
					</b-list-group>
				</b-card>
			</b-col>

			<b-col cols="12" sm="10" md="8" lg="4">
				<b-card title="Spending Categories" class="shadow border-primary text-left my-3">
					<b-list-group>
						<b-list-group-item v-for="category in categories" :key="category._id">
							{{ category.name }}
							<b-badge
								variant="success"
								class="float-right width-75 block"
							>{{ moneyFormat(category.thirty_total) }}</b-badge>
							<b-badge
								variant="primary"
								class="float-right width-60 mr-1 block"
							>{{ moneyFormat(category.month_total) }}</b-badge>
						</b-list-group-item>
					</b-list-group>
				</b-card>
			</b-col>

			<b-col cols="12" sm="10" md="8" lg="4">
				<b-card title="Monthly Bills" class="shadow border-primary text-left my-3">
					<b-list-group>
						<b-list-group-item v-for="monthly in monthlies" :key="monthly._id">
							{{ monthly.name }}
							<b-badge
								class="float-right width-75 block font-weight-bold"
							>{{ moneyFormat(monthly.this_month.length ? moneyReduce(monthly.this_month) : monthly.amount) }}</b-badge>
							<b-badge
								class="float-right width-60 block mr-1"
								:variant="monthly.this_month.length ? 'success' : 'warning'"
							>{{ monthly.this_month.length ? 'Paid' : `Due ${monthly.due_date}` }}</b-badge>
						</b-list-group-item>
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
			return this.$store.state.user.currentUser.accounts;
		},
		categories() {
			return this.$store.state.user.currentUser.categories;
		},
		monthlies() {
			return this.$store.state.user.currentUser.monthlies;
		}
	},

	methods: {
		moneyFormat(number) {
			return formatMoney(number);
		},
		moneyReduce(array) {
			return array.reduce((total, item) => total + item.amount, 0);
		}
	},

	mounted() {
		console.log("this.$store.state:::", this.$store.state);
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.width-75 {
	min-width: 75px;
}
.width-60 {
	min-width: 60px;
}
</style>
