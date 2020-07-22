import axios from 'axios'

// movie.js는 저장소의 일종의 모듈이다. 따라서 index.js에서 import해서 사용해야한다.
export default {
    namespaced: true, // 이 부분을 작성해줘야 SearchBar.vue에서 movie라는 namespace로 접근할 수 있다.
    // state 빼고 복수, state는 일종의 데이터이다. => arrow function 사용.
    state: () => ({
        title: '',
        loading: false,
        movies: []
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
        },
        // 하지만 추가적으로 가져오는 값들도 할당해서 뒷 쪽으로 밀어 넣어줘야하는데 
        // updateSate mutation은 assign하는 코드이므로 updateState를 쓸 수 없다. 따라서 추가적인 mutations 작성한다.
        pushIntoMovies (state, movies) {
            state.movies.push(...movies) //item 단위로 끊어져서 들어갈 수 있도록 전개연산자를 사용해준다.
        }
    },
    // 비동기처리 가능하다.
    actions: {
        async searchMovies ({ state, commit }) { //commit을 사용하기 위해서 2번째 인수로 받는다.
            // state.loading = true
            commit('updateState', { //mutation을 이용해 state의 loading 부분에 true 값 할당시킨다. 
                loading: true
            })
            const res = await axios.get(`http://www.omdbapi.com/?apikey=39ea34de&s=${state.title}&page=1`)
            const pageLength = Math.ceil(res.data.totalResults / 10)

            // 첫번째 페이지는 그냥 바로 할당해주어도 괜찮다.
            commit('updateState', {
                movies: res.data.Search
            })

            if (pageLength > 1) {
                for(let i=2; i<=pageLength; i++) {
                    if (i > 4) break // 최대 40개까지만 받을 수 있게
                    const resMore = await axios.get(`http://www.omdbapi.com/?apikey=39ea34de&s=${state.title}&page=${i}`)
                    commit('pushIntoMovies', resMore.data.Search)
                }
            }

            commit('updateState', {
                loading: false
            })
        }
    }
}