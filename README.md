# Discogs Record Collection

This application is developed using Next.js and TypeScript, with Tailwind CSS for styling. It utilizes the Discogs API to retrieve and showcase a paginated display of my vinyl records collection. Secure access is guaranteed through HTTP header-based authentication. The application is hosted on Vercel and accessible at [https://record-collection-vert.vercel.app/](https://record-collection-vert.vercel.app/).

## Features

- **Next.js**: A React framework that enables functionality such as server-side rendering and generating static websites for React-based web applications.
- **TypeScript**: A superset of JavaScript that adds static type definitions, enhancing the development experience with type safety and powerful tooling.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs with a mobile-first approach.
- **Discogs API**: Integration with the Discogs API to fetch details about my record collection.
- **Pagination**: Display of the record collection in a paginated format for easy navigation and viewing.
- **Image Load** A React component that observes an image for loading, retries on error with exponential backoff, and falls back to a default image after maximum attempts.
- **Vercel Deployment**: The application is deployed on Vercel, offering high performance and scalability.

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/matthew-french/record-collection.git
cd record-collection
```

2. Install Dependacies:

```bash
yarn install
```

3. Set up environment variables:

Create a .env file at the root of your project and add the necessary API keys and secrets for Discogs API.

You can get your Discogs Consumer Key and Secret by registering the app here: [https://www.discogs.com/settings/developers](https://www.discogs.com/settings/developers)

```bash
DISCOGS_CONSUMER_KEY=abcdf12345
DISCOGS_SECRET=abcdf12345
```

4. Run the development server:

```bash
yarn dev
```

Open http://localhost:3000 with your browser to see the result.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

License
This project is open source and available under the MIT License.
