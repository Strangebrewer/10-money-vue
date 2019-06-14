<template>
	<b-modal :id="id" :ref="id" :title="`New Transaction for ${account.name}`">
		<label for="transaction-amount" class="mb-0">Amount*</label>
		<b-form-input
			id="transaction-amount"
			v-model="amount"
			placeholder="e.g. '10' = $10; '10.56' = $10.56"
		></b-form-input>

		<label for="transaction-date" class="mt-3 mb-0">Date*</label>
		<b-form-input id="transaction-date" v-model="date" type="date"></b-form-input>

		<label for="type" class="mb-0 mt-3">Type*</label>
		<b-form-select v-model="type" id="category">
			<option value="expense">Expense</option>
			<option value="payment">Payment</option>
		</b-form-select>

		<label for="transaction-description" class="mt-3 mb-0">Description</label>
		<b-form-input id="transaction-description" v-model="description"></b-form-input>

		<label for="category" class="mb-0 mt-3">Category</label>
		<b-form-select v-model="category" id="category">
			<option
				v-for="category of categories"
				:key="category._id"
				:value="category._id"
			>{{ category.name }}</option>
		</b-form-select>

		<label for="monthly" class="mb-0 mt-3">Monthly</label>
		<b-form-select v-model="monthly" id="monthly">
			<option v-for="monthly of monthlies" :key="monthly._id" :value="monthly._id">{{ monthly.name }}</option>
		</b-form-select>

		<template slot="modal-footer">
			<b-button @click="closeModal">{{`${count ? 'Close' : 'Cancel'}`}}</b-button>
			<b-button @click="createTransaction">{{`${count ? 'Repeat?' : 'Submit'}`}}</b-button>
		</template>
	</b-modal>
</template>

<script>
import swal from "sweetalert2";

export default {
   props: ["id", "account"],
   
	data() {
		return {
			category: null,
			monthly: null,
			description: "",
			amount: "",
			date: "",
         type: "expense",
         count: 0
		};
   },
   
	computed: {
		monthlies() {
			return this.$store.state.monthly.all;
		},
		categories() {
			return this.$store.state.category.all;
      }
   },
   
	methods: {
      closeModal() {
         this.$refs[this.id].hide();
         this.resetForm();
      },

		async createTransaction() {
			const {
				account,
				date,
				description,
				category,
				monthly,
				type
         } = this;

         let amount = this.amount;
         if (this.amount.includes("$")) amount = this.amount.replace("$", "");

         const testes = /^\d*[0-9](|.\d*[0-9]|,\d*[0-9])?$/.test(amount);
			if (amount && parseInt(amount) === NaN || !testes)
            return swal.fire("you must enter a valid number");            
			if (!amount || !date)
            return swal.fire("you must fill out all required fields");

			let parsed_amount = parseFloat(amount) * 100;
			if (amount.includes(".")) {
				parsed_amount = parseFloat(amount).toFixed(2) * 100;
         }
         
			const transaction_data = {
				date,
				description,
				category,
				monthly,
				type,
				account: account._id,
				amount: parsed_amount
			};
         console.log("transaction_data:::", transaction_data);
         
			await this.$store.dispatch("postTransaction", transaction_data);
			this.$store.dispatch("getAccounts");
			this.$store.dispatch("getCategories");
         this.$store.dispatch("getMonthlies");

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
			this.category = null;
			this.monthly = null;
			this.description = "";
			this.amount = "";
			this.date = "";
			this.type = "expense";
         this.count = 0;
		}
	}
};
</script>

<style>
</style>
