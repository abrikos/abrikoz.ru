// Source - https://stackoverflow.com/a/73884584
// Posted by Sam85, modified by community. See post 'Timeline' for change history
// Retrieved 2026-08-26, License - CC BY-SA 4.0

import L from 'leaflet'
export default defineNuxtPlugin(() => {
    return {
        provide: {
            L
        }
    }
})
