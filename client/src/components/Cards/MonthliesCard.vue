<template>
	<b-card
		:title="`Monthly Bills - ${formatMonth(new Date())}`"
		class="shadow border-primary text-left my-3"
	>
		<b-list-group>
			<b-list-group-item v-for="monthly in monthlies" :key="monthly._id" class="p-2 m-1">
				<i
					class="fas fa-edit mr-3 ml-1 pointer text-md text-primary"
					v-b-modal.monthly-edit
					@click="setMonthly(monthly)"
					v-b-tooltip.hover
					title="Edit this bill"
				/>
				<span v-b-tooltip.hover :title="monthly.description" class="font-weight-bold">{{ monthly.name }}</span>
				<span
					class="float-right width-75 font-weight-bold text-right"
				>{{ moneyFormat(monthly.this_month.length ? moneyReduce(monthly.this_month) : monthly.amount) }}</span>
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
				allowOutsideClick: true,
				input: "text",
				inputValue: `$${parseFloat(monthly.amount).toFixed(2) / 100}`
			};

			swal.fire(swal_options).then(async ({ value }) => {
				let number_string = value;
				if (value.includes("$")) number_string = value.replace("$", "");
				if (
					(value && parseInt(number_string) === NaN) ||
					!/^\d*[0-9](|.\d*[0-9]|,\d*[0-9])?$/.test(number_string)
				) {
					return swal.fire("you must enter a valid number");
				}

				if (value) {
					if (isNaN(parseFloat(number_string)) && !monthly.amount) {
						swal.fire("Please enter a valid number");
					}
					let amount = parseFloat(number_string) * 100;
					if (typeof value === "string" && value.includes(".")) {
						amount = parseFloat(number_string).toFixed(2) * 100;
					}
					let next_transaction_data;
					if (monthly.destination) {
						next_transaction_data = {
							amount,
							account: monthly.destination,
							source: monthly.default_account,
							type: "payment"
						};
					}
					const transaction_data = {
						amount,
						account: monthly.default_account,
						monthly: monthly._id,
						description: monthly.description,
						destination: monthly.destination
					};
					await this.$store.dispatch("postTransaction", transaction_data);
					if (next_transaction_data) {
						await this.$store.dispatch(
							"postTransaction",
							next_transaction_data
						);
					}
					this.$store.dispatch("getMonthlies");
					this.$store.dispatch("getAccounts");
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
