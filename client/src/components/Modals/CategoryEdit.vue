<template>
	<b-modal :id="id" ref="category-edit" :title="`${modalCategory.name} Settings`">
		<label for="category-name" class="mb-0">Name:</label>
		<b-form-input id="category-name" v-model="modalCategory.name"></b-form-input>

		<label for="category-description" class="mt-3 mb-0">Description:</label>
		<b-form-input id="category-description" v-model="modalCategory.description"></b-form-input>

		<label for="category-type" class="mt-3 mb-0">Type:</label>
		<b-form-select v-model="modalCategory.type" id="category-type">
			<option value="income">Income</option>
			<option value="expense">Expense</option>
		</b-form-select>

		<template slot="modal-footer">
			<b-button @click="$bvModal.hide('category-edit')">Cancel</b-button>
			<b-button @click="saveCategory">Submit</b-button>
		</template>
	</b-modal>
</template>

<script>
export default {
	props: ["category", "id"],
	computed: {
		modalCategory() {
			return { ...this.category };
		}
	},
	methods: {
		async saveCategory() {
			await this.$store.dispatch("updateCategory", this.modalCategory);
			this.$store.dispatch("getCategories");
			this.$refs["category-edit"].hide();
		}
	}
};
</script>

<style>
</style>
