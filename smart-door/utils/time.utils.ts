export const parseTime = (time:string) => {
    const dateTimeGr = time.split('T');
    const dateGr = dateTimeGr[0].split('-');
    const timeGr = dateTimeGr[1].split(':');

    const year = dateGr[0];
    const month = dateGr[1];
    const day = dateGr[2];

    const hour = timeGr[0];
    const minute = timeGr[1];

    return {
        year,
        month,
        day,

        hour,
        minute,

        date: day + '-' + month + '-' + year,
        time: hour + ':' + minute,
    }
}