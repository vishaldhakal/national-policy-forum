import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { alpha, useTheme } from '@mui/material/styles';

import Image from 'src/components/image';
import Carousel, { useCarousel, CarouselDots, CarouselArrows } from 'src/components/carousel';

import { IBlogPostProps } from 'src/types/blog';

import MarketingFeaturedPostItem from './marketing-featured-post-item';

// ----------------------------------------------------------------------

type Props = {
  posts: IBlogPostProps[];
};

export default function MarketingFeaturedPosts({ posts }: Props) {
  const theme = useTheme();

  const carousel = useCarousel({
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    ...CarouselDots({
      rounded: true,
      sx: { mt: 5 },
    }),
  });

  return (
    <Box
      sx={{
        py: 10,
        pt: { md: 15 },
        position: 'relative',
        '& .slick-list': {
          borderRadius: 2,
        },
      }}
    >
      <Container sx={{ position: 'relative', zIndex: 9 }}>
        <CarouselArrows
          onNext={carousel.onNext}
          onPrev={carousel.onPrev}
          leftButtonProps={{
            sx: {
              mt: -8,
              left: 2,
              opacity: 1,
              color: 'common.white',
              bgcolor: 'primary.main',
              '&:hover': { bgcolor: 'primary.main' },
            },
          }}
          rightButtonProps={{
            sx: {
              mt: -8,
              right: 2,
              opacity: 1,
              color: 'common.white',
              bgcolor: 'primary.main',
              '&:hover': { bgcolor: 'primary.main' },
            },
          }}
        >
          <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
            {posts.map((post) => (
              <MarketingFeaturedPostItem key={post.slug} post={post} />
            ))}
          </Carousel>
        </CarouselArrows>
      </Container>

      {posts.map(
        (post, index) =>
          carousel.currentIndex === index && (
            <Image
              key={post.slug}
              alt="post cover"
              src={post.cover}
              overlay={`linear-gradient(to bottom, ${alpha(theme.palette.common.black, 0)} 0%, ${
                theme.palette.common.black
              } 75%)`}
              sx={{ position: 'absolute', top: 0, width: 1, height: 1 }}
            />
          )
      )}
    </Box>
  );
}
