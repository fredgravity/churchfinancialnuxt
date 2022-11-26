import { useLoginStore } from "~~/stores/LoginStore"
export default defineNuxtRouteMiddleware(async (to, from) => {
    let loginStore = useLoginStore()
    console.log(await loginStore.getUser)
    let statusRefresh = true

    if(to.name == 'index' && await loginStore.getUser && statusRefresh) {
      console.log('1')
      statusRefresh = false      
      return navigateTo('/dashboard')
    }

    if(to.name !== 'index' && await loginStore.getUser && statusRefresh) {
      console.log('2')
      statusRefresh = false      
      return true
    }else if (to.name !== 'index' && await loginStore.getUser == false && statusRefresh){
      console.log('3')
      statusRefresh = false 
      // abortNavigation('Insufficient permissions.')
      return navigateTo('/')
    }

    if (from.name !== 'index' && await loginStore.getUser == false && statusRefresh) {
      console.log('4')
      loginStore.logout()
      statusRefresh = false 
      return true
    }
    console.log('5')
    return true

})