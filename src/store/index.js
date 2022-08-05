import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      currentSurah: window.outerWidth > 992 ? 1 : null,
      chaptersList: [],
      chaptersData: [],
      searchQuery: '',
      sort: 'ASC'
    }
  },
  getters: {
    getCurrentSurah: (state) => {
      return state.currentSurah;
    },
    getChapters: (state) => {
      var query = state.searchQuery;
      
      if(query === '') {
        var results = state.chaptersList;
        
        if(state.sort === 'DESC') {
          return results.sort((a, b) => {
            return b.id - a.id
          });
        }
        
        if(state.sort === 'REVELATION_ORDER') {

          // sorting method from:  https://stackoverflow.com/a/44063445/13359236 👍
          var revealedOrder = [96,68,73,74,1,111,81,87,92,89,93,94,103,100,108,102,107,109,105,113,114,112,53,80,97,91,85,95,106,101,75,104,77,50,90,86,54,38,7,72,36,25,35,19,20,56,26,27,28,17,10,11,12,15,6,37,31,34,39,40,41,42,43,44,45,46,51,88,18,16,71,14,21,23,32,52,67,69,70,78,79,82,84,30,29,83,2,8,3,33,60,4,99,57,47,13,55,76,65,98,59,24,22,63,58,49,66,64,61,62,48,5,9,110];

          return results.sort(function(a, b){  
            return revealedOrder.indexOf(a.id) - revealedOrder.indexOf(b.id);
          });

        }

        return results.sort((a, b) => {
          return a.id - b.id
        });

      }

      var results = state.chaptersList.filter(chapter => {
        return chapter.name_simple.toLowerCase().includes(query.toLowerCase()) 
      });

      return results;
    },
    getChapterDataByID: (state) => (id) => {
      id = parseInt(id),
      id = id > 0 && id < 115 ? id : 1;

      return state.chaptersData[id];
    },
    getSort(state){
      return state.sort;
    },
    getSearchQuery(state){
      return state.searchQuery;
    }
  },
  mutations: {
    setCurrentSurah(state, payload){
      state.currentSurah = payload;
    },
    setChapter(state, payload){
      state.chaptersList = payload;
    },
    setSurah(state, payload) {
      state.chaptersData[payload.id] = payload.data
    },
    setSearchQuery(state, payload) {
      state.searchQuery = payload
    },
    setSort(state, payload) {
      state.sort = payload
    }
  },
  actions: {
    increseCounter(context){
      context.commit('increseCounter')
    }
  }
})

export default store