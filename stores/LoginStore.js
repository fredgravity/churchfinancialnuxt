import {defineStore} from 'pinia'

export const useLoginStore = defineStore('login', {
    state: () => ({
        user: (JSON.parse(localStorage.getItem('user')) || {}) ,
        token: {
            accessToken: (JSON.parse(localStorage.getItem('accessToken')) || ''),
        },
        error: '',
        api_base: useRuntimeConfig().public.apiBase
    }),
    getters:{
        getUser: async (state) => {
            console.log(await state.user)
            if (Object.keys(state.user).length !== 0){
                
                return state.user
            }
            return false
        },
        getAccessToken: async (state) =>{
            return state.token
        }
    },
    actions: {
        async login(loginForm){
            const { data, error, refresh } = await useFetch(this.api_base+"/login", {
                method: "POST",
                headers: { "Content-Type": "application/json", "Accept": 'application/json' },
                body: loginForm,
                initialCache: false
            });

            
            if (error.value == null){
                console.log(data.value.data.token)
                this.token.accessToken = data.value.data.token
                
            
                localStorage.setItem('accessToken', JSON.stringify(data.value.data.token))
                localStorage.setItem('user', JSON.stringify(data.value.data.user))
                setInterval(function(){
                    window.location.href = '/dashboard'
                }, 2000)
                // localStorage.setItem('refreshToken', JSON.stringify(data.value.refresh))
                
                
            }else{
                console.log(error)
                this.error = 'Something went wrong. Please try again later'
                localStorage.setItem('error', JSON.stringify(error))
                // this.error = error.value.data.detail
            }
            
            
        },
        
        async setToken(token){
            // console.log(token)
            localStorage.setItem('accessToken', JSON.stringify(token))
                // localStorage.setItem('refreshToken', JSON.stringify(data.value.refresh))
        },
        async logout() {
            localStorage.removeItem('user')
            localStorage.removeItem('accessToken')
            const { data, error, refresh } = await useFetch(this.api_base+"/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json", "Accept": 'application/json' },
                initialCache: false
            });
            window.location.href = '/'
          }
    }
})