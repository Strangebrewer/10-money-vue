<template>
	<b-modal :id="id" ref="category-edit" :title="`${modalCategory.name} Settings`">
		<label for="category-name" class="mb-0">Name:</label>
		<b-form-input id="category-name" v-model="modalCategory.name"></b-form-input>

		<label for="category-description" class="mt-3 mb-0">Description:</label>
		<b-form-input id="category-description" v-model="modalCategory.description"></b-form-input>

		<label for="default-account" class="mt-3 mb-0">Default Source Account:</label>
		<b-form-select v-model="modalCategory.default_account" id="default-account">
			<option :value="null">none</option>
			<option :value="account._id" v-for="account of accounts" :key="account._id">{{ account.name }}</option>
		</b-form-select>

		<label for="destination" class="mt-3 mb-0">Default Destination Account (optional):</label>
		<b-form-select v-model="modalCategory.destination" id="destination">
			<option :value="null">none</option>
			<option :value="account._id" v-for="account of accounts" :key="account._id">{{ account.name }}</option>
		</b-form-select>

		<label for="default_amount" class="mt-3 mb-0">Default Amount (optional):</label>
		<b-form-input id="default_amount" v-model="modalCategory.default_amount"></b-form-input>

		<label for="category-type" class="mt-3 mb-0">Type:</label>
		<b-form-select v-model="modalCategory.type" id="category-type">
			<option value="income">Income</option>
			<option value="expense">Expense</option>
		</b-form-select>

		<template slot="modal-footer">
			<b-button @click="$bvModal.hide(id)">Cancel</b-button>
			<b-button @click="saveCategory">Submit</b-button>
		</template>
	</b-modal>
</template>

<script>
import swal from "sweetalert2";

export default {
	props: ["category", "accounts", "id"],
	computed: {
		modalCategory() {
			return {
				...this.category,
				default_amount: `$${this.category.default_amount ? parseFloat(this.category.default_amount).toFixed(
					2
				) / 100 : 0.00}`
			};
		}
	},
	methods: {
		async saveCategory() {
			const given_amount = this.modalCategory.default_amount;
			let amount_string = this.modalCategory.default_amount;
			if (given_amount) {
				if (given_amount.includes("$"))
					amount_string = given_amount.replace("$", "");

				if (
					(given_amount && parseInt(amount_string) === NaN) ||
					!/^\d*[0-9](|.\d*[0-9]|,\d*[0-9])?$/.test(amount_string)
				) {
					return swal.fire("you must enter a valid number");
				}
			}

			const {
				_id,
				default_account,
				description,
				destination,
				name,
				type
			} = this.modalCategory;

			if (type === "income" && !destination) {
				return swal.fire(
					"Income categories must have a corresponding destination account.",
					null,
					"warning"
				);
			}

			let default_amount = parseFloat(this.modalCategory.default_amount) * 100;
			if (typeof given_amount === "string" && given_amount.includes(".")) {
				default_amount = parseFloat(amount_string).toFixed(2) * 100;
			}

			const category_data = {
				_id,
				default_account,
				default_amount,
				description,
				destination,
				name,
				type
			};

         await this.$store.dispatch("updateCategory", category_data);
         swal.fire('Category has been updated!', null, "success");
			this.$store.dispatch("getCategories");
			this.$refs[this.id].hide();
		}
	}
};
</script>

<style>
</style>
