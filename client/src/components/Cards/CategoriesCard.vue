<template>
	<b-card
		:title="`Categories - ${formatMonth(new Date())}`"
		class="shadow border-primary text-left my-3"
	>
		<b-list-group>
			<b-list-group-item v-for="category in categories" :key="category._id" class="p-2 m-1">
				<i
					class="fas fa-edit mr-1 ml-1 pointer text-md text-primary"
					@click="setCategory(category)"
					v-b-modal.category-edit
					v-b-tooltip.hover
					title="Edit this category"
				/>

				<i
					class="fas fa-usd-square mr-3 pointer text-md text-success"
					@click="setCategory(category)"
					v-b-modal.category-transaction
					v-b-tooltip.hover
					title="Record a new transaction in this category"
				/>

				<span v-b-tooltip.hover :title="category.description">{{ category.name }}</span>

				<span
					class="float-right width-75 font-weight-bold text-right"
					v-b-tooltip.hover
					:title="`Rolling 30-Day total: ${moneyFormat(category.thirty_days.length ? moneyReduce(category.thirty_days) : 0)}`"
				>{{ moneyFormat(category.this_month.length ? moneyReduce(category.this_month) : 0) }}</span>

				<span
					v-if="!category.default_account"
					class="mr-2 float-right pb-1 text-sm font-italic font-weight-bold text-secondary"
					v-b-tooltip.hover
					title="you must set a default account to use quikpay"
				>quikpay</span>

				<span
					v-if="category.default_account"
					class="mr-2 pointer float-right pb-1 text-sm font-italic font-weight-bold text-primary"
					v-b-tooltip.hover
					title="Create transaction with default settings"
					@click="quikPay(category)"
				>quikpay</span>
			</b-list-group-item>
		</b-list-group>

		<category-edit-modal
			v-if="modal_category.name"
			:accounts="accounts"
			:category="modal_category"
			id="category-edit"
		/>

		<category-transaction-modal id="category-transaction" :category="modal_category"/>
	</b-card>
</template>

<script>
import CategoryEditModal from "../Modals/CategoryEdit";
import CategoryTransactionModal from "../Modals/CategoryTransaction";
import formatMoney from "../../lib/formatMoney";
import swal from "sweetalert2";
import dateFns from "date-fns";

export default {
	components: {
		CategoryEditModal,
		CategoryTransactionModal
	},
	data() {
		return {
			modal_category: {}
		};
	},
	props: ["categories", "accounts"],
	methods: {
		setCategory(category) {
			this.modal_category = { ...category };
		},
		moneyFormat(amount) {
			return formatMoney(amount);
		},
		moneyReduce(array) {
			return array.reduce((total, item) => total + item.amount, 0);
		},
		formatMonth(date) {
			return dateFns.format(date, "MMM YYYY");
		},
		async quikPay(category) {
			this.setCategory(category);
			const swal_options = {
				title: `Transaction in ${category.name}`,
				text: "Quikpay date always defaults to the present day.",
				showCancelButton: true,
				allowOutsideClick: true,
				input: "text",
				inputValue: category.default_amount
					? `$${parseFloat(category.default_amount).toFixed(2) / 100}`
					: ""
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
				const transaction_data = {
					amount,
					account: category.default_account,
               category: category._id,
					description: category.description,
					type: category.type === "income" ? "payment" : "expense"
				};
				await this.$store.dispatch("postTransaction", transaction_data);
            await this.$store.dispatch("getCategories");
            swal.fire({
               title: 'transaction recorded',
               toast: true,
               type: 'success',
               position: 'top',
               timer: 1500
            });
				this.$store.dispatch("getAccounts");
			});
		}
	}
};
</script>

<style>
.width-75 {
	min-width: 75px;
}
.pointer {
	cursor: pointer;
}
</style>
