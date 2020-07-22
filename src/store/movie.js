// movie.js는 저장소의 일종의 모듈이다. 따라서 index.js에서 import해서 사용해야한다.
export default {
    // state 빼고 복수, state는 일종의 데이터이다. => arrow function 사용.
    state: () => ({
        title: '',
        loading: false
    }),
    getters: {},
    // 비동기처리 가능하지 않다.
    mutations: {},
    // 비동기처리 가능하다.
    actions: {
        async searchMovies ({ state }) { // context에 있는 state를 바로 할당.
            state.loading = true // actions에서 데이터를 바로 할당하면 안된다. (mutations의 도움을 받아야함.)
            const res = await axios.get(`http://www.omdbapi.com/?apikey=39ea34de&s=${state.title}`)
            state.loading = false
        }
    }
}