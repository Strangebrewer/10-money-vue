<template>
	<b-container class="account">
		<div v-if="loading" class="loading">Loading...</div>

		<b-card
			v-else
			class="bg-dark text-white"
			sub-title-text-variant="info"
			:title="`${account.name} Details`"
			:sub-title="account.description"
		>
			<b-row>
				<b-col cols="6">
					<b-card class="border-0 text-dark">
						<b-card-text>Balance: {{moneyFormat(account.balance)}}</b-card-text>
						<b-card-text>Status: {{account.status}}</b-card-text>
					</b-card>
				</b-col>
			</b-row>
		</b-card>

		<b-form-radio-group
			v-if="!loading"
			id="transactions"
			v-model="display"
			:options="options"
			align="center"
			class="pt-2"
		></b-form-radio-group>

		<b-table v-if="!loading" striped :items="transactions" :fields="fields">
			<template slot="amount" scope="row">{{moneyFormat(row.value)}}</template>

			<template slot="date" scope="row">{{dateFormat(row.value, 'MMM DD, YYYY')}}</template>
		</b-table>

      <b-pagination
         align="center"
         v-if="!loading"
         v-model="currentPage"
         :per-page="perPage"
         :total-rows="transactionCount"
      />
	</b-container>
</template>

<script>
import dateFns from "date-fns";
import formatMoney from "../utils/formatMoney";

export default {
	data() {
		return {
			account: null,
			display: "all",
			error: null,
			fields: [
				{ key: "type" },
				{ key: "amount" },
				{ key: "date" },
				{ key: "description" }
			],
			loading: true,
			options: [
				{ text: "All", value: "all" },
				{ text: "This Month", value: "month" },
				{ text: "Thirty Days", value: "thirty" }
         ],
         perPage: 10,
         currentPage: 1,
         transactionCount: 0,
         transactions: null
		};
	},
	async created() {
		this.getAccount();
	},
	methods: {
		moneyFormat(amount) {
			const parsed_amount = parseInt(amount);
			return formatMoney(parsed_amount);
		},
		dateFormat(date) {
			return dateFns.format(date, "MMM DD, YYYY");
		},
		async getAccount() {
			try {
				await this.$store.dispatch("getAccount", this.$route.params.id);
				this.loading = false;
				this.account = this.$store.state.account.current;
				console.log("this.account::: ", this.account);
				switch (this.display) {
					case "thirty":
						this.transactions = this.account.thirty_days;
						break;
					case "month":
						this.transactions = this.account.this_month;
						break;
					default:
                  this.transactions = this.account.transactions_all;
                  this.transactionCount = this.transactions.length;
				}
			} catch (e) {
				this.loading = false;
				this.error = e.message;
			}
		}
	},
	watch: {
		display: function() {
			this.getAccount();
		}
	}
};
</script>

<style>
</style>
