export const parseTime = (time:string) => {
    const d = new Date(time);
    const dateTimeGr = time.split('T');
    const dateGr = dateTimeGr[0].split('-');
    const timeGr = dateTimeGr[1].split(':');

    const year = dateGr[0];
    const month = dateGr[1] + 1;
    const day = dateGr[2];

    const hour = timeGr[0];
    const minute = timeGr[1];

    return {
        year: d.getFullYear(),
        month: d.getMonth(),
        day: d.getDate(),

        hour: d.getHours(),
        minute: d.getMinutes(),

        date: d.getDate() + '-' + String(d.getMonth() + 1) + '-' + d.getFullYear(),
        time: d.getHours() + ':' + d.getMinutes(),
    }
}