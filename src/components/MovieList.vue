<template>
<!-- https://vuetifyjs.com/ko/components/grids/, row = 행, col = 열
     https://github.com/shershen08/vue-masonry#readme, 반복되는 요소의 부모 요소에 v-masonry, item-selector=".item" 작성, 반복되는 요소에 v-masonry-tile, class="item" 작성 -->
    <v-row
        v-masonry
        item-selector=".item">
        <v-col 
            v-for="movie in movies"
            :key="movie.imdbID"

            v-masonry-tile
            class="item"
            
            cols="12"
            lg="3"
            md="3"
            sm="6">
            <v-card>
                <v-img
                    :src="posterScr(movie.Poster)"
                    :alt="movie.Title"
                    :height="posterHeight(movie.Poster)">
                    <template v-slot:placeholder>
                        <div style="background: lightgray; height: 100%"></div>
                    </template>
                </v-img>
                <v-card-title>
                    {{ movie.Title }}
                </v-card-title>
                <v-card-subtitle>
                    {{ movie.Year }}
                </v-card-subtitle>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
    computed: {
        movies () {
            return this.$store.state.movie.movies
        }
    },
    methods: {
        posterScr (poster) {
            return poster === 'N/A' ? '' : poster
        },
        posterHeight (poster) {
            return poster === 'N/A' ? 100 : 300
        }
    }
}
</script>