<template>
	<div class="register">
		<img class="app_logo" src="../assets/app_logo.png">
		<Input class="input_box"  placeholder="请输入...">
		<span slot="prepend"><Icon type="person"></Icon></span>
		</Input>
		<Input  placeholder="请输入...">
		<span slot="prepend"><Icon type="ios-telephone"></Icon></span>
		</Input>
		<Input  placeholder="请输入...">
		<span slot="prepend"><Icon type="locked"></Icon></Icon></span>
		</Input>
		<Input  placeholder="请输入...">
		<span slot="prepend"><Icon type="locked"></Icon></Icon></span>
		</Input>
		<Select v-model="model2" size="small" style="width:100px">
			<Option v-for="item in cityList" :value="item.value" :key="item">{{ item.label }}</Option>
		</Select>
		<Select v-model="model2" size="small" style="width:100px">
			<Option v-for="item in cityList" :value="item.value" :key="item">{{ item.label }}</Option>
		</Select>
		<Button type="success" long>确认提交</Button>
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
