<template>
	<b-container fluid class="landing text-center">
		<b-jumbotron :header="msg"></b-jumbotron>
		<b-row v-if="loggedIn" align-h="center">
			<b-col cols="12" sm="10" md="8" lg="6">
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

			<b-col cols="12" sm="10" md="8" lg="6">
				<b-card title="Spending Categories" class="shadow border-primary text-left my-3">
					<b-list-group>
						<b-list-group-item v-for="category in categories" :key="category._id" class="p-2 m-1">
                            <i
								class="fas fa-edit mr-1 pointer text-sm text-primary"
								v-b-modal.category-edit
								@click="setCategory(category)"
							></i>
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

         <b-col cols="12" sm="10" md="8" lg="6">
				<b-card title="Monthly Bills" class="shadow border-primary text-left my-3">
					<b-list-group>
						<b-list-group-item v-for="monthly in monthlies" :key="monthly._id" class="p-2 m-1">
							<i
								class="fas fa-edit mr-1 pointer text-sm text-primary"
								v-b-modal.bill-settings
								@click="setMonthly(monthly)"
							></i>
							<span v-b-tooltip.hover :title="monthly.desc" class="font-weight-bold">{{ monthly.name }}</span>
							<span
								class="float-right width-75 font-weight-bold text-right"
							>{{ moneyFormat(monthly.this_month.length ? moneyReduce(monthly.this_month) : monthly.amount) }}</span>
							<span
								@click="!monthly.this_month.length && $bvModal.show('bill-pay')"
								class="width-60 mr-2 text-info text-sm font-weight-bold"
							> - {{ `Due ${monthly.due_date}` }}</span>
                     <span
                        v-if="!monthly.this_month.length"
                        class="mr-2 pointer float-right pb-1 text-sm font-italic font-weight-bold text-primary"
                        variant="warning"
                        @click="quikPay(monthly)"
							>quikpay</span>
                     <span
                        v-if="monthly.this_month.length"
                        class="mr-2 float-right text-sm font-italic font-weight-bold text-success"
							>paid <i class="fas fa-check-circle" /></span>
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

        <category-edit-modal
			v-if="modal_category.name"
			:category="modal_category"
			:accounts="accounts"
            id="category-edit"
        />

		<monthly-edit-modal
			v-if="modal_monthly.name"
			:monthly="modal_monthly"
			:accounts="accounts"
			:id="`monthly-edit`"
		/>
	</b-container>
</template>

<script>
import Login from "../components/Forms/Login";
import MonthlyEditModal from "../components/Modals/MonthlyEdit";
import CategoryEditModal from "../components/Modals/CategoryEdit";
import formatMoney from "../lib/formatMoney";
import swal from "sweetalert2";

export default {
	components: {
		Login,
        MonthlyEditModal,
        CategoryEditModal
	},

	data() {
		return {
            selected: null,
            modal_category: {

            },
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
			return this.$store.state.category.all;
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
      },
      async quikPay(monthly) {
         swal.fire({
            title: `Paying ${monthly.name}`,
            text: '',
            input: 'text',
            inputValue: formatMoney(monthly.amount),
            showCancelButton: true,
            allowOutsideClick: true,    
         });
      },
      setCategory(category) {
          this.modal_category = { ...category };
      }
	},

	mounted() {
		console.log("this.$store.state:::", this.$store.state);
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
