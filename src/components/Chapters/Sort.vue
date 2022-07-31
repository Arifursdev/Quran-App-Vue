<template>
    <button type="button" class="chapters__sort-toggle" @click="showSorting = !showSorting">
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2"><path d="M19 3v4m0 14V11m-7-8v12m0 6v-2M5 3v2m0 16V9"></path><circle cx="19" cy="9" r="2" transform="rotate(90 19 9)"></circle><circle cx="12" cy="17" r="2" transform="rotate(90 12 17)"></circle><circle cx="5" cy="7" r="2" transform="rotate(90 5 7)"></circle></g></svg>
    </button>

    <div class="sort__chapters" v-show="showSorting">
        <ul>
            <li 
                v-for="(sort, index) in sortOptions" 
                :key="index" 
                :class="sort.active ? 'active' : ''" 
                @click="setActiveSort(sort.name)">{{ sort.label }}</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Sort',
    data(){
        return {
            showSorting: false,
            sortOptions: [
                {
                    name: 'ASC',
                    label: 'ASCENDING',
                    active: true
                },
                {
                    name: 'DESC',
                    label: 'DESCENDING',
                    active: false
                },
                {
                    name: 'REVELATION_ORDER',
                    label: 'REVELATION ORDER',
                    active: false
                }
            ]
        }
    },
    methods: {
        setActiveSort(name){
            
            this.sortOptions = this.sortOptions.map(option => {

                if(option.name === name) {
                    option.active = true
                } else {
                    option.active = false
                }
                
                return option;
            })

            this.$store.commit('setSort', name)
            this.showSorting = false;

            let url = new URL(window.location);
            url.searchParams.set('sortBy', name);
            window.history.pushState({}, '', url);
        }
    },
    computed: {
        storedSortOption(){
            return this.$store.getters.getSort;
        }
    },
    watch: {
        storedSortOption(newValue, oldValue){
            console.log(newValue);
            
            this.sortOptions = this.sortOptions.map(option => {

                if(option.name === newValue) {
                    option.active = true
                } else {
                    option.active = false
                }
                
                return option;
            })
        }
    }
}
</script>