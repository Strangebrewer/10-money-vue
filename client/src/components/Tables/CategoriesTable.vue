<template>
	<b-table :items="categories" :fields="fields">
		<template slot="actions" slot-scope="row">
			<i
				class="fas fa-edit mr-1 pointer text-sm text-primary"
				@click="setCategory(row.item)"
				v-b-modal.category-edit
			></i>
		</template>
		<template slot="name" slot-scope="row">
			{{ row.value }}
		</template>
		<template slot="thirty_total" slot-scope="row">
			<b-badge>{{ moneyFormat(row.value) }}</b-badge>
		</template>
		<template slot="month_total" slot-scope="row">
			<b-badge>{{ moneyFormat(row.value) }}</b-badge>
		</template>
      <category-edit-modal
         v-if="modal_category.name"
			:category="modal_category"
			id="category-edit"
		/>
	</b-table>
</template>

<script>
import CategoryEditModal from '../Modals/CategoryEdit';
import formatMoney from '../../lib/formatMoney';

export default {
   components: {
      CategoryEditModal
   },
	data() {
		return {
			fields: [
				{ key: "actions", label: "Edit" },
				{ key: "name", label: "Category" },
				{ key: "thirty_total", label: "30-Day Total" },
				{ key: "month_total", label: "Total This Month" }
			],
			modal_category: {}
		};
	},
	props: ["categories", "setCategory"],
	methods: {
		setCategory(category) {
         console.log('category:::', category);
         this.modal_category = { ...category };
         console.log('this.modal_category:::', this.modal_category);
      },
      moneyFormat(amount) {
         return formatMoney(amount);
      }
	}
};
</script>

<style>
</style>
