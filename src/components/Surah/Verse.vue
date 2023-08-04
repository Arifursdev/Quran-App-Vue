<template>
    <div class="surah__verse" :id="'verse_' + (index + 1)" :data-verse-id="verse.id" :data-index="index" tabindex="0">
        <div class="verse__header">

            <span class="verse__no">{{ verse.verse_key }}</span>

            <div class="verse__options">
            <button type="button" class="verse__option" title="Share" @click="shareVerse(verse)" tabindex="-1">
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 36 36"><path fill="currentColor" d="M27.53 24a5 5 0 0 0-3.6 1.55l-12.19-6.1a4.47 4.47 0 0 0 0-2.8l12.21-6.21a5.12 5.12 0 1 0-1.07-1.7l-12.09 6.15a5 5 0 1 0 0 6.33l12.06 6.07a4.93 4.93 0 0 0-.31 1.71a5 5 0 1 0 5-5Zm0-20a3 3 0 1 1-3 3a3 3 0 0 1 3-3ZM7 21a3 3 0 1 1 3-3a3 3 0 0 1-3 3Zm20.53 11a3 3 0 1 1 3-3a3 3 0 0 1-3 3Z" class="clr-i-outline clr-i-outline-path-1"/><path fill="none" d="M0 0h36v36H0z"/></svg>
            </button>

            <button type="button" class="verse__option" title="Play" @click="playVerse(verse.timestamps_from)" :data-starting-time="verse.timestamps_from" :data-next-verse-from="verse.next_timestamps_from" tabindex="-1">
                <svg class="verse__option-play" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="currentColor" d="M7 28a1 1 0 0 1-1-1V5a1 1 0 0 1 1.482-.876l20 11a1 1 0 0 1 0 1.752l-20 11A1 1 0 0 1 7 28ZM8 6.69v18.62L24.925 16Z"/></svg>
                <svg class="verse__option-playing" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M7 5v14M17 5v14"/></svg>
            </button>
            </div>

        </div>

        <!-- previously was -->
        <!-- 
        'https://df61994948e9a54a5259-ad04094bac72ed4d481dba65a1920e88.ssl.cf1.rackcdn.com/'+ verse.verse_key.replace(':', '_') +'.png'
        'https://arifursdev.com/verses/'+ currentSurahID + '/' + verse.verse_key.replace(':', '_') +'.png'
         -->
        <div class="verse__content">
            <div class="verse__arabic invert_if_dark">
            <img class="lazyload" :data-src="'https://arifursdev.com/verses/'+ currentSurahID + '/' + verse.verse_key.replace(':', '_') +'.png'" alt="">
            </div>
            <div class="verse__translations">
            
            <div class="verse__translation" v-for="translation in verse.translations" :key="translation.id">
                <p>{{ translation.text.replace(/<\/?[a-z][a-z0-9]*[^<>]*>.*?<\/?[a-z][a-z0-9]*[^<>]*>/ig, "") }}</p>
                <span>{{ translation.resource_name.replace(/<\/?[a-z][a-z0-9]*[^<>]*>.*?<\/?[a-z][a-z0-9]*[^<>]*>/ig, "") }}</span>
            </div>

            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: "Verse",
    props: ['verse', 'index', 'currentSurahID'],
    methods: {
        playVerse(duration){
            document.dispatchEvent(new CustomEvent('quran:play_verse', {
                detail: duration
            }));
        },
        shareVerse(verse){
            if(navigator.clipboard) {
                let url = new URL(window.location);
                url.searchParams.set('verse', verse.id);

                navigator.clipboard.writeText(url)
                .then(() => {
                    alert('Link copied!')
                })
                .catch((err) => {
                    alert('Something went wrong!')
                });
            }
            
        }
    },
    mounted(){
        this.$emit('verseMounted')
    }
}
</script>