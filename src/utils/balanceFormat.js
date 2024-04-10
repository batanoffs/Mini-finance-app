export const balanceFormat = (balance) => {
    const balanceFormatted = balance.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })
    return balanceFormatted
}
