import Box from '@mui/material/Box';

import EmptyView from 'src/sections/error/empty-view';

import { IBlogPostProps } from 'src/types/blog';

import PostItem from './npf-post-item';

// ----------------------------------------------------------------------

type Props = {
  posts: IBlogPostProps[];
};

export default function NpfPosts({ posts }: Props) {
  if (posts?.length === 0) {
    return <EmptyView />;
  }

  return (
    <Box
      sx={{
        columnGap: 4,
        display: 'grid',
        rowGap: { xs: 4, md: 5 },
        gridTemplateColumns: {
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
        },
      }}
    >
      {posts.slice(0, 8).map((post) => (
        <PostItem key={post.slug} post={post} />
      ))}
    </Box>
  );
}
