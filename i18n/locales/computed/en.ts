import ru from '../ru.json'

const en: Record<string, any> = {}
for (const key in ru) {
    en[key] = key
}
export default en