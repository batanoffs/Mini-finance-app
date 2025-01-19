export const formatDateTable = (date) => {
    return new Intl.DateTimeFormat('en-En', {
        hour: 'numeric',
        minute: 'numeric',
        hourCycle: 'h23',
        month: 'long',
        day: 'numeric',
    })
        .format(new Date(date))
        .split(' ')
        .slice(0, 4)
        .join(' ')
        .replace(' at', ',');
};
