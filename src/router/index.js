import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Graph from '../views/graph/Graph.vue'
import EdgeControl from '../views/edge/EdgeControl.vue'
import NodeControl from '../views/node/NodeControl.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: 'graph',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'graph',
          name: 'graph',
          component: Graph
        },
        {
          path: 'node',
          name: 'node',
          component: NodeControl
        },

        {
          path: 'edge',
          name: 'edge',
          component: EdgeControl
        },

      ]
    },

  ]
})

export default router
