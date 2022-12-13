export const evaluateLogImportance = (text:string) => {
    if (text.search(/break/) > -1 || text.search(/two people/) > -1 || text.search(/2 people/) > -1) {
        return 'high';
    }
    else if (text.search(/late/) > -1) {
        return 'medium';
    }
    else return 'low';
}