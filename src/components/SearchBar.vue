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
import axios from 'axios'
export default {
    data () {
        return {
            title: "",
            loading: false
        }
    },
    methods: {
        async searchMovies () {
            this.loading = true
            const res = await axios.get(`http://www.omdbapi.com/?apikey=39ea34de&s=${this.title}`) // 서버에 요청을 보내면 Promise 객체가 반환 된다.
            console.log(res.data)
            this.loading = false
        }
    }
}
</script>