import DiscogResponse from '@/types/DiscogResponse'
import SearchParams from '@/types/SearchParams'

const DISCOGS_KEY = process.env.DISCOGS_CONSUMER_KEY
const DISCOGS_SECRET = process.env.DISCOGS_SECRET

const fetchRecordCollection = async (
  searchParams: SearchParams
): Promise<DiscogResponse> => {
  const { page, perPage, sort, sortOrder } = searchParams

  try {
    const res = await fetch(
      `https://api.discogs.com/users/munkle/collection/folders/0/releases?page=${page}&per_page=${perPage}&sort=${sort}&sort_order=${sortOrder}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Discogs key=${DISCOGS_KEY}, secret=${DISCOGS_SECRET}`,
        },
      }
    )

    const data = await res.json()

    // Simulate a delay
    // await new Promise((resolve) => setTimeout(resolve, 1000)) // 1000 milliseconds delay

    const { message } = data

    if (message) {
      throw new Error(message)
    }

    return data
  } catch (err) {
    console.log(err)
    throw new Error('Failed to fetch data from Discogs API' + err)
  }
}

export { fetchRecordCollection }
