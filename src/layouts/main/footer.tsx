import Link from '@mui/material/Link';
import Masonry from '@mui/lab/Masonry';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import { WEBSITE_CONFIG } from 'src/config-global';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

import ContactInfo from 'src/sections/_npf/contact/contact-info';

import { NavSubListProps } from './nav/types';
import { pageLinks, navConfig } from './config-navigation';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function Footer() {
  const mdUp = useResponsive('up', 'md');

  const mobileList = navConfig.find((i) => i.title === 'Pages')?.children || [];

  const desktopList = pageLinks.sort((listA, listB) => Number(listA.order) - Number(listB.order));

  const renderLists = mdUp ? desktopList : mobileList;

  const mainFooter = (
    <>
      <ContactInfo />
      <Divider />

      <Container
        sx={{
          overflow: 'hidden',
          py: { xs: 8, md: 10 },
        }}
      >
        <Grid container spacing={3} justifyContent={{ md: 'space-between' }}>
          <Grid xs={12} md={4}>
            <Stack spacing={{ xs: 3, md: 5 }}>
              <Stack alignItems="flex-start" spacing={3}>
                <Logo />

                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  The National Policy Forum (NPF), established in 2024 and registered under the
                  Companies Act, is a consulting agency dedicated to educating and gathering
                  opinions on public affairs in Nepal. NPF promotes good governance, evidence-based
                  decision-making, and civic awareness across the country. By fostering informed
                  discourse, NPF aims to cultivate a more engaged and knowledgeable society, driving
                  positive change and sustainable, inclusive national development.
                </Typography>
              </Stack>

              <Stack spacing={2}>
                <Stack spacing={1}>
                  <Typography variant="h6">Contact Us</Typography>
                  <Link href="mailto:nnopolicyforum@gmail.com" color="inherit">
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      nnpolicyforum@gmail.com
                    </Typography>
                  </Link>
                  <Link href="tel:+977-9767276347" color="inherit">
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      +977-9767276347
                    </Typography>
                  </Link>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    Bharatpur, Chitwan, Nepal
                  </Typography>
                </Stack>
              </Stack>

              <Stack spacing={2}>
                <Typography variant="h6">Socials</Typography>
                <Stack direction="row" alignItems="center">
                  {WEBSITE_CONFIG.socials.map((social) => (
                    <IconButton key={social.value} color="primary">
                      <Link href={social.link}>
                        <Iconify icon={social.icon} />
                      </Link>
                    </IconButton>
                  ))}
                </Stack>
              </Stack>
            </Stack>
          </Grid>

          <Grid xs={12} md={6}>
            {mdUp ? (
              <Masonry columns={4} spacing={2} defaultColumns={4} defaultSpacing={2}>
                {renderLists.map((list) => (
                  <ListDesktop key={list.subheader} list={list} />
                ))}
              </Masonry>
            ) : (
              <Stack spacing={1.5}>
                {renderLists.map((list) => (
                  <ListMobile key={list.subheader} list={list} />
                ))}
              </Stack>
            )}
          </Grid>
        </Grid>
      </Container>

      <Divider />

      <Container>
        <Stack
          spacing={2.5}
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          sx={{ py: 3, textAlign: 'center' }}
        >
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            © {new Date().getFullYear()}. All rights reserved National Policy Forum
          </Typography>

          <Stack direction="row" spacing={3} justifyContent="center">
            <Link variant="caption" sx={{ color: 'text.secondary' }}>
              Privacy Policy
            </Link>

            <Link variant="caption" sx={{ color: 'text.secondary' }}>
              Terms and Conditions
            </Link>
          </Stack>
        </Stack>
      </Container>
    </>
  );

  return <footer>{mainFooter}</footer>;
}

// ----------------------------------------------------------------------

export function ListDesktop({ list }: { list: NavSubListProps }) {
  const pathname = usePathname();

  return (
    <Stack spacing={1.5} alignItems="flex-start">
      <Typography variant="subtitle2">{list.subheader}</Typography>

      {list.items?.map((link) => {
        const active = pathname === link.path || pathname === `${link.path}/`;

        return (
          <Link
            component={RouterLink}
            key={link.title}
            href={link.path}
            variant="caption"
            sx={{
              color: 'text.secondary',
              '&:hover': {
                color: 'text.primary',
              },
              ...(active && {
                color: 'text.primary',
                fontWeight: 'fontWeightSemiBold',
              }),
            }}
          >
            {link.title}
          </Link>
        );
      })}
    </Stack>
  );
}

// ----------------------------------------------------------------------

export function ListMobile({ list }: { list: NavSubListProps }) {
  const pathname = usePathname();

  const listExpand = useBoolean();

  return (
    <Stack spacing={1.5} alignItems="flex-start">
      <Typography
        variant="subtitle2"
        onClick={listExpand.onToggle}
        sx={{
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        {list.subheader}
        <Iconify
          width={16}
          icon={listExpand.value ? 'carbon:chevron-down' : 'carbon:chevron-right'}
          sx={{ ml: 0.5 }}
        />
      </Typography>

      <Collapse in={listExpand.value} unmountOnExit sx={{ width: 1 }}>
        <Stack spacing={1.5} alignItems="flex-start">
          {list.items?.map((link) => (
            <Link
              component={RouterLink}
              key={link.title}
              href={link.path}
              variant="caption"
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  color: 'text.primary',
                },
                ...(pathname === `${link.path}/` && {
                  color: 'text.primary',
                  fontWeight: 'fontWeightSemiBold',
                }),
              }}
            >
              {link.title}
            </Link>
          ))}
        </Stack>
      </Collapse>
    </Stack>
  );
}

// ----------------------------------------------------------------------

// function AppStoreButton({ ...other }: StackProps) {
//   return (
//     <Stack direction="row" flexWrap="wrap" spacing={2} {...other}>
//       <StyledAppStoreButton startIcon={<Iconify icon="ri:apple-fill" width={28} />}>
//         <Stack alignItems="flex-start">
//           <Typography variant="caption" sx={{ opacity: 0.72 }}>
//             Download on the
//           </Typography>

//           <Typography variant="h6" sx={{ mt: -0.5 }}>
//             Apple Store
//           </Typography>
//         </Stack>
//       </StyledAppStoreButton>

//       <StyledAppStoreButton startIcon={<Iconify icon="logos:google-play-icon" width={28} />}>
//         <Stack alignItems="flex-start">
//           <Typography variant="caption" sx={{ opacity: 0.72 }}>
//             Download from
//           </Typography>

//           <Typography variant="h6" sx={{ mt: -0.5 }}>
//             Google Play
//           </Typography>
//         </Stack>
//       </StyledAppStoreButton>
//     </Stack>
//   );
// }
