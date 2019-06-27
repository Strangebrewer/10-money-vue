<template>
	<b-card class="shadow border-primary text-left my-3 position-relative">
		<b-card-title class="pointer" v-b-toggle.monthly-collapse @click="toggleShow">
			<i :class="`fas fa-caret-${show ? 'down' : 'right'} text-lg text-secondary`"/>
			<span class="position-absolute title-text">{{`Monthly Bills - ${formatMonth(new Date())}`}}</span>
		</b-card-title>
		<i
			class="fas fa-plus-circle position-absolute text-info"
			v-b-modal.create-monthly
			v-b-tooltip.hover
			title="Add a new monthly bill"
		/>

		<b-collapse id="monthly-collapse">
			<b-list-group>
				<b-list-group-item v-for="monthly in monthlies" :key="monthly._id" class="p-2 m-1">
					<i
						class="fas fa-edit mr-3 ml-1 pointer text-md text-primary"
						v-b-modal.monthly-edit
						@click="setMonthly(monthly)"
						v-b-tooltip.hover
						title="Edit this bill"
					/>

					<span
						v-b-tooltip.hover
						:title="monthly.description"
						class="font-weight-bold"
					>{{ monthly.name }}</span>

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
						title="you must set a default source account to use quikpay"
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
		</b-collapse>

		<monthly-edit-modal
			v-if="modal_monthly.name"
			:monthly="modal_monthly"
			:accounts="accounts"
			id="monthly-edit"
		/>
		<new-monthly-modal id="create-monthly"/>
	</b-card>
</template>

<script>
import MonthlyEditModal from "../Modals/MonthlyEdit";
import NewMonthlyModal from "../Modals/NewMonthly";
import formatMoney from "../../utils/formatMoney";
import swal from "sweetalert2";
import dateFns from "date-fns";

export default {
	components: {
		MonthlyEditModal,
		NewMonthlyModal
	},
	data() {
		return {
			modal_monthly: {},
			show: false
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
		formatTransactionDate(day) {
			const date = new Date();
			return `${dateFns.format(date, "MMM")} ${day}, ${dateFns.format(
				date,
				"YYYY"
			)}`;
		},
		toggleShow() {
			this.show = !this.show;
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
				if (!value) return;
				let number_string = value;

				if (value.includes("$")) number_string = value.replace("$", "");
				const testes = /^\d*[0-9](|.\d*[0-9]|,\d*[0-9])?$/.test(number_string);
				if ((value && parseInt(number_string) === NaN) || !testes) {
					return swal.fire("you must enter a valid number");
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
						date: this.formatTransactionDate(monthly.due_date),
						source: monthly.default_account,
						type: "payment"
					};
				}
				const transaction_data = {
					amount,
					account: monthly.default_account,
					date: this.formatTransactionDate(monthly.due_date),
					monthly: monthly._id,
					description: monthly.description,
					destination: monthly.destination
				};
				await this.$store.dispatch("postTransaction", transaction_data);
				if (next_transaction_data) {
					await this.$store.dispatch("postTransaction", next_transaction_data);
				}
				await this.$store.dispatch("getMonthlies");
				swal.fire({
					title: "transaction recorded",
					toast: true,
					type: "success",
					position: "top",
					timer: 1500
				});
				this.$store.dispatch("getAccounts");
			});
		}
	}
};
</script>

<style scoped>
.title-text {
	left: 40px;
}
</style>
