<template>
	<b-modal :id="id" :ref="id" title="Add a New Category">
		<label for="category-name" class="mb-0">Name*</label>
		<b-form-input id="category-name" v-model="name"></b-form-input>

		<label for="category-type" class="mt-3 mb-0">Type*</label>
		<b-form-select v-model="type" id="category-type">
			<option value="expense">Expense</option>
			<option value="income">Income</option>
		</b-form-select>

		<label for="category-description" class="mt-3 mb-0">Description</label>
		<b-form-input id="category-description" v-model="description"></b-form-input>

		<label for="category-default-amount">Default Amount</label>
		<b-form-input id="category-default-amount" v-model="default_amount"></b-form-input>

		<label for="category-default_account" class="mt-3 mb-0">Default Account</label>
		<b-form-select v-model="default_account" id="category-default_account">
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
			type: "",
			default_account: null,
			default_amount: "0"
		};
	},
	methods: {
		async save() {
			try {
				let amount = this.default_amount;
				if (this.default_amount.includes("$"))
					amount = this.default_amount.replace("$", "");

				const testes = /^\d*[0-9](|.\d*[0-9]|,\d*[0-9])?$/.test(amount);
				if ((amount && parseInt(amount) === NaN) || !testes)
					return swal.fire("you must enter a valid number");
				if (!this.name || !this.type)
					return swal.fire("please fill out all required fields");

				let default_amount = parseFloat(amount) * 100;
				if (amount.includes(".")) {
					default_amount = parseFloat(amount).toFixed(2) * 100;
				}

				const category_data = {
               default_amount,
					name: this.name,
					description: this.description,
					type: this.type,
					default_account: this.default_account
				};

				await this.$store.dispatch("newCategory", category_data);
				this.$store.dispatch("getCategories");
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
			this.type = "";
			this.default_account = null;
			this.default_amount = 0;
		}
	}
};
</script>

<style>
</style>
