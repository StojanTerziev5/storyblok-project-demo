import '@/styles/globals.css';
import { storyblokInit, apiPlugin } from '@storyblok/react';
import Page from '@/components/Page';

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_API_TOKEN,
  use: [apiPlugin],
  components: {
    page: Page,
  },
});

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}



