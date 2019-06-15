<template>
	<b-card title="Accounts" class="shadow border-primary text-left my-3 position-relative">
		<i
			class="fas fa-plus-circle position-absolute text-info"
			v-b-modal.create-account
			v-b-tooltip.hover
			title="Add a new account"
		/>
		<b-list-group>
			<b-list-group-item v-for="account in accounts" :key="account._id" class="p-2 m-1">
				<i
					class="fas fa-edit mr-1 ml-1 pointer text-md text-primary"
					v-b-modal.account-edit
					@click="setAccount(account)"
					v-b-tooltip.hover
					title="Edit account information"
				/>

				<i
					class="fas fa-usd-square mr-3 pointer text-md text-success"
					@click="setAccount(account)"
					v-b-modal.account-transaction
					v-b-tooltip.hover
					title="Record a new transaction for this account"
				/>

				<span v-b-tooltip.hover :title="account.description">{{ account.name }}</span>

				<span class="font-weight-bold float-right">{{ moneyFormat(account.balance) }}</span>
			</b-list-group-item>
		</b-list-group>
		<account-edit-modal v-if="modal_account.name" :account="modal_account" id="account-edit"/>
		<account-transaction-modal :account="modal_account" id="account-transaction"/>
		<new-account-modal id="create-account"/>
	</b-card>
</template>

<script>
import AccountEditModal from "../Modals/AccountEdit";
import AccountTransactionModal from "../Modals/AccountTransaction";
import NewAccountModal from "../Modals/NewAccount";
import formatMoney from "../../lib/formatMoney";

export default {
	components: {
		AccountEditModal,
		AccountTransactionModal,
		NewAccountModal
	},
	data() {
		return {
			modal_account: {}
		};
	},
	props: ["accounts"],
	methods: {
		moneyFormat(number) {
			return formatMoney(number);
		},
		setAccount(account) {
			this.modal_account = { ...account };
		}
	}
};
</script>

<style scoped>
.position-absolute {
	top: 20px;
	right: 20px;
	font-size: 24px;
	cursor: pointer;
}
</style>
