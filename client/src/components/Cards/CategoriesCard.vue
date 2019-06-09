<template>
	<b-card title="Spending Categories" class="shadow border-primary text-left my-3">
		<b-table :items="categories" :fields="fields" striped outlined>
			<template slot="actions" slot-scope="row">
				<i
					class="fas fa-edit mr-1 ml-2 pointer text-md text-primary"
					@click="setCategory(row.item)"
					v-b-modal.category-edit
					v-b-tooltip.hover
					title="Edit this category"
				/>
				<i
					class="fas fa-usd-square ml-1 mr-2 pointer text-md text-success"
					@click="setCategory(row.item)"
					v-b-modal.category-edit
					v-b-tooltip.hover
					title="Record a new transaction in this category"
				/>
			</template>
			<template slot="name" slot-scope="row">{{ row.value }}</template>
			<template slot="thirty_total" slot-scope="row">
				<span class="float-right width-75">{{ moneyFormat(row.value) }}</span>
			</template>
			<template slot="month_total" slot-scope="row">
				<span class="float-right mr-1 width-75">{{ moneyFormat(row.value) }}</span>
			</template>
		</b-table>
		<category-edit-modal v-if="modal_category.name" :category="modal_category" id="category-edit"/>
	</b-card>
</template>

<script>
import CategoryEditModal from "../Modals/CategoryEdit";
import formatMoney from "../../lib/formatMoney";

export default {
	components: {
		CategoryEditModal
	},
	data() {
		return {
			fields: [
				{ key: "actions", label: "Actions" },
				{ key: "name", label: "Category" },
				{ key: "thirty_total", label: "30-Days", class: "text-right" },
				{ key: "month_total", label: "This Month", class: "text-right" }
			],
			modal_category: {}
		};
	},
	props: ["categories"],
	methods: {
		setCategory(category) {
			this.modal_category = { ...category };
		},
		moneyFormat(amount) {
			return formatMoney(amount);
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
