<template>
	<b-modal :id="id" ref="create-account" title="Create New Account">
		<label for="account-name" class="mb-1">Name*</label>
		<b-form-input id="account-name" v-model="name"></b-form-input>

		<label for="account-balance" class="mt-3 mb-1">Balance*</label>
		<b-form-input id="account-balance" v-model="balance"></b-form-input>

		<label for="account-description" class="mt-3 mb-1">Description</label>
		<b-form-input id="account-description" v-model="description"></b-form-input>

		<label for="account-type" class="mt-3 mb-1">Type*</label>
		<b-form-select v-model="type" id="account-type">
			<option value="holdings">Holdings</option>
			<option value="debt">Debt</option>
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
	data() {
		return {
			name: "",
			description: "",
			balance: "0",
			type: ""
		};
	},
	methods: {
		async save() {
			try {
				let balance = this.balance;
				if (this.balance.includes("$")) balance = this.balance.replace("$", "");

				const testes = /^\d*[0-9](|.\d*[0-9]|,\d*[0-9])?$/.test(balance);
				if ((balance && parseInt(balance) === NaN) || !testes)
					return swal.fire("balance entered must be a valid number");
				if (!this.name || !this.balance || !this.type)
					return swal.fire("please fill out all required fields");

				let parsed_balance = parseFloat(balance) * 100;
				if (balance.includes("."))
					parsed_balance = parseFloat(balance).toFixed(2) * 100;

				const account_data = {
					name: this.name,
					description: this.description,
					balance: parsed_balance,
					type: this.type
				};

				await this.$store.dispatch("newAccount", account_data);
            this.$store.dispatch("getAccounts");
            
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
			this.balance = 0;
			this.type = "";
		}
	}
};
</script>

<style>
</style>
