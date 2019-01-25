import Vue from "vue"

import App from "./view/app.vue"


// new Vue({
// 	render: h => h(App)
// }).$mount("#root")

export default () => {
	const app =  new Vue({
		render: h => h(App)
	})
	return { app }
}