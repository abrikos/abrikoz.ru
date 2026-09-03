import {parseHTML} from 'linkedom'
import type {H3Event} from "h3";


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

export async function setSessionUser(id: string, event: H3Event, strategyUser: any) {
    const {user} = await getUserSession(event) as unknown as { user: { ids: string[], id: string } }
    if (!user) {
        const found = await UserModel.findOne({ids: {$in: [id]}})
        if (!found) {
            const newUser = await UserModel.create({ids: [id], strategies: [strategyUser]})
            await setUserSession(event, {user: newUser})
        } else {
            await setUserSession(event, {user: found})
        }
        return
    }
    const found = await UserModel.findOne({ids: {$in: [id]}})
    if (found) {
        if (found.id !== user.id) {
            console.warn('Strategy used', found, user)
            throw createError({status: 406, message: 'This strategy is occupied by another user'})
        }
        await setUserSession(event, {user: found})
    } else {
        const logged = await UserModel.findById(user.id)
        if (logged) {
            logged.ids.push(id)
            logged.strategies.push(strategyUser)
            logged.save()
            await setUserSession(event, {user: logged})
        } else {
            console.error('Not found user:', user)
        }
    }

}

export function minesweeperCheckCell(game: IMinesweeper, idx: number) {
    game.turns.push(idx)
    if (game.mines.includes(idx)) {
        game.finished = -1
        return
    }
    if (game.mines.length + game.turns.length === game.cellsCount) {
        game.finished = 1
        return;
    }
    const {row, col} = game.cell(idx)
    const nearCells = [game.idx(row - 1, col - 1), game.idx(row - 1, col), game.idx(row - 1, col + 1), game.idx(row, col - 1), game.idx(row, col + 1), game.idx(row + 1, col - 1), game.idx(row + 1, col), game.idx(row + 1, col + 1),]
        .filter(c => c >= 0)
    let mines = 0
    for (const i of nearCells) {
        if (game.mines.includes(i)) {
            mines++
        }
    }
    if (mines) {
        game.counts.push([idx, mines])
    } else {
        for (const i of nearCells) {
            if (!game.turns.includes(i)) {
                minesweeperCheckCell(game, i)
            }
        }
    }
}
