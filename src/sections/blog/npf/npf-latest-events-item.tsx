import { m } from 'framer-motion';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { alpha, useTheme } from '@mui/material/styles';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fDate } from 'src/utils/format-time';

import Image from 'src/components/image';
import { varHover, varTranHover } from 'src/components/animate';

import { IPublicationProps } from 'src/types/blog';

import PostTimeBlock from '../common/post-time-block';

// ----------------------------------------------------------------------

type Props = {
  post: IPublicationProps;
};

export default function NpfLatestEventsItem({ post }: Props) {
  const theme = useTheme();

  return (
    <Stack
      component={m.div}
      whileHover="hover"
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        position: 'relative',
        boxShadow: theme.customShadows.z12,
      }}
    >
      <m.div variants={varHover(1.25)} transition={varTranHover()}>
        <Image
          src={post.cover}
          alt={post.title}
          ratio="3/4"
          overlay={`linear-gradient(to top, ${alpha(theme.palette.common.black, 0)} 0%, ${
            theme.palette.common.black
          } 75%)`}
        />
      </m.div>

      <Stack
        justifyContent="space-between"
        sx={{
          p: 5,
          width: 1,
          height: 1,
          zIndex: 9,
          position: 'absolute',
          color: 'common.white',
        }}
      >
        <Stack spacing={2}>
          <PostTimeBlock
            created_at={fDate(post.created_at)}
            duration={post.duration}
            sx={{ color: 'inherit', opacity: 0.72 }}
          />

          <Link
            component={RouterLink}
            href={paths.publication(post.id)}
            variant="h4"
            color="inherit"
            underline="none"
          >
            {post.title}
          </Link>
        </Stack>

        <Stack direction="row" alignItems="center" sx={{ typography: 'body2' }}>
          <Avatar src={post.author.avatar} sx={{ mr: 1 }} />
          {post.author.name}
        </Stack>
      </Stack>
    </Stack>
  );
}