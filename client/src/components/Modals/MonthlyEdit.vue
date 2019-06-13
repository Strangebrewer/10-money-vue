<template>
	<b-modal :id="id" ref="monthly-edit" :title="`${modalMonthly.name} Settings`">
		<label for="monthly-name" class="mb-0">Name:</label>
		<b-form-input id="monthly-name" v-model="modalMonthly.name"></b-form-input>

		<label for="monthly-description" class="mt-3 mb-0">Description:</label>
		<b-form-input id="monthly-description" v-model="modalMonthly.description"></b-form-input>

		<label for="monthly-amount" class="mt-3 mb-0">Recurring Amount:</label>
		<b-form-input id="monthly-amount" v-model="modalMonthly.amount"></b-form-input>

		<label for="monthly-due-date" class="mt-3 mb-0">Due Date:</label>
		<b-form-input id="monthly-due-date" v-model="modalMonthly.due_date"></b-form-input>

		<label for="default-account" class="mt-3 mb-0">Default Source Account:</label>
		<b-form-select v-model="modalMonthly.default_account" id="default-account">
			<option :value="null">none</option>
			<option :value="account._id" v-for="account of accounts" :key="account._id">{{ account.name }}</option>
		</b-form-select>

		<label for="destination" class="mt-3 mb-0">Default Destination Account (optional):</label>
		<b-form-select v-model="modalMonthly.destination" id="destination">
			<option :value="null">none</option>
			<option :value="account._id" v-for="account of accounts" :key="account._id">{{ account.name }}</option>
		</b-form-select>

		<template slot="modal-footer">
			<b-button @click="$bvModal.hide('monthly-edit')">Cancel</b-button>
			<b-button @click="saveMonthly">Submit</b-button>
		</template>
	</b-modal>
</template>

<script>
import formatMoney from "../../lib/formatMoney";

export default {
	props: ["monthly", "accounts", "id"],
	computed: {
		modalMonthly() {
			return { ...this.monthly };
		}
	},
	methods: {
		async saveMonthly() {
			await this.$store.dispatch("updateMonthly", this.modalMonthly);
			this.$store.dispatch("getMonthlies");
			this.$refs["monthly-edit"].hide();
		}
	}
};
</script>

<style>
</style>
