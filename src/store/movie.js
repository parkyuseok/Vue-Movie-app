// movie.js는 저장소의 일종의 모듈이다. 따라서 index.js에서 import해서 사용해야한다.
export default {
    // state 빼고 복수, state는 일종의 데이터이다. => arrow function 사용.
    state: () => ({
        title: '',
        loading: false
    }),
    getters: {},
    mutations: {},
    actions: {}
}