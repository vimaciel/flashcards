export const isObjectEmpty = (obj) => {
    return obj && Object.keys(obj).length === 0
}

export const buildDeckSubtitle = ({ questions }) => {
    const cardsNumber = questions.length

    if (cardsNumber === 0) {
        return 'no cards'
    }

    return `${cardsNumber} ${cardsNumber === 1 ? 'card' : 'cards'}`
}

export const formatTimeStamp = (timestamp) => {
    function dataAdjustment(data) {
        if (data <= 9) {
            return `0${data}`
        }

        return data
    }

    const date = new Date(timestamp);
    const month = dataAdjustment(date.getMonth() + 1)
    const day = dataAdjustment(date.getDate())
    const year = date.getFullYear()
    const hour = dataAdjustment(date.getUTCHours())
    const minutes = dataAdjustment(date.getMinutes())

    return {
        date: `${month}/${day}/${year}`,
        time: `${hour}:${minutes}`
    }
}