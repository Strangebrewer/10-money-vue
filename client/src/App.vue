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
html {
   font-size: 15px;
}
.text-sm {
   font-size: 12px;
}
.text-md {
   font-size: 14px;
}
.text-lg {
   font-size: 18px;
}
.width-90 {
	min-width: 90px;
}
.width-75 {
   min-width: 75px;
}
.width-60 {
	min-width: 60px;
}
.pointer {
	cursor: pointer;
}
</style>
