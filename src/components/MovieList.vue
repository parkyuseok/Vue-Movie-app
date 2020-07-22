<template>
    <div>Movie List...</div>
    <!-- 
        SearchBar에서 받은 데이터를 MovieList에서 사용하기 위해서는
        첫번째로 SearchBar에서 부모 컴포넌트(App.vue)에게 $emit으로 데이터를 올리고
        props로 MovieList에게 전달하는 방법이 있다.
        하지만 컴포넌트 간 데이터 이동이 2 Depth 이상일 경우
        고려할 수 있는게 2가지 있다.
        1. EventBus를 사용한다.
        2. store를 사용한다. (SearchBar에 있는 내용을 Store로 이관...)
    -->
</template>