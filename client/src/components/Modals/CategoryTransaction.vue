<template>
	<b-modal :id="id" :ref="id" :title="`New Transaction for ${category.name}`">
		<label for="account" class="mb-0">Account:</label>
		<b-form-select v-model="modal_account" id="account">
			<option v-for="account of accounts" :key="account._id" :value="account._id">{{ account.name }}</option>
		</b-form-select>

		<label for="account" class="mb-0">Category:</label>
		<b-form-select v-model="modal_account" id="account">
			<option v-for="category of categories" :key="category._id" :value="category._id">{{ category.name }}</option>
		</b-form-select>

		<!-- <label for="account-description" class="mt-3 mb-0">Description:</label>
		<b-form-input id="account-description" v-model="modalAccount.description"></b-form-input>

		<label for="account-type" class="mt-3 mb-0">Type:</label>
		<b-form-select v-model="modalAccount.type" id="account-type">
			<option value="holdings">Holdings</option>
			<option value="debt">Debt</option>
		</b-form-select>-->

		<template slot="modal-footer">
			<b-button @click="$bvModal.hide(id)">Cancel</b-button>
			<b-button @click="createTransaction">Submit</b-button>
		</template>
	</b-modal>
</template>

<script>
export default {
	props: ["id", "category"],
	data() {
		return {
			modal_account: null
		};
	},
	computed: {
		accounts() {
			return this.$store.state.account.all;
		},
		categories() {
			return this.$store.state.category.all;
		},
		monthlies() {
			return this.$store.state.monthly.all;
		}
	},
	methods: {
		createTransaction() {}
	}
};
</script>

<style>
</style>
