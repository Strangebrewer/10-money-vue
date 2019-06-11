<template>
	<b-modal :id="id" :ref="id" :title="`New Transaction for ${category.name}`">
		<label for="account" class="mb-0">Account*</label>
		<b-form-select v-model="account" id="account">
			<option v-for="account of accounts" :key="account._id" :value="account._id">{{ account.name }}</option>
		</b-form-select>

		<label for="transaction-amount" class="mt-3 mb-0">Amount*</label>
		<b-form-input id="transaction-amount" v-model="amount" placeholder="e.g. '1002' = $1,002 ; '10.02' = $10.02"></b-form-input>

		<label for="transaction-date" class="mt-3 mb-0">Date*</label>
		<b-form-input id="transaction-date" v-model="date" type="date"></b-form-input>

		<label for="transaction-description" class="mt-3 mb-0">Description</label>
		<b-form-input id="transaction-description" v-model="description"></b-form-input>

		<template slot="modal-footer">
			<b-button @click="$bvModal.hide(id)">Cancel</b-button>
			<b-button @click="createTransaction">Submit</b-button>
		</template>
	</b-modal>
</template>

<script>
import swal from "sweetalert2";

export default {
	props: ["id", "category"],
	data() {
		return {
			account: null,
			description: "",
			amount: "",
			date: ""
		};
	},
	computed: {
		accounts() {
			return this.$store.state.account.all;
		}
	},
	methods: {
		async createTransaction() {
			const { amount, account, date, description, category } = this;
			if (!amount || !account || !date)
				return swal.fire("you must fill out all required fields");
			let parsed_amount = parseFloat(this.amount) * 100;
			if (amount.includes(".")) {
				parsed_amount = parseFloat(amount).toFixed(2) * 100;
			}
			const transaction_data = {
				account,
				date,
				description,
				amount: parsed_amount,
				category: category._id,
				type: category.type
			};
			console.log("transaction_data:::", transaction_data);
			await this.$store.dispatch("postTransaction", transaction_data);
			this.resetForm();
			this.$store.dispatch("getAccounts");
			this.$store.dispatch("getCategories");
			this.$refs[this.id].hide();
		},
		resetForm() {
			this.account = null;
			this.description = "";
			this.amount = "";
			this.date = "";
		}
	}
};
</script>

<style>
</style>
