<template>
	<b-modal :id="id" :ref="id" title="New Monthly Transaction">
		<label for="monthlies" class="mb-0">Bill</label>
		<b-form-select v-model="monthly" id="monthlies">
			<option v-for="month of monthlies" :key="month._id" :value="month">{{ month.name }}</option>
		</b-form-select>

		<label for="transaction-amount" class="mt-3 mb-0">Amount*</label>
		<b-form-input id="transaction-amount" v-model="amount"></b-form-input>

		<label for="account" class="mb-0 mt-3">Account</label>
		<b-form-select v-model="account_id" id="account">
			<option v-for="item of accounts" :key="item._id" :value="item._id">{{ item.name }}</option>
		</b-form-select>

		<label for="month" class="mb-0 mt-3">Month</label>
		<b-form-select v-model="month" id="month">
			<option
				v-for="item of ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']"
				:key="item"
				:value="item"
			>{{ item }}</option>
		</b-form-select>

		<label for="year" class="mt-3 mb-0">Year</label>
		<b-form-input id="year" v-model="year" type="text"></b-form-input>

		<label for="transaction-description" class="mt-3 mb-0">Description</label>
		<b-form-input id="transaction-description" v-model="description"></b-form-input>

		<template slot="modal-footer">
			<b-button @click="closeModal">{{`${count ? 'Close' : 'Cancel'}`}}</b-button>
			<b-button @click="createTransaction">{{`${count ? 'Repeat?' : 'Submit'}`}}</b-button>
		</template>
	</b-modal>
</template>

<script>
import swal from "sweetalert2";
import formatMoney from "../../utils/formatMoney";
import dateFns from 'date-fns';

export default {
	props: ["id"],

	data() {
		return {
			monthly: null,
			month: "",
			description: "",
			account: null,
			account_id: "",
			account_name: "",
			amount: "",
			year: "",
			type: "expense",
			count: 0
		};
	},

	computed: {
		monthlies() {
			return this.$store.state.monthly.all;
		},
		accounts() {
			return this.$store.state.account.all;
		}
	},

	methods: {
		closeModal() {
			this.$refs[this.id].hide();
			this.resetForm();
		},
		moneyFormat(amount) {
			const parsed_amount = parseInt(amount);
			return formatMoney(parsed_amount);
      },
      dateFormat(MMM, DD, YYYY) {
         return dateFns.format(`${MMM} ${DD}, ${YYYY} 09:00:00`)
      },

		async createTransaction() {
			const { account_id, month, year, description, monthly, type } = this;

			let amount = this.amount.replace(/[$,]/g, "");
         const testes = /^\d*[0-9](|.\d*[0-9]|,\d*[0-9])?$/.test(amount);

			if ((amount && parseInt(amount) === NaN) || !testes)
				return swal.fire("you must enter a valid number");
			if (!amount || !monthly || !month || !year)
				return swal.fire("you must fill out all required fields");

			let parsed_amount = parseFloat(amount) * 100;
			if (amount.includes(".")) {
				parsed_amount = parseFloat(amount).toFixed(2) * 100;
         }

         const date = dateFns.format(`${month} ${monthly.due_date}, ${year} 09:00:00`)

			const transaction_data = {
				date,
				description,
				monthly: monthly._id,
				type,
				account: account_id,
				amount: parsed_amount
			};

			await this.$store.dispatch("postTransaction", transaction_data);
			this.$store.dispatch("getAccounts");
			this.$store.dispatch("getCategories");
			this.$store.dispatch("getMonthlies");

			this.count++;
			swal.fire({
				title: "transaction recorded",
				toast: true,
				type: "success",
				position: "top",
				timer: 1500
			});
		},

		resetForm() {
			this.category = null;
			this.monthly = null;
			this.description = "";
			this.amount = "";
			this.account = null;
			this.date = "";
			this.type = "expense";
			this.count = 0;
		}
	},

	watch: {
		monthly: function() {
			this.account = this.accounts.filter(
				account => account._id === this.monthly.default_account
			);
			this.account_id = this.account[0]._id;
			this.amount = this.moneyFormat(this.monthly.amount);
		}
	}
};
</script>

<style>
</style>
