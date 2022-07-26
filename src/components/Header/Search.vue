<template>
    <div class="header__search">
        <button type="button" class="search__toggle" data-open-popup="navigation">
        <span class="search__icon">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="m20.71 19.29l-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8a7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42ZM5 11a6 6 0 1 1 6 6a6 6 0 0 1-6-6Z"/></svg>
        </span>
        <span class="search__placeholder">Enter keyword and Search</span>
        </button>
    </div>
</template>

<script>
export default {
    name: "Search"
}
</script>