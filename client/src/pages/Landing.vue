<template>
	<b-container fluid class="landing text-center">
		<b-jumbotron :header="msg"></b-jumbotron>
		<b-row v-if="loggedIn" align-h="center">
			<b-col cols="12" sm="10" md="8" lg="6" xl="4">
				<b-card title="Accounts" class="shadow border-primary text-left my-3">
					<b-list-group>
						<b-list-group-item
							v-for="account in accounts"
							:key="account._id"
							class="d-flex justify-content-between align-items-center p-2 m-1"
						>
							{{ account.name }}
							<span class="font-weight-bold">{{ moneyFormat(account.balance) }}</span>
						</b-list-group-item>
					</b-list-group>
				</b-card>
			</b-col>

			<b-col cols="12" sm="10" md="8" lg="6" xl="4">
				<b-card title="Spending Categories" class="shadow border-primary text-left my-3">
					<b-list-group>
						<b-list-group-item v-for="category in categories" :key="category._id" class="p-2 m-1">
							{{ category.name }}
							<b-badge
								variant="success"
								class="float-right width-75 mt-1"
							>{{ moneyFormat(category.thirty_total) }}</b-badge>
							<b-badge
								variant="primary"
								class="float-right width-60 mr-2 mt-1"
							>{{ moneyFormat(category.month_total) }}</b-badge>
						</b-list-group-item>
					</b-list-group>
				</b-card>
			</b-col>

			<b-col cols="12" sm="10" md="8" lg="6" xl="4">
				<b-card title="Monthly Bills" class="shadow border-primary text-left my-3">
					<b-list-group>
						<b-list-group-item v-for="monthly in monthlies" :key="monthly._id" class="p-2 m-1">
							<i
								class="far fa-edit mr-1 pointer text-sm"
								v-b-modal.bill-settings
								@click="setMonthly(monthly)"
							></i>
							<span v-b-tooltip.hover :title="monthly.desc">{{ monthly.name }}</span>
							<b-badge
								class="float-right width-75 mt-1 font-weight-bold"
							>{{ moneyFormat(monthly.this_month.length ? moneyReduce(monthly.this_month) : monthly.amount) }}</b-badge>
							<b-badge
								@click="!monthly.this_month.length && $bvModal.show('bill-pay')"
								:class="`float-right width-60 mr-2 mt-1 ${!monthly.this_month.length && 'pointer'}`"
								:variant="monthly.this_month.length ? 'success' : 'warning'"
							>{{ monthly.this_month.length ? 'Paid' : `Due ${monthly.due_date}` }}</b-badge>
						</b-list-group-item>
					</b-list-group>
				</b-card>
			</b-col>
		</b-row>

		<b-modal id="bill-pay">
			<p>Which Account?</p>
			<b-form-select v-model="selected">
				<option :value="account._id" v-for="account of accounts" :key="account._id">{{ account.name }}</option>
			</b-form-select>
		</b-modal>

		<bill-settings-modal
			v-if="modal_monthly.name"
			:monthly="modal_monthly"
			:accounts="accounts"
			:id="`bill-settings`"
		/>
	</b-container>
</template>

<script>
import Login from "../components/Forms/Login";
import BillSettingsModal from "../components/Modals/BillSettings";
import formatMoney from "../lib/formatMoney";
import swal from "sweetalert2";

export default {
	components: {
		Login,
		BillSettingsModal
	},

	data() {
		return {
			selected: null,
			modal_monthly: {
				name: "",
				description: "",
				amount: "",
				due_date: "",
				default_account: "Please select an account"
			},
			msg: "Landing Page"
		};
	},

	computed: {
		accounts() {
			return this.$store.state.user.currentUser.accounts;
		},
		categories() {
			return this.$store.state.user.currentUser.categories;
		},
		monthlies() {
			return this.$store.state.monthly.all;
		},
		loggedIn() {
			return this.$store.state.user.isUserLoggedIn;
		}
	},

	methods: {
		moneyFormat(number) {
			return formatMoney(number);
		},
		moneyReduce(array) {
			return array.reduce((total, item) => total + item.amount, 0);
		},
		setMonthly(monthly) {
			this.modal_monthly = { ...monthly };
		},
		async saveMonthly() {
			await this.$store.dispatch("updateMonthly", this.modal_monthly);
			this.$store.dispatch("getMonthlies");
			this.$refs["bill-settings"].hide();
		}
	},

	mounted() {
		// console.log("this.$store.state:::", this.$store.state);
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.width-75 {
	min-width: 75px;
}
.width-60 {
	min-width: 60px;
}
.pointer {
	cursor: pointer;
}
</style>
