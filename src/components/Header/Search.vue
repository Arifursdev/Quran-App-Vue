<template>
    <div class="header__search">
        <button type="button" class="search__toggle" data-open-popup="navigation" @click="searchPopupOpened = true">
        <span class="search__icon">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="m20.71 19.29l-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8a7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42ZM5 11a6 6 0 1 1 6 6a6 6 0 0 1-6-6Z"/></svg>
        </span>
        <span class="search__placeholder">Enter keyword and Search</span>
        </button>
    </div>

    <!-- Main Search -->
    <div class="popup-wrapper" :class="searchPopupOpened ? 'opened' : ''">
      <div class="popup search__ayah-popup">
        <div class="popup-header">
          <span>Search</span>
          <button class="close-popup" @click="searchPopupOpened = false"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29l-4.3 4.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l4.29-4.3l4.29 4.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42z"/></svg></button>
        </div>
        <div class="popup-content search__ayah-popup-content">

            <div class="search__ayah">

              <div class="search__ayah-field">
                <input type="search" placeholder="Start typing..." ref="searchTermInput" @input="typing">
              </div>

              <div class="search__ayah-results">
                
                <div class="state" v-if="showLoadingState">
                  <span class="state__icon loading">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024"><path fill="currentColor" d="M512 1024c-69.1 0-136.2-13.5-199.3-40.2C251.7 958 197 921 150 874c-47-47-84-101.7-109.8-162.7C13.5 648.2 0 581.1 0 512c0-19.9 16.1-36 36-36s36 16.1 36 36c0 59.4 11.6 117 34.6 171.3c22.2 52.4 53.9 99.5 94.3 139.9c40.4 40.4 87.5 72.2 139.9 94.3C395 940.4 452.6 952 512 952c59.4 0 117-11.6 171.3-34.6c52.4-22.2 99.5-53.9 139.9-94.3c40.4-40.4 72.2-87.5 94.3-139.9C940.4 629 952 571.4 952 512c0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9a437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.2C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7c26.7 63.1 40.2 130.2 40.2 199.3s-13.5 136.2-40.2 199.3C958 772.3 921 827 874 874c-47 47-101.8 83.9-162.7 109.7c-63.1 26.8-130.2 40.3-199.3 40.3z"></path></svg>
                  </span>
                  <div class="state__title">Loading...</div>
                </div>
                
                <div class="state" v-if="showEmptyState">
                    <span class="state__icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M14 8.775q0-.225.163-.463T14.524 8q.725-.25 1.45-.375T17.5 7.5q.5 0 .988.063t.962.162q.225.05.388.25t.162.45q0 .425-.275.625t-.7.1q-.35-.075-.737-.113T17.5 9q-.65 0-1.275.125t-1.2.325q-.45.175-.737-.025T14 8.775Zm0 5.5q0-.225.163-.463t.362-.312q.725-.25 1.45-.375T17.5 13q.5 0 .988.063t.962.162q.225.05.388.25t.162.45q0 .425-.275.625t-.7.1q-.35-.075-.737-.113T17.5 14.5q-.65 0-1.275.113t-1.2.312q-.45.175-.738-.013T14 14.276Zm0-2.75q0-.225.163-.463t.362-.312q.725-.25 1.45-.375t1.525-.125q.5 0 .988.063t.962.162q.225.05.388.25t.162.45q0 .425-.275.625t-.7.1q-.35-.075-.737-.113t-.788-.037q-.65 0-1.275.125t-1.2.325q-.45.175-.737-.025t-.288-.65ZM6.5 16q1.175 0 2.288.263T11 17.05V7.2q-1.025-.6-2.175-.9T6.5 6q-.9 0-1.788.175T3 6.7v9.9q.875-.3 1.738-.45T6.5 16Zm6.5 1.05q1.1-.525 2.212-.788T17.5 16q.9 0 1.763.15T21 16.6V6.7q-.825-.35-1.713-.525T17.5 6q-1.175 0-2.325.3T13 7.2v9.85Zm-6-5.4Zm5 7.825q-.35 0-.663-.088t-.587-.237q-.975-.575-2.05-.862T6.5 18q-1.05 0-2.063.275T2.5 19.05q-.525.275-1.012-.025T1 18.15V6.1q0-.275.138-.525T1.55 5.2q1.15-.6 2.4-.9T6.5 4q1.45 0 2.838.375T12 5.5q1.275-.75 2.663-1.125T17.5 4q1.3 0 2.55.3t2.4.9q.275.125.413.375T23 6.1v12.05q0 .575-.487.875t-1.013.025q-.925-.5-1.937-.775T17.5 18q-1.125 0-2.2.288t-2.05.862q-.275.15-.588.238t-.662.087Z"/></svg>
                  </span>
                  <div class="state__title" v-text="'Empty Results for ' + searchQuery"></div>
                </div>

                <template v-if="!showLoadingState && results.length > 0">
                    
                    <div class="results__count" v-text="results.length + ' Search Results'"></div>

                    <div class="verse" v-for="verse in results" :key="verse.verse_key">

                        <div class="verse__from" v-text="verse.verse_key"></div>

                        <div class="verse__arabic invert_if_dark">
                            <img :src="'https://arifursdev.com/verses/'+ verse.verse_key.split(':')[0] +'/'+ verse.verse_key.replace(':', '_') +'.png'" alt="">
                        </div>

                        <div class="verse__translations">
                            <div class="verse__translation" v-for="translation in verse.translations" :key="translation.resource_id">
                                <p v-html="translation.text"></p>
                                <span v-text="translation.resource_name"></span>
                            </div>
                        </div>
                    
                    </div>

                </template>

                

              </div>

            </div>

        </div>
      </div>
    </div>

</template>

<script>
export default {
    name: "Search",
    data(){
        return {
            searchPopupOpened: false,
            searchQuery: '',
            hardShowLoadingState: false,
            typingTimeout: null,
            results: [],
        }
    },
    methods: {
        typing(){
            const selfthis = this
            this.hardShowLoadingState = true;
            clearTimeout(this.typingTimeout)
            this.typingTimeout = setTimeout(function(){
                selfthis.getResults();
            }, 500)
        },
        getResults(){
            const selfthis = this
            const input = this.$refs.searchTermInput
            const term = input.value;
            const translations = localStorage.getItem('adevSavedTranslators');
            this.searchQuery = term;

            if(term === '') {
                selfthis.hardShowLoadingState = false;
                return;
            }

            selfthis.axios.get( `https://api.qurancdn.com/api/qdc/search?query=${term}&filter_languages=&size=100&page=1&filter_translations=${translations}` )
            .then(function(resp){
                const data = resp.data.result;
                const verses = data.verses

                if(verses.length > 0) {
                    selfthis.results = verses.map(verse => {
                        return {
                            verse_key: verse.verse_key,
                            translations: verse.translations
                        };
                    });
                } else {
                    selfthis.results = [];
                }

                selfthis.hardShowLoadingState = false;
            })
            .catch(function(error){
                console.log(error);
            });
        }
    },
    computed: {
        showLoadingState(){
            if(this.hardShowLoadingState === true) {
                return true;
            }

            return false;
        },
        results(){
            return this.results;
        },
        showEmptyState(){
            console.log(this.showLoadingState == false);
            console.log(this.searchQuery !== null);
            console.log(this.results.length === 0);
            return this.showLoadingState == false && this.searchQuery !== '' && this.results.length === 0;
        }
    }
}
</script>