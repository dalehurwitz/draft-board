import accountActions from './account'
import routerActions from './router'

const actions = () => ({
  ...accountActions,
  ...routerActions
})

export default actions
