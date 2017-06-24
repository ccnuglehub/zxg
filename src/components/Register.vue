<template>
	<div class="register">
		<img class="app_logo" src="../assets/app_logo.png">
		<Input  placeholder="请输入...">
		<span slot="prepend"></span>
		</Input>
	</div>
</template>

<script>
export default {
  	name: 'register',
  	data () {
    	return {
      		msg: 'Welcome to Your Vue.js App'
    	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.app_logo {
	margin-top: 90px;
	width: 71%;
}
</style>
