<template>
	<b-container class="landing">
				<b-jumbotron :header="msg" :lead="lead">
					<p>For more information visit website</p>
					<b-button variant="primary" @click="$bvModal.show('modal-scoped')">More Info</b-button>
					<b-modal id="modal-scoped">
                  <template slot="modal-title">
                     This isn't a website. Narf!
                  </template>
               </b-modal>
				</b-jumbotron>
		<b-row>
			<b-col cols="6" offset="3">
				<b-card>Sucka Motha Fucka!</b-card>
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
export default {
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
