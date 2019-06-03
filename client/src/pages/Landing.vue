<template>
	<b-container fluid class="landing text-center">
		<b-jumbotron :header="msg" :lead="lead">
			<p>For more information visit website</p>
			<b-button variant="primary" @click="$bvModal.show('modal-scoped')">More Info</b-button>
			<b-modal id="modal-scoped">
				<template slot="modal-title">This isn't a website. Narf!</template>
			</b-modal>
		</b-jumbotron>
		<b-row align-h="center">
			<b-col cols="10" sm="8" md="6" lg="5" xl="4">
				<b-card title="A Card is Here!" class="shadow border-primary text-left">
               Something goes here besides a stupid ol' form...
				</b-card>
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
import Login from "../components/Forms/Login";

export default {
	components: {
		Login
	},

	data() {
		return {
			msg: "Landing Page",
			lead: "It all starts here."
		};
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
