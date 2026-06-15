import useSWR from "swr"

const fetcher = async (url) => {
    const res = await fetch(url)
    if (!res.ok) {
        throw new Error('An error occurred while fetching the data.')
    }
    const rawData = await res.json()

    const dateMap = {}
    rawData.forEach(element => {
        if (!dateMap[element.date]) {
            dateMap[element.date] = { 'USD': 1 }
        }
        dateMap[element.date][element.quote] = element.rate
    });

    const sortedDates = Object.keys(dateMap).sort()

    const ratesArray = sortedDates.map(date => ({
        date,
        rates: dateMap[date]
    }))

    return ratesArray
}

export default function useCurrencyRates() {
    const getPastDateString = (daysAgo) => {
        const d = new Date();
        d.setDate(d.getDate() - daysAgo);
        return d.toISOString().split("T")[0];
    };

    const toDate = getPastDateString(0);
    const fromDate = getPastDateString(7);
    const url = `https://api.frankfurter.dev/v2/rates?from=${fromDate}&to=${toDate}&base=USD`

    const { data, error, isLoading } = useSWR(url, fetcher)

    return { data, error, isLoading }
}