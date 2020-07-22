<template>
<!-- https://vuetifyjs.com/ko/components/grids/, row = 행, col = 열 -->
    <v-row>
        <v-col 
            v-for="movie in movies"
            :key="movie.imdbID"
            cols="12"
            lg="3"
            md="3"
            sm="6">
            <div>{{ movie.Title }}</div>
            <div>{{ movie.Year }}</div>
            <div>{{ movie.Poster }}</div>
        </v-col>
    </v-row>
</template>

<script>
export default {
    computed: {
        movies () {
            return this.$store.state.movie.movies
        }
    }    
}
</script>