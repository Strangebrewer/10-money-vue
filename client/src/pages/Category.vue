<template>
	<b-container v-if="category" class="mt-4">
		<div v-if="loading" class="loading">Loading...</div>
		<b-card
			class="bg-dark text-white"
			sub-title-text-variant="info"
			:title="`Spending on ${category.name}`"
			:sub-title="category.description"
		>
			<b-row>
				<b-col cols="6">
					<b-card class="border-0 text-dark">
						<b-card-text>Total This Month: {{moneyFormat(category.month_total)}}</b-card-text>
						<b-card-text>30-Day Total: {{moneyFormat(category.thirty_total)}}</b-card-text>
						<b-card-text>Default Amount: {{category.default_amount ? moneyFormat(category.default_amount) : '$0'}}</b-card-text>
					</b-card>
				</b-col>
				<b-col cols="6">
					<b-card v-if="category.default_account" class="border-0 text-dark">
						<b-card-text class="text-lg mb-0">Default Account - {{category.default_account.name}}</b-card-text>
						<b-card-text class="text-md mt-0">{{category.default_account.description}}</b-card-text>
						<b-card-text
							class="mt-4 mb-1"
						>{{category.default_account.name}} balance: {{moneyFormat(category.default_account.balance)}}</b-card-text>
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
	</b-container>
</template>

<script>
import dateFns from "date-fns";
import formatMoney from "../utils/formatMoney";

export default {
	data() {
		return {
			category: null,
			loading: true,
         error: null,
         transactions: null,
			fields: [
				{ key: "type" },
				{ key: "amount" },
				{ key: "date" },
				{ key: "description" }
			],
			display: "all",
			options: [
				{ text: "All", value: "all" },
				{ text: "This Month", value: "month" },
				{ text: "Thirty Days", value: "thirty" }
			]
		};
	},
	async created() {
		this.getCategory();
	},
	methods: {
		moneyFormat(amount) {
			console.log("amount:::", amount);
			const parsed_amount = parseInt(amount);
			console.log("parsed_amount:::", parsed_amount);
			return formatMoney(parsed_amount);
		},
		dateFormat(date) {
			return dateFns.format(date, "MMM DD, YYYY");
		},
		async getCategory() {
			try {
				await this.$store.dispatch("getCategory", this.$route.params.id);
				this.loading = false;
				this.category = this.$store.state.category.current;
				console.log("this.category:::", this.category);
				switch (this.display) {
					case "thirty":
						this.transactions = this.category.thirty_days;
						break;
					case "month":
						this.transactions = this.category.this_month;
						break;
					default:
						this.transactions = this.category.transactions_all;
				}
			} catch (e) {
				this.loading = false;
				this.error = e.message;
			}
		}
	},
	watch: {
		display: function() {
			this.getCategory();
		}
	}
};
</script>

<style>
</style>
