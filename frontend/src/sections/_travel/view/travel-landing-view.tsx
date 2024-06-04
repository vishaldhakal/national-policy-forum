'use client';

import MarketingTestimonial from 'src/sections/_marketing/testimonial/marketing-testimonial';
import MarketingLandingFaqs, { Faq } from 'src/sections/_marketing/landing/marketing-landing-faqs';

import { IBlogPostProps } from 'src/types/blog';
import { ITestimonialProps } from 'src/types/testimonial';

import TravelNewsletter from '../travel-newsletter';
import TravelLandingHero from '../landing/travel-landing-hero';
import BlogTravelLandingLatestPosts from '../../blog/travel/travel-landing-posts';

// ----------------------------------------------------------------------
type TravelLandingViewProps = {
  faqs: Faq[];
  testimonials: ITestimonialProps[];
  featured_posts: IBlogPostProps[];
  latest_posts: IBlogPostProps[];
};

export default function TravelLandingView({ faqs, testimonials, featured_posts, latest_posts }: TravelLandingViewProps) {
  return (
    <>
      <TravelLandingHero articles={featured_posts} />

      <BlogTravelLandingLatestPosts posts={latest_posts} />

      <MarketingTestimonial testimonials={testimonials} />

      <MarketingLandingFaqs faqs={faqs} />

      <TravelNewsletter />
    </>
  );
}
