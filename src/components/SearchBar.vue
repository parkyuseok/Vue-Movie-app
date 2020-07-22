<template>
    <div>
        <v-text-field
            v-model="title"
            outlined
            @keypress.enter="searchMovies"
        >
                <template v-slot:prepend-inner>
                    <v-icon>search</v-icon>
                </template>
                <template v-slot:append>
                    <v-progress-circular 
                        v-if="loading"
                        size="24"
                        color="primary"
                        indeterminate
                    />
                </template>
        </v-text-field>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    // 스토어로 이관된 데이터들을 가져와서 사용하려면 computed
    computed: {
        title: {
            // store에서 state 부분을 수정하려면 mutations를 이용해서 수정해야하는데
            // v-model을 이용해서 직접적으로 수정하기 때문에 에러가 발생한다.
            // 따라서 Getter와 Setter을 이용해서 작성해준다.
            get () {
                return this.$store.state.movie.title 
            },
            // mutation의 도움을 받아 title을 갱신해준다.
            set (title) { // 수정된 title이 들어온다.
                this.$store.commit('movie/updateState', {
                    title //title: title
                })
            }
        },
        loading () {
            return this.$store.state.movie.loading
        }
    },
    methods: {
        // async searchMovies () {
        //     this.$store.dispatch('movie/sarchMovies')
        // }  =====> searchMovies로 이름이 같으므로 아래와 같이 사용할 수 있다.
        // actions를 연결해주는 함수
        ...mapActions('movie', [
            'searchMovies'
        ])
    }
}
</script>