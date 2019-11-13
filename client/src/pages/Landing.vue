<template>
	<b-container fluid class="landing text-center">
		<b-jumbotron :header="msg"></b-jumbotron>
        
		<b-row v-if="loggedIn">
			<b-col cols="12" sm="10" md="8" lg="6" offset-sm="1" offset-md="2" offset-lg="3">
				<accounts-card :accounts="accounts"/>
			</b-col>

			<b-col cols="12" sm="10" md="8" lg="6" offset-sm="1" offset-md="2" offset-lg="3">
				<categories-card :categories="categories" :accounts="accounts"/>
			</b-col>

			<b-col cols="12" sm="10" md="8" lg="6" offset-sm="1" offset-md="2" offset-lg="3">
				<monthlies-card :monthlies="monthlies" :accounts="accounts"/>
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
import MonthliesCard from "../components/Cards/MonthliesCard";
import CategoriesCard from "../components/Cards/CategoriesCard";
import AccountsCard from "../components/Cards/AccountsCard";

export default {
	components: {
		AccountsCard,
		CategoriesCard,
		MonthliesCard
	},

	data() {
		return {
            // msg: "Shutcho Ass Up"
            msg: "This is a Test."
		};
   },
   
   computed: {
      accounts() {
         return this.$store.state.account.all;
      },
      categories() {
         return this.$store.state.category.all;
      },
      monthlies() {
         return this.$store.state.monthly.all;
      },
      loggedIn() {
         return this.$store.state.user.isUserLoggedIn;
      }
   },

	mounted() {
		console.log("this.$store.state:::", this.$store.state);
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pointer {
	cursor: pointer;
}
</style>
