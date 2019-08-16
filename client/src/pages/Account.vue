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
		<b-table v-if="!loading" striped :items="transactions" :fields="fields">
         <template slot="amount" scope="row">
            {{moneyFormat(row.value)}}
         </template>
      </b-table>
	</b-container>
</template>

<script>
import formatMoney from "../utils/formatMoney";

export default {
	data() {
		return {
			account: null,
			loading: true,
         error: null,
         transactions: null,
         fields: [
            { key: 'type' },
            { key: 'amount' },
            { key: 'date' },
            { key: 'description' }
         ]
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
		async getAccount() {
			try {
				await this.$store.dispatch("getAccount", this.$route.params.id);
				this.loading = false;
            this.account = this.$store.state.account.current;
            this.transactions = this.account.transactions_all;
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
