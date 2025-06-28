// src/pages/[...slug].js

import { StoryblokComponent, useStoryblokState, getStoryblokApi } from '@storyblok/react';

export default function DynamicPage({ story }) {
  // This hook enables live updates in the Storyblok Visual Editor
  const liveStory = useStoryblokState(story);

  if (!liveStory?.content) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <StoryblokComponent blok={liveStory.content} />
    </main>
  );
}

export async function getStaticProps({ params }) {
  const slug = params?.slug ? params.slug.join('/') : 'home';
  const storyblokApi = getStoryblokApi();
  const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
    version: 'draft', // Always fetch draft for live editing
  });

  return {
    props: {
      story: data.story,
    },
    revalidate: 3600, // ISR: Regenerate every hour
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking', // Generate pages on-demand
  };
}
