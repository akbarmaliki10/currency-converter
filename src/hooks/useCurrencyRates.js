import useSWR from "swr"

const fetcher = async (url) => {
    const res = await fetch(url)
    if (!res.ok) {
        throw new Error('An error occurred while fetching the data.')
    }
    const rawData = await res.json()
    const ratesMap = { 'USD': 1 }
    rawData.forEach(element => {
        ratesMap[element.quote] = element.rate
    });

    return ratesMap
}

export default function useCurrencyRates() {
    const { data, error, isLoading } = useSWR('https://api.frankfurter.dev/v2/rates?base=USD', fetcher)

    return { data, error, isLoading }
}