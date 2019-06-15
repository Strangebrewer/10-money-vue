<template>
	<b-modal :id="id" ref="monthly-edit" :title="`${modalMonthly.name} Settings`">
		<label for="monthly-name" class="mb-0">Name*</label>
		<b-form-input id="monthly-name" v-model="modalMonthly.name"></b-form-input>

		<label for="monthly-amount" class="mt-3 mb-0">Recurring Amount*</label>
		<b-form-input id="monthly-amount" v-model="modalMonthly.amount"></b-form-input>

		<label for="monthly-due-date" class="mt-3 mb-0">Due Date*</label>
		<b-form-input id="monthly-due-date" v-model="modalMonthly.due_date"></b-form-input>

		<label for="monthly-description" class="mt-3 mb-0">Description</label>
		<b-form-input id="monthly-description" v-model="modalMonthly.description"></b-form-input>

		<label for="default-account" class="mt-3 mb-0">Default Source Account</label>
		<b-form-select v-model="modalMonthly.default_account" id="default-account">
			<option :value="null">none</option>
			<option :value="account._id" v-for="account of accounts" :key="account._id">{{ account.name }}</option>
		</b-form-select>

		<label for="destination" class="mt-3 mb-0">Default Destination Account</label>
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
import swal from "sweetalert2";

export default {
	props: ["monthly", "accounts", "id"],
	computed: {
		modalMonthly() {
			const {
				name,
				description,
				amount,
				due_date,
				default_account,
				destination
			} = this.monthly;

			return {
				name,
				description,
				amount: `$${amount ? parseFloat(amount).toFixed(2) / 100 : 0.0}`,
				due_date,
				default_account,
				destination
			};
		}
	},
	methods: {
		async saveMonthly() {
			try {
				let amount = this.modalMonthly.amount;
				const { name, due_date } = this.modalMonthly;
				if (amount.includes("$"))
					amount = this.modalMonthly.amount.replace("$", "");

				const testes = /^\d*[0-9](|.\d*[0-9]|,\d*[0-9])?$/.test(amount);
				if ((amount && parseInt(amount) === NaN) || !testes)
					return swal.fire("you must enter a valid number");
				if (!name || !this.modalMonthly.amount || !due_date)
					return swal.fire("you must fill out all required fields");

				let parsed_amount = parseFloat(amount) * 100;
				if (amount.includes(".")) {
					parsed_amount = parseFloat(amount).toFixed(2) * 100;
				}

				const monthly_data = {
					_id: this.monthly._id,
					monthly_update: {
						...this.modalMonthly,
						amount: parsed_amount
					}
				};

				await this.$store.dispatch("updateMonthly", monthly_data);
				this.$refs[this.id].hide();
				swal.fire({
					title: "Monthly Bill has been updated!",
					type: "success",
					scrollbarPadding: false
				});
				this.$store.dispatch("getMonthlies");
			} catch (e) {
				console.log("e:::", e.response);
			}
		}
	}
};
</script>

<style>
</style>
