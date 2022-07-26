import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      currentSurah: window.outerWidth > 992 ? 1 : null,
      chaptersList: [],
      chaptersData: [],
    }
  },
  getters: {
    getCurrentSurah: (state) => {
      return state.currentSurah;
    },
    getChapters: (state) => {
      return state.chaptersList;
    },
    getChapterDataByID: (state) => (id) => {
      id = parseInt(id),
      id = id > 0 && id < 115 ? id : 1;

      return state.chaptersData[id];
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
    }
  },
  actions: {
    increseCounter(context){
      context.commit('increseCounter')
    }
  }
})

export default store