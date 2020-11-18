import Vue from "vue";
import Router from 'vue-router'

import PageHome from '@/pages/PageHome.vue';
import FormSteps from '@/components/FormSteps.vue';

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    { path: '/', name: 'pageHome', component: PageHome },
    { path: '/process/:number', name: 'formSteps', component: FormSteps },
  ]
});