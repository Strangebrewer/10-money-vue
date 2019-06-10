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
export default {
	props: ["account", "id"],
	computed: {
		modalAccount() {
			return { ...this.account };
		}
	},
	methods: {
		async saveAccount() {
			const { name, type, description } = this.modalAccount;
			const account_data = {
				_id: this.modalAccount._id,
				account_update: { name, type, description }
			};
         await this.$store.dispatch('updateAccount', account_data);
         this.$store.dispatch('getAccounts');
			this.$refs[this.id].hide();
		}
	}
};
</script>

<style>
</style>
