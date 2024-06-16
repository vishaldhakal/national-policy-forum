'use-client';

import { getTags } from 'src/actions/tag';
import { getCategoriesNameOnly } from 'src/actions/categories';
import { getLatestPublication, getSinglePublication } from 'src/actions/publications';

import PostView from 'src/sections/_posts/view/post-view';

// ----------------------------------------------------------------------

export async function generateMetadata({ params }: { params: { id: string } }) {
  const publication = await getSinglePublication(params.id);

  return {
    title: `${publication.title} | National Policy Forum`,
    description: publication.description,
    image: publication.image,
  };
}

export const revalidate = 10;

export default async function TravelPostPage({ params }: { params: { id: string } }) {
  const publication = await getSinglePublication(params.id);
  const recentPublication = await getLatestPublication();
  const tags: string[] = await getTags();
  const categories: string[] = await getCategoriesNameOnly();

  return (
    <PostView
      categories={categories}
      tags={tags}
      post={publication}
      recentPosts={recentPublication}
    />
  );
}
