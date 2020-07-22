// movie.js는 저장소의 일종의 모듈이다. 따라서 index.js에서 import해서 사용해야한다.
export default {
    // state 빼고 복수, state는 일종의 데이터이다. => arrow function 사용.
    state: () => ({
        title: '',
        loading: false
    }),
    getters: {},
    // 비동기처리 가능하지 않다.
    mutations: {
        // 범용적으로 사용하는 mutation
        updateState (state, payload) {
            // payload는 객체 데이터이고 객체 데이터의 key 값(property)을 문자로 만들 수 있는 구조로 만든다.
            Object.keys(payload).forEach(key => {
                state[key] = payload[key] // (좌)sate에 있는 loading = (우) payload에 있는 loading
            })
        }
    },
    // 비동기처리 가능하다.
    actions: {
        async searchMovies ({ state, commit }) { //commit을 사용하기 위해서 2번째 인수로 받는다.
            // state.loading = true
            commit('updateState', { //mutation을 이용해 state의 loading 부분에 true 값 할당시킨다. 
                loading: true
            })
            const res = await axios.get(`http://www.omdbapi.com/?apikey=39ea34de&s=${state.title}`)
            commit('updateState', { //mutation을 이용해 state의 loading 부분에 true 값 할당시킨다. 
                loading: false
            })
        }
    }
}