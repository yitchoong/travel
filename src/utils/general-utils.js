export const formatNumber = (number, dp=0, locale='en-SG')=> {        
    const fmtter = new Intl.NumberFormat(locale, {style:'decimal', minimumFractionDigits:dp})
    return fmtter.format(number)
    // return fmtter.format(dp === 0 ? Math.floor(number) : number)
}

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export const range = n => Array(n + 1).join(1).split('').map((x, i) => i) // range(3) => gives us [0,1,2]
