This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Hi, this is Robert Henderson's Magic Eden take home project. You are accessing this repo from a zip file, downloaded from my private repo on [GitHub](https://github.com/roberthenderson).

Please run the following commands:

```bash
# Install dependecies
yarn

# Build the app
yarn build

# Start the app
yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

If you'd like to run the development server:

```bash
yarn dev
```

There are jest tests included with each component. To run the tests:

```bash
yarn test
```

## Overview

I used Next.js because I'm used to building with it, and feel it is one of the better solutions for bootstrapping a React app with Typescript. This is Next.js 13 so you may notice some slight structural differences if you're used to Next.js 12 or lower. The biggest differences are around routing/page structure and utilizing server components. All my components are client components for this project, however.

It might be considered overkill to use Next.js for this project because there is no routing, no server-side rendering, no server components, and no deployments (Next.js works really well with Vercel). However, I do get to build an optimized app that's easy to bootstrap.

I structured the project like I'm used to with root-level directories for `components`, `hooks`, etc. Each component has its own directory so it can house the `__tests__` directory. This keeps tests scoped to the components they belong to which makes it easier to understand the test.

I tried to keep each component as dumb as possible. Other than `TopSearch` which sets Recoil state, they all are pretty presentational. I also broke the components down like they are (search, grid, nft, message) because it makes it much easier to test them individually.

The API logic is abstracted into `./hooks/useMeNfts`. In order to paginate, I am incrementing the `offset` param because the `cursor` is not working for me. [This request](https://api-mainnet.magiceden.io/idxv2/getListedNftsByCollectionSymbol?collectionSymbol=okay_bears&limit=20&offset=0) is the endpoint given in the project description and has a `nextCursor`. When you try to use the value (i.e. `?collectionSymbol=okay_bears&cursor=<value>`), [it responds](https://api-mainnet.magiceden.io/idxv2/getListedNftsByCollectionSymbol?collectionSymbol=okay_bears&limit=20&cursor=K49rR85xPPEinifbaQjUdspDsSd5nSAciezWq3S19Nk) with "Internal Error".

### Styling

[`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) defaults to using [TailwindCSS](https://tailwindcss.com/). I like Tailwind's approach to styling. I've used many CSS frameworks/preprocessors/etc over the past decade, but I find using class name styling the most intuitive. Most recently, I was using Chakra UI, but I don't like how they use Props for styling.

The app is responsive, and the virtualization should work well when the window is resized.

## Project Requirements and Solutions

I'm listing out the requirements and then my solutions from the project document sent to me in order to make sure I've completed them all:

1. Use React and typescript with proper typings
   - This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
   - Typescript is used throughout the project with proper typings
2. Virtualize the grid to improve performance
   - I used [`react-virtuoso`](https://virtuoso.dev/) for virtualization. In `./components/NftGrid`, you'll see it's consumed. I chose `react-virtuoso` because it has both virtualization and infinite loading support.
   - For infinite loading, I am using `react-query`. The `useInfiniteQuery` hook allows me to pass a data fetch method (I used `fetch`) that is called whenever the user scrolls to the end of the grid and increments the API's `offset` parameter to fetch the next set of results. You can see the implementation in `./hooks/useMeNfts`, and it's consumed in `./components/NftGrid`.
   - I used `react-query` rather than simply calling the API and concatenating subsequent responses to previous ones because it gives me free caching, and other performance optimizations for free. It also allows me to easily retry failures easily.
3. Add a search bar that filter NFTs on client side, only the nfts match the search string should show up
   - The search is made up of a component (`./components/TopSearch`), and [Recoil](https://recoiljs.org/) state. I like Recoil because it's simple shared global state which fits my needs for powering a simple search.
   - Since the `TopSearch` component sets the search term, but the `NftGrid` components ends up rendering the filtered NFTs, Recoil fits the bill.
4. Retry on api failure since it’s public faced and have rate limit
   - With `react-query`, I can pass a `retry: number` param to `useInfiniteQuery` which will keep retrying until successful up to the number of times I define.
