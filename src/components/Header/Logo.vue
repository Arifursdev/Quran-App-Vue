<template>
    <div class="header__logo">
        <h1><a @click="goToHome" href="index.html">Al-Qur'an</a></h1>
    </div>
</template>

<script>
export default {
    name: "Logo",
    methods: {
        goToHome(e){
            if(window.outerWidth < 992) {
                e.preventDefault()
                this.$store.commit('setCurrentSurah', null)
                
                let url = new URL(window.location);
                url.searchParams.delete('id');
                window.history.pushState({}, '', url);
            }
        }
    }
}
</script>