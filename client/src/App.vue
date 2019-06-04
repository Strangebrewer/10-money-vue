<template>
	<div id="app">
		<navbar/>
		<router-view/>
	</div>
</template>

<script>
import Navbar from "./components/Navbar";

export default {
	components: {
		Navbar
	},

	created() {
		if (localStorage.getItem("token")) {
			this.$store.dispatch("getCurrentUser");
		}
	}
};
</script>

<style>
</style>
