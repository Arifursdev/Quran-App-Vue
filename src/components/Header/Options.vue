<template>
    <div class="header__options">
        <button type="button" class="option__item" title="Toggle Dark Mode" @click="toggleDarkMode">
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="currentColor" d="M6 .278a.768.768 0 0 1 .08.858a7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277c.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316a.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71C0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29c0-1.167.242-2.278.681-3.286z"/></svg>
        </button>

        <button type="button" class="option__item" title="Language Setting">
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 36 36"><path fill="currentColor" d="M30 3H14v5h2V5h14c.6 0 1 .4 1 1v11c0 .6-.4 1-1 1H17v7h-5.3L8 27.9V25H5c-.6 0-1-.4-1-1V13c0-.6.4-1 1-1h13v-2H5c-1.7 0-3 1.3-3 3v11c0 1.7 1.3 3 3 3h1v5.1l6.3-5.1H19v-7h11c1.7 0 3-1.3 3-3V6c0-1.7-1.3-3-3-3z" class="clr-i-outline clr-i-outline-path-1"/><path fill="currentColor" d="M6.2 22.9h2.4l.6-1.6h3.1l.6 1.6h2.4L11.9 14H9.5l-3.3 8.9zm4.5-6.4l1 3.1h-2l1-3.1z" class="clr-i-outline clr-i-outline-path-2"/><path fill="currentColor" d="M20 17c1.1 0 2.6-.3 4-1c1.4.7 3 1 4 1v-2s-1 0-2.1-.4c1.2-1.2 2.1-3 2.1-5.6V8h-3V6h-2v2h-3v2h5.9c-.2 1.8-1 2.9-1.9 3.6c-.6-.5-1.2-1.2-1.6-2.1h-2.1c.4 1.3 1 2.3 1.8 3.1c-1 .4-1.9.4-2.1.4v2z" class="clr-i-outline clr-i-outline-path-3"/><path fill="none" d="M0 0h36v36H0z"/></svg>
        </button>

        <button type="button" class="option__item" title="General Settings">
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2"><path d="M19 3v4m0 14V11m-7-8v12m0 6v-2M5 3v2m0 16V9"/><circle cx="19" cy="9" r="2" transform="rotate(90 19 9)"/><circle cx="12" cy="17" r="2" transform="rotate(90 12 17)"/><circle cx="5" cy="7" r="2" transform="rotate(90 5 7)"/></g></svg>
        </button>
    </div>
</template>

<script>
export default {
    name: "Options",
    methods: {
        toggleDarkMode(){
            let htmlClass = document.querySelector('html').classList

            var userSelected = localStorage.getItem('dark_mode_enabled')

            if(userSelected !== null) {
                let value = userSelected === 'true' ? 'false' : 'true';
                localStorage.setItem('dark_mode_enabled', value)
            } else {
                let value = htmlClass.contains('mode:light') ? 'true' : 'false'
                localStorage.setItem('dark_mode_enabled', value)
            }
            

            if(htmlClass.contains('mode:light')) {
                htmlClass.remove('mode:light')
                htmlClass.add('mode:dark')
            } else {
                htmlClass.add('mode:light')
                htmlClass.remove('mode:dark')
            }
        }
    }
}
</script>