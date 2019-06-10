<template>
	<b-card title="Accounts" class="shadow border-primary text-left my-3">
		<b-list-group>
			<b-list-group-item
				v-for="account in accounts"
				:key="account._id"
				class="p-2 m-1"
			>
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
					v-b-modal.account-edit
					v-b-tooltip.hover
					title="Record a new transaction for this account"
				/>
				<span v-b-tooltip.hover :title="account.description">{{ account.name }}</span>
				<span class="font-weight-bold float-right">{{ moneyFormat(account.balance) }}</span>
			</b-list-group-item>
		</b-list-group>
		<account-edit-modal v-if="modal_account.name" :account="modal_account" id="account-edit"/>
	</b-card>
</template>

<script>
import AccountEditModal from "../Modals/AccountEdit";
import formatMoney from "../../lib/formatMoney";

export default {
   components: {
      AccountEditModal
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

<style>
.pointer {
	cursor: pointer;
}
</style>
