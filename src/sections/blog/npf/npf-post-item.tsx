import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fDate } from 'src/utils/format-time';

import Image from 'src/components/image';
import TextMaxLine from 'src/components/text-max-line';

import { IBlogPostProps } from 'src/types/blog';

import PostTimeBlock from '../common/post-time-block';

// ----------------------------------------------------------------------

type Props = {
  post: IBlogPostProps;
};

export default function NpfPostItem({ post }: Props) {
  return (
    <Stack spacing={2.5}>
      <Image src={post.cover} alt={post.title} ratio="1/1" sx={{ borderRadius: 2 }} />

      <Stack spacing={1}>
        <PostTimeBlock created_at={fDate(post.created_at)} duration={post.duration} />

        <Link component={RouterLink} href={paths.post(post.slug)} color="inherit">
          <TextMaxLine variant="h5" persistent>
            {post.title}
          </TextMaxLine>
        </Link>
      </Stack>

      <Stack direction="row" alignItems="center" sx={{ typography: 'body2' }}>
        <Avatar src={post.author.avatar} sx={{ mr: 1 }} />
        {post.author.name}
      </Stack>
    </Stack>
  );
}
