'use client';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { _caseStudies, _testimonials, _marketingPosts } from 'src/_mock';

import MarketingNewsletter from '../marketing-newsletter';
import MarketingCaseStudyList from '../list/marketing-case-study-list';
import MarketingTestimonial from '../testimonial/marketing-testimonial';
import MarketingLandingFreeSEO from '../landing/marketing-landing-free-seo';
import BlogMarketingLatestPosts from '../../blog/marketing/marketing-latest-posts';
import { IPublicationProps } from 'src/types/blog';
import { Category } from 'src/actions/categories';

// ----------------------------------------------------------------------
type MarketingCaseStudiesViewProps = {
  category: string[];
};
export default function MarketingCaseStudiesView({ category }: MarketingCaseStudiesViewProps) {
  return (
    <>
      <Container>
        <Stack
          spacing={3}
          sx={{
            py: 5,
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Typography variant="h2">Our Publications</Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            Nullam tincidunt adipiscing enim.
            <br /> Mauris sollicitudin fermentum libero.
          </Typography>
        </Stack>

        <MarketingCaseStudyList caseStudies={_caseStudies} categoriesFetched={category} />
      </Container>

      <MarketingTestimonial testimonials={_testimonials} />

      <BlogMarketingLatestPosts posts={_marketingPosts.slice(0, 4)} />

      <MarketingLandingFreeSEO />

      <MarketingNewsletter />
    </>
  );
}
