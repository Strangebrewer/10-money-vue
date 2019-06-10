<template>
	<b-card
		:title="`Monthly Bills - ${formatMonth(new Date())}`"
		class="shadow border-primary text-left my-3"
	>
		<b-list-group>
			<b-list-group-item v-for="monthly in monthlies" :key="monthly._id" class="p-2 m-1">
				<i
					class="fas fa-edit mr-1 ml-1 pointer text-md text-primary"
					v-b-modal.monthly-edit
					@click="setMonthly(monthly)"
					v-b-tooltip.hover
					title="Edit this bill"
				/>
				<i
					class="fas fa-usd-square mr-3 pointer text-md text-success"
					v-b-modal.monthly-edit
					@click="setMonthly(monthly)"
					v-b-tooltip.hover
					title="Pay with other than default settings"
				/>
				<span v-b-tooltip.hover :title="monthly.description" class="font-weight-bold">{{ monthly.name }}</span>
				<span
					class="float-right width-75 font-weight-bold text-right"
				>{{ moneyFormat(monthly.this_month.length ? moneyReduce(monthly.this_month) : 0) }}</span>
				<span
					class="width-60 mr-2 text-info text-sm font-weight-bold"
				>- {{ `${formatDueDate(new Date())} ${monthly.due_date}` }}</span>
				<span
					v-if="!monthly.this_month.length && monthly.default_account"
					class="mr-2 pointer float-right pb-1 text-sm font-italic font-weight-bold text-primary"
					v-b-tooltip.hover
					title="Pay with default settings"
					@click="quikPay(monthly)"
				>quikpay</span>
				<span
					v-if="!monthly.this_month.length && !monthly.default_account"
					class="mr-2 float-right pb-1 text-sm font-italic font-weight-bold text-secondary"
					v-b-tooltip.hover
					title="you must set a default account to use quikpay"
				>quikpay</span>
				<span
					v-if="monthly.this_month.length"
					class="mr-2 float-right text-sm font-italic font-weight-bold text-success"
				>
					paid
					<i class="fas fa-check-circle"/>
				</span>
			</b-list-group-item>
		</b-list-group>
		<monthly-edit-modal
			v-if="modal_monthly.name"
			:monthly="modal_monthly"
			:accounts="accounts"
			id="monthly-edit"
		/>
	</b-card>
</template>

<script>
import MonthlyEditModal from "../Modals/MonthlyEdit";
import formatMoney from "../../lib/formatMoney";
import swal from "sweetalert2";
import dateFns from "date-fns";

export default {
	components: {
		MonthlyEditModal
	},
	data() {
		return {
			modal_monthly: {}
		};
	},
	props: ["monthlies", "accounts"],
	methods: {
		moneyFormat(number) {
			return formatMoney(number);
		},
		moneyReduce(array) {
			return array.reduce((total, item) => total + item.amount, 0);
		},
		formatMonth(date) {
			return dateFns.format(date, "MMM YYYY");
		},
		formatDueDate(date) {
			return dateFns.format(date, "MMM");
		},
		setMonthly(monthly) {
			this.modal_monthly = { ...monthly };
		},
		async quikPay(monthly) {
			this.setMonthly(monthly);
			const swal_options = {
				title: `Paying ${monthly.name}`,
				text: "To use defaults, just click OK",
				showCancelButton: true,
				allowOutsideClick: true
			};
			if (!monthly.amount) {
				(swal_options.text = "Enter an amount"), (swal_options.input = "text");
			}
			swal.fire(swal_options).then(async ({ value }) => {
				if (value) {
					if (isNaN(parseFloat(value)) && !monthly.amount) {
						swal.fire("Please enter a valid number");
					}
					let amount = parseFloat(value) * 100;
					if (typeof value === "string" && value.includes(".")) {
						amount = parseFloat(value).toFixed(2) * 100;
					}
					const transaction_data = {
						account: monthly.default_account,
						monthly: monthly._id,
						description: monthly.description,
						amount: monthly.amount || amount
					};
					await this.$store.dispatch("postTransaction", transaction_data);
					this.$store.dispatch("getMonthlies");
					this.$store.dispatch("getAccounts");
				} else {
					swal.fire("Please enter a valid number");
				}
			});
		}
	}
};
</script>

<style>
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
