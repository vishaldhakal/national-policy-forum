'use-client';

import { Tags, getTags } from 'src/actions/tag';
import { getPosts, getSinglePost, getCategoriesNameOnly } from 'src/actions/faq';

import TravelPostView from 'src/sections/_travel/view/travel-post-view';

// ----------------------------------------------------------------------

export async function generateMetadata({ params }: { params: { id: string } }) {
  const post = await getSinglePost(params.id);

  return {
    title: `${post.title} | National Policy Forum`,
    description: post.description,
    image: post.image,
  };
}

export default async function TravelPostPage({ params }: { params: { id: string } }) {
  const post = await getSinglePost(params.id);
  const recentPosts = await getPosts();
  const tags: Tags[] = await getTags();
  const categories: string[] = await getCategoriesNameOnly();

  return (
    <TravelPostView categories={categories} tags={tags} post={post} recentPosts={recentPosts} />
  );
}
