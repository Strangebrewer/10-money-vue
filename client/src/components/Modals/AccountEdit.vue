<template>
	<b-modal :id="id" ref="account-edit" :title="`${modalAccount.name} Settings`">
		<label for="account-name" class="mb-0">Name:</label>
		<b-form-input id="account-name" v-model="modalAccount.name"></b-form-input>

		<label for="account-description" class="mt-3 mb-0">Description:</label>
		<b-form-input id="account-description" v-model="modalAccount.description"></b-form-input>

		<label for="account-type" class="mt-3 mb-0">Type:</label>
		<b-form-select v-model="modalAccount.type" id="account-type">
			<option value="holdings">Holdings</option>
			<option value="debt">Debt</option>
		</b-form-select>

		<template slot="modal-footer">
			<b-button @click="$bvModal.hide(id)">Cancel</b-button>
			<b-button @click="saveAccount">Submit</b-button>
		</template>
	</b-modal>
</template>

<script>
import swal from "sweetalert2";

export default {
	props: ["account", "id"],
	computed: {
		modalAccount() {
			const { _id, name, description, type } = this.account;
			return { _id, name, description, type };
		}
	},
	methods: {
		async saveAccount() {
			const { _id, name, description, type } = this.modalAccount;
			const account_data = { _id, account_update: { name, type, description } };
			await this.$store.dispatch("updateAccount", account_data);
			this.$refs[this.id].hide();
         swal.fire({
            title: 'Account has been updated!',
            type: 'success',
            scrollbarPadding: false
         });
			this.$store.dispatch("getAccounts");
		}
	}
};
</script>

<style>
</style>
