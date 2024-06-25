import CollectionPage  from "@/components/collection-page"
import DiscogResponse from "@/types/DiscogResponse"

// http://localhost:3000/?page=2&perPage=48&sort=artist&sortOrder=asc

interface SearchParams {
  page: string;
  perPage: string;
  sort: string;
  sortOrder: string;
}

export default async function Home({ searchParams } : { searchParams: SearchParams }) {
  const { page = 1, perPage = 40, sort = 'artist', sortOrder = 'asc' } = searchParams;


  const DISCOGS_KEY = process.env.DISCOGS_CONSUMER_KEY;
  const DISCOGS_SECRET = process.env.DISCOGS_SECRET;

  const callAPI = async (): Promise<DiscogResponse> => {
    try {
        const res = await fetch(
            `https://api.discogs.com/users/munkle/collection/folders/0/releases?page=${page}&per_page=${perPage}&sort=${sort}&sort_order=${sortOrder}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Discogs key=${DISCOGS_KEY}, secret=${DISCOGS_SECRET}`
                }
            }
        );
        const data = await res.json();

        return data;
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch data from Discogs API");
    }
  };


  const res = await callAPI();

  const { pagination, releases } = res;

  console.log('Pagination', pagination);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CollectionPage pagination={pagination} releases={releases} />
    </main>
  );
}
