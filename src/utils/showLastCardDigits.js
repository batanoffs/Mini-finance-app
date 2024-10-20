export const showLastCardDigits = (number) => {
    if (number) {
        return number.toString().split('').splice(-4).join('')
    }
    return '****'
}
