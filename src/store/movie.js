import axios from 'axios'

export default {
    namespaced: true,
    state: () => ({
        title: '',
        movies: [],
        loading: false
    }),
    getters: {},
    mutations: {
        updateState (state, payload) {
            Object.keys(payload).forEach(key => {
                state[key] = payload[key]
            })
        },
        pushIntoMovies (state, movies) {
            state.movies.push(...movies)
        }
    },
    actions: {
        async fetchMovies ({ state, commit }, pageNum) {
            const res = await axios.get(`http://www.omdbapi.com/?apikey=39ea34de&s=${state.title}&page=${pageNum}`)
            commit('pushIntoMovies', res.data.Search)
            return res.data
        },
        async searchMovies ({ commit, dispatch }) {
            commit('updateState', { 
                loading: true, // 로딩 애니메이션 시작
                movies: [] // 초기화
            })

            const { totalResults } = await dispatch('fetchMovies', 1)
            const pageLength = Math.ceil(totalResults / 10)

            if (pageLength > 1) {
                for(let i=2; i<=pageLength; i++) {
                    if (i > 4) break
                    await dispatch('fetchMovies', i)
                }
            }

            commit('updateState', {
                loading: false // 로딩 애니메이션 종료
            })
        }
    }
}