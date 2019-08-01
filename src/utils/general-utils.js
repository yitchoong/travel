export const formatNumber = (number, dp=0, locale='en-SG')=> {
    const fmtter = new Intl.NumberFormat(locale, {style:'decimal', minimumFractionDigits:dp})
    return fmtter.format(number)
}

