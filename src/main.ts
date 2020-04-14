import Vue from "vue";
import App from "./App.vue";
import "./plugins/bootstrap-vue";
import "./registerServiceWorker";
import store from "./store";

Vue.config.productionTip = false;

// Store state mutations to localstorage
store.subscribe((mutation, state) => {
  localStorage.setItem("store", JSON.stringify(state));
});

new Vue({
  store,
  beforeCreate() {
    this.$store.commit("initializeStore", "1");
  },
  render: h => h(App)
}).$mount("#app");
