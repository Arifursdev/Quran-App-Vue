<template>
    <div class="surah__header" :class="surahInfo === null ? 'loading': ''">
        <template v-if="surahInfo === null">
            <Loading/>
        </template>

        <template v-if="surahInfo !== null">
        
            <div class="back-to-chapters" @click="goBackToChapters">
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="m8.5 12.8l5.7 5.6c.4.4 1 .4 1.4 0c.4-.4.4-1 0-1.4l-4.9-5l4.9-5c.4-.4.4-1 0-1.4c-.2-.2-.4-.3-.7-.3c-.3 0-.5.1-.7.3l-5.7 5.6c-.4.5-.4 1.1 0 1.6c0-.1 0-.1 0 0z"/></svg>
            </div>

            <h2>{{ surahInfo.name_simple }}</h2>
            <p>{{ surahInfo.translated_name.name }}</p>

            <button type="button" class="surah__play" @click="playSurah">
                <template v-if="!playingSurah">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="currentColor" d="M7 28a1 1 0 0 1-1-1V5a1 1 0 0 1 1.482-.876l20 11a1 1 0 0 1 0 1.752l-20 11A1 1 0 0 1 7 28ZM8 6.69v18.62L24.925 16Z"></path></svg>
                </template>
                <template v-if="playingSurah">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M7 5v14M17 5v14"/></svg>
                </template>
            </button>
        </template>

        <audio ref="surahPlayer" :src="'https://download.quranicaudio.com/qdc/abdurrahmaan_as_sudais/murattal/' + currentSurah + '.mp3'"></audio>

    </div>
</template>

<script>
import Loading from '../Loading.vue'

export default {
    name: "Header",
    data() {
        return {
            playingSurah: false,
        }
    },
    components: {
        Loading,
    },
    methods: {
        goBackToChapters(){
            this.$store.commit('setCurrentSurah', null)
        },
        playSurah(){
            var self = this
            var currentSurah = self.$store.getters.getCurrentSurah
            if(currentSurah === null) {
                return;
            }

            self.playingSurah = !self.playingSurah
            
            let surahPlayer = self.$refs.surahPlayer;
            if (surahPlayer.paused) {
                surahPlayer.play();
            } else {
                surahPlayer.pause();
            }
        }
    },
    computed: {
        surahInfo(){
            var currentSurah = this.$store.getters.getCurrentSurah
            if(currentSurah === null) {
                return null;
            }

            var chapters = this.$store.getters.getChapters

            if(chapters.length === 0) {
                return null;
            }

            var chapterInfo = chapters.filter(item => {
                return item.id === currentSurah;
            })

            if(!chapterInfo.length) {
                return null;
            }

            return chapterInfo[0];
        },
        currentSurah(){
            this.playingSurah = false
            return this.$store.getters.getCurrentSurah
        }
    },
    watch: {
        "$store.getters.getAudioVolume"(volume) {
            this.$refs.surahPlayer.volume = volume
        },
    },
    mounted(){
        var self = this
        let surahPlayer = self.$refs.surahPlayer;

        surahPlayer.addEventListener('play', function(){
            self.playingSurah = true
        })

        surahPlayer.addEventListener('pause', function(){
            self.playingSurah = false
        })

        surahPlayer.addEventListener('ended', function(){
            self.playingSurah = false
        })

        surahPlayer.addEventListener('playing', function(e){
            console.log(e);
        })

        surahPlayer.addEventListener('timeupdate', function(){
            var percent = surahPlayer.currentTime / surahPlayer.duration * 100;

            var minutes = Math.floor(surahPlayer.currentTime / 60);
            var seconds = Math.floor(surahPlayer.currentTime % 60);

            if(minutes !== 0) {
                seconds = parseFloat(minutes * 60) + parseFloat(seconds);
            }

            // responsive play icon to audio , temp solution, remove if performance issue
            var currentSurah = self.$store.getters.getCurrentSurah
            var currentSurahData = self.$store.getters.getChapterDataByID(currentSurah);

            var currentSurahData = currentSurahData.filter(item => {
                return item.timestamps_from < seconds;
            })

            currentSurahData = currentSurahData[currentSurahData.length - 1]

            if(currentSurahData !== undefined) {

                var verse = document.querySelector('.surah__verse');
                if(verse) {
                    var playing = document.querySelector('.surah__verse.playing:not([data-verse-id="'+ currentSurahData.id +'"])');
                    if(playing) {
                        playing.classList.remove('playing')
                    }

                    var verse = document.querySelector('.surah__verse[data-verse-id="'+ currentSurahData.id +'"]');
                    verse.classList.add('playing')
                }

            }
            // responsive play icon to audio , temp solution ends, remove if performance issue

            

        });
    },
    created(){
        var self = this
        document.addEventListener('quran:play_verse', function(e){
          let duration = parseFloat(e.detail)
          console.log('duration: ', duration);
          let surahPlayer = self.$refs.surahPlayer;
          surahPlayer.pause();
          surahPlayer.currentTime = duration;
          surahPlayer.play();
        });
    }
}
</script>