import nodeStore from './nodecontrol'
import edgeStore from './edgecontrol'
import graphStore from './graph'

export default function userStore() {
  return {
    nodeStore: nodeStore(),
    edgeStore: edgeStore(),
    graphStore: graphStore()
  }
}