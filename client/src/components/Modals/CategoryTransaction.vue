<template>
	<b-modal :id="id" :ref="id" :title="`New Transaction for ${category.name}`">
		<label for="account" class="mb-0">Account</label>
		<b-form-select v-model="account" id="account">
			<option v-for="account of accounts" :key="account._id" :value="account._id">{{ account.name }}</option>
		</b-form-select>

		<label for="transaction-amount" class="mt-3 mb-0">Amount*</label>
		<b-form-input
			id="transaction-amount"
			v-model="amount"
			placeholder="e.g. '1002' = $1,002 ; '10.02' = $10.02"
		></b-form-input>

		<label for="transaction-date" class="mt-3 mb-0">Date*</label>
		<b-form-input id="transaction-date" v-model="date" type="date"></b-form-input>

		<label for="transaction-description" class="mt-3 mb-0">Description</label>
		<b-form-input id="transaction-description" v-model="description"></b-form-input>

		<template slot="modal-footer">
			<b-button @click="closeModal">{{`${count ? 'Close' : 'Cancel'}`}}</b-button>
			<b-button @click="createTransaction">{{`${count ? 'Repeat?' : 'Submit'}`}}</b-button>
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
			destination: null,
			amount: "",
         date: "",
         count: 0
		};
   },
   
	computed: {
		accounts() {
			return this.$store.state.account.all;
		}
   },
   
	methods: {
      closeModal() {
			this.$refs[this.id].hide();
         this.resetForm();
      },

		async createTransaction() {
			const { amount, account, date, description, category } = this;
			if (!amount || !date)
				return swal.fire("Please fill out all required fields");

			let amount_string = amount;
         if (amount.includes("$")) amount_string = amount.replace("$", "");
         
			const testes = /^\d*[0-9](|.\d*[0-9]|,\d*[0-9])?$/.test(amount_string);
			if ((amount && parseInt(amount_string) === NaN) || !testes) {
				return swal.fire("you must enter a valid number");
			}

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
				type: category.type === "income" ? "payment" : "expense"
			};
         console.log("transaction_data:::", transaction_data);
         
         await this.$store.dispatch("postTransaction", transaction_data);
			this.$store.dispatch("getAccounts");
         this.$store.dispatch("getCategories");
         
         this.count++;
         swal.fire({
            title: 'transaction recorded',
            toast: true,
            type: 'success',
            position: 'top',
            timer: 1500
         });
      },
      
		resetForm() {
			this.account = null;
			this.description = "";
			this.amount = "";
			this.date = "";
         this.count = 0;
		}
	}
};
</script>

<style>
</style>
