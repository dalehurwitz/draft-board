import accountActions from './account'
import routerActions from './router'

const actions = store => ({
  ...accountActions(store),
  ...routerActions(store)
})

export default actions
