import {parseHTML} from 'linkedom'


export async function getSeoMeta(url: string) {
    if (!url) {
        throw createError({status: 400, message: 'Missing target URL parameter.'})
    }

    try {
        // 2. Fetch the external website HTML
        const html = await $fetch<string>(url, {
            headers: {'User-Agent': 'Mozilla/5.0 (Compatible; NuxtSEOBot/1.0)'}
        })
        // 3. Parse HTML string using linkedom
        const {document} = parseHTML(html) as any

        // Helper function to pull content by meta attribute
        const getMeta = (query: string) => document.querySelector(query)?.getAttribute('content') || null

        // 4. Map extracted tags to a structured object
        return {
            title: document.querySelector('title')?.textContent || null,
            description: getMeta('meta[name="description"]'),
            ogTitle: getMeta('meta[property="og:title"]'),
            ogDescription: getMeta('meta[property="og:description"]'),
            ogImage: getMeta('meta[property="og:image"]'),
            twitterCard: getMeta('meta[name="twitter:card"]'),
            url
        }

    } catch (error) {
        throw createError({
            status: 500,
            message: `Failed parsing SEO tags: ${error instanceof Error ? error.message : 'Unknown error'}`
        })
    }
}
