export const formatDate = (date) => {
    if (!date) return 'no data'

    const today = new Date()
    const currentDateDay = new Date(date)

    const formattedDate = new Intl.DateTimeFormat('en-En', {
        hour: 'numeric',
        minute: 'numeric',
        month: 'long',
        hourCycle: 'h23',
        day: 'numeric',
    })
        .format(currentDateDay)
        .replace(' at ', ', ')

    if (today.toDateString() === currentDateDay.toDateString()) {
        return formattedDate.replace(
            new Intl.DateTimeFormat('en-En', { month: 'long' }).format(today),
            'Today'
        )
    }

    return formattedDate
}
