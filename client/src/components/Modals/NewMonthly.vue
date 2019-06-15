<template>
	<b-modal :id="id" :ref="id" title="Add a New Monthly Bill">
		<label for="monthly-name" class="mb-0">Name*</label>
		<b-form-input id="monthly-name" v-model="name"></b-form-input>

		<label for="monthly-amount">Amount*</label>
		<b-form-input id="monthly-amount" v-model="amount"></b-form-input>

		<label for="monthly-due_date" class="mt-3 mb-0">Day of the Month Due*</label>
		<b-form-input id="monthly-due_date" v-model="due_date"></b-form-input>

		<label for="monthly-description" class="mt-3 mb-0">Description</label>
		<b-form-input id="monthly-description" v-model="description"></b-form-input>

		<label for="monthly-default_account" class="mt-3 mb-0">Default Source Account</label>
		<b-form-select v-model="default_account" id="monthly-default_account">
			<option v-for="account of accounts" :key="account._id" :value="account._id">{{ account.name}}</option>
		</b-form-select>

		<label for="monthly-destination" class="mt-3 mb-0">Default Destination Account</label>
		<b-form-select v-model="destination" id="monthly-destination">
			<option v-for="account of accounts" :key="account._id" :value="account._id">{{ account.name}}</option>
		</b-form-select>

		<template slot="modal-footer">
			<b-button @click="closeModal">Cancel</b-button>
			<b-button @click="save">Submit</b-button>
		</template>
	</b-modal>
</template>

<script>
import swal from "sweetalert2";

export default {
	props: ["id"],
	computed: {
		accounts() {
			return this.$store.state.account.all;
		}
	},
	data() {
		return {
			name: "",
			description: "",
			due_date: 1,
			amount: "0", // string so amount.includes works in this.save below
			default_account: null,
			destination: null
		};
	},
	methods: {
		async save() {
			try {
				let amount = this.amount;
				if (this.amount.includes("$")) amount = this.amount.replace("$", "");

				const testes = /^\d*[0-9](|.\d*[0-9]|,\d*[0-9])?$/.test(amount);
				if ((amount && parseInt(amount) === NaN) || !testes)
					return swal.fire("you must enter a valid number");
				if (!this.name || !this.amount || !this.due_date)
					return swal.fire("please fill out all required fields");

				let parsed_amount = parseFloat(amount) * 100;
				if (amount.includes(".")) {
					parsed_amount = parseFloat(amount).toFixed(2) * 100;
				}

				const monthly_data = {
					name: this.name,
					description: this.description,
					due_date: this.due_date,
					amount: parsed_amount,
					default_account: this.default_account,
					destination: this.destination
            };
            
				await this.$store.dispatch("newMonthly", monthly_data);
				this.$store.dispatch("getMonthlies");
            this.closeModal();
			} catch ({ response }) {
				swal.fire(response.data);
			}
		},
		closeModal() {
			this.$refs[this.id].hide();
			this.resetForm();
		},
		resetForm() {
			this.name = "";
			this.description = "";
			this.due_date = 1;
			this.amount = 0;
			this.default_account = null;
			this.destination = null;
		}
	}
};
</script>

<style>
</style>
