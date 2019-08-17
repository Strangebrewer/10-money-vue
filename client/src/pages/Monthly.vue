<template>
	<b-container fluid class="landing text-center">
		<b-jumbotron :header="msg">
			<b-button v-b-modal.monthly-expense v-b-tooltip.hover title="Record a Payment">Derp</b-button>
		</b-jumbotron>
		<monthly-expense-modal v-if="allData" id="monthly-expense" />

      <!-- TODO: figure out how you want to display allData -->
      <!-- Look into how to make a table switch rows and columns -->
      <!-- is simply changing it to scope="col" enough? -->
      <!-- there may be a setting for the table as a whole, too -->

		<b-row v-if="loggedIn"></b-row>
	</b-container>
</template>

<script>
import MonthlyExpenseModal from "../components/Modals/MonthlyExpense";

export default {
	components: {
		MonthlyExpenseModal
	},
	data() {
		return {
			loading: true,
			// msg: "Shutcho Ass Up"
			msg: "Loogidisshit, mang!",
         allData: null
		};
	},

	computed: {
		loggedIn() {
			return this.$store.state.user.isUserLoggedIn;
		}
   },
   
   created() {
		this.getAllData();
	},

	methods: {
		async getAllData() {
			await this.$store.dispatch("getAllData");
         this.allData = this.$store.state.allData.all;
			this.loading = false;
         console.log("this.allData:::", this.allData);
		}
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pointer {
	cursor: pointer;
}
</style>
