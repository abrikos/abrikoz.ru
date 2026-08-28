import ru from '../ru.json'

const en: Record<string, any> = {}
for (const key in ru) {
    en[key] = key
}
en.$vuetify = {
    "noDataText": "No data found",
    "dataTable": {
        "sortBy": "Sort by"
    },
    "dataFooter": {
        "pageText": "Pages",
        "itemsPerPageText": "Items per page",
        "itemsPerPageAll": "All items",
        "lastPage": "Last page",
        "nextPage": "Next page",
        "firstPage": "First page",
        "prevPage": "prev page"
    },
    "pagination": {
        "ariaLabel": {
            "root": ""
        }
    },
    "input": {
        "clear": "Отчистить"
    }
}
export default en