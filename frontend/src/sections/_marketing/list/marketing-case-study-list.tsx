import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { ICaseStudyProps } from 'src/types/case-study';

import MarketingCaseStudyItem from './marketing-case-study-item';

// ----------------------------------------------------------------------

type Props = {
  caseStudies: ICaseStudyProps[];
  categoriesFetched: string[];
};

export default function MarketingCaseStudyList({ caseStudies, categoriesFetched }: Props) {
  const [tab, setTab] = useState('All');


  const categories = ['All', ...Array.from(new Set(categoriesFetched))];

  const filtered = applyFilter(caseStudies, tab);

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  }, []);

  return (
    <>
      <Tabs
        value={tab}
        scrollButtons="auto"
        variant="scrollable"
        allowScrollButtonsMobile
        onChange={handleChangeTab}
      >
        {categories.map((category) => (
          <Tab key={category} value={category} label={category} />
        ))}
      </Tabs>

      <Box
        sx={{
          pt: 5,
          pb: 10,
          gap: 4,
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
        }}
      >
        {filtered.map((project) => (
          <MarketingCaseStudyItem key={project.id} project={project} />
        ))}
      </Box>

      <Pagination
        count={10}
        color="primary"
        sx={{
          pb: 10,
          [`& .${paginationClasses.ul}`]: {
            justifyContent: 'center',
          },
        }}
      />
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter(arr: ICaseStudyProps[], category: string) {
  if (category !== 'All') {
    arr = arr.filter((project) => project.category === category);
  }
  return arr;
}
