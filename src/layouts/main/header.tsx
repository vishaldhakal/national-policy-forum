import Link from 'next/link';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import { Button, IconButton } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';
import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';

import { useGetNavlinks } from 'src/api/navlinks';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify/iconify';
import Scrollbar from 'src/components/scrollbar/scrollbar';
import MegaMenuMobile from 'src/components/mega-menu/mobile/mega-menu-mobile';
import MegaMenuDesktopHorizontal from 'src/components/mega-menu/horizontal/mega-menu-desktop-horizontal';

import { HEADER } from '../config-layout';
import HeaderShadow from '../common/header-shadow';

// ----------------------------------------------------------------------

type Props = {
  headerOnDark: boolean;
};

export const socials = [
  {
    value: 'facebook',
    label: 'FaceBook',
    icon: 'carbon:logo-facebook',
    color: '#1877F2',
    link: 'https://www.facebook.com/profile.php?id=61555066314243',
  },
  {
    value: 'instagram',
    label: 'Instagram',
    icon: 'carbon:logo-instagram',
    color: '#E02D69',
    link: 'https://www.instagram.com/nnpolicyforum/',
  },
  {
    value: 'linkedin',
    label: 'Linkedin',
    icon: 'carbon:logo-linkedin',
    color: '#007EBB',
    link: '#',
  },
  {
    value: 'twitter',
    label: 'Twitter',
    icon: 'carbon:logo-twitter',
    color: '#00AAEC',
    link: 'https://twitter.com/nnpolicyforum',
  },
];

export default function Header({ headerOnDark }: Props) {
  const theme = useTheme();

  const { navlinks, navlinksLoading } = useGetNavlinks();

  // change Nav Items to  nav items with publication and add publications to the nav items
  const NAV_ITEMS_WITH_PUBLICATIONS = NAV_ITEMS.map((item) => {
    if (item.title === 'Publications') {
      return {
        ...item,
        children: [
          {
            subheader: 'Latest Publications',
            items: navlinks.publication?.latest_publications.map((publication) => ({
              title: publication.title,
              path: publication.path,
            })),
          },
          {
            subheader: 'Featured Publications',
            items: navlinks.publication?.featured_publications.map((publication) => ({
              title: publication.title,
              path: publication.path,
            })),
          },
        ],
      };
    }
    if (item.title === 'Blogs') {
      return {
        ...item,
        children: [
          {
            subheader: 'Latest Blogs',
            items: navlinks.blog?.latest_blogs.map((blog) => ({
              title: blog.title,
              path: blog.path,
            })),
          },
          {
            subheader: 'Featured Blogs',
            items: navlinks.blog?.featured_blogs.map((blog) => ({
              title: blog.title,
              path: blog.path,
            })),
          },
        ],
      };
    }
    return item;
  });

  const pathname = usePathname();

  const offset = useOffSetTop(50);

  const mdUp = useResponsive('up', 'md');

  const mobileOpen = useBoolean();

  useEffect(() => {
    if (mobileOpen) {
      mobileOpen.onFalse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderHorizontal = (
    <>
      {mdUp && <MegaMenuDesktopHorizontal data={NAV_ITEMS_WITH_PUBLICATIONS} />}

      <Stack
        sx={{ display: { xs: 'none', md: 'flex' } }}
        spacing={2}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
      >
        <Stack direction="row">
          {socials.map((social) => (
            <Link target="_blank" rel="noopener noreferrer" href={social.link}>
              <IconButton
                key={social.value}
                sx={{ color: offset ? 'text.primary' : 'common.white' }}
              >
                <Iconify icon={social.icon} />
              </IconButton>
            </Link>
          ))}
        </Stack>
      </Stack>
    </>
  );

  const renderMobile = (
    <>
      <Button
        color="inherit"
        variant="text"
        onClick={mobileOpen.onTrue}
        startIcon={<Iconify icon="carbon:menu" />}
      />

      <Drawer
        open={mobileOpen.value}
        onClose={mobileOpen.onFalse}
        PaperProps={{
          sx: {
            pb: 5,
            width: 260,
          },
        }}
      >
        <Scrollbar>
          <Logo sx={{ mx: 2.5, my: 3 }} />

          <MegaMenuMobile data={NAV_ITEMS} />
        </Scrollbar>
      </Drawer>
    </>
  );

  if (navlinksLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AppBar>
      <Toolbar
        disableGutters
        sx={{
          flexDirection: 'column',
          display: 'flex',
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_DESKTOP,
          },
          transition: theme.transitions.create(['height', 'background-color'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(headerOnDark && {
            color: 'common.white',
          }),
          ...(offset && {
            bgcolor: theme.palette.background.default,
            color: 'text.default',
          }),
        }}
      >
        <Container
          sx={{
            height: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            py: 1,
          }}
        >
          <Box sx={{ lineHeight: 0, position: 'relative' }}>
            <Logo />
          </Box>
          {mdUp ? renderHorizontal : renderMobile}
        </Container>
      </Toolbar>

      {offset && <HeaderShadow />}
    </AppBar>
  );
}

const NAV_ITEMS = [
  {
    title: 'Home',
    path: '/',
    icon: <Iconify icon="carbon:home" sx={{ width: 1, height: 1 }} />,
  },
  {
    title: 'About',
    path: '#',
    icon: <Iconify icon="carbon:building" sx={{ width: 1, height: 1 }} />,
    // products: [...Array(10)].map((_, index) => ({
    //   name: _mock.productName(index),
    //   cover: _mock.image.product(index),
    //   path: '#',
    // })),
    moreLink: {
      title: 'More Categories',
      path: '#',
    },
    tags: [
      { title: 'Paper Cup', path: '#' },
      { title: 'Lotion Pump', path: '#' },
      { title: 'Brush Cutter', path: '#' },
      { title: 'Display Rack', path: '#' },
      { title: 'Glass Bottle', path: '#' },
    ],
    children: [
      {
        subheader: 'Organization',
        items: [{ title: 'About Organization', path: '#' }],
      },
      {
        subheader: 'Our Teams',
        items: [
          { title: 'Board of Directors', path: '#' },
          { title: 'Advisory Board', path: '#' },
          { title: 'Founders', path: '#' },
          { title: 'Members', path: '#' },
        ],
      },
    ],
  },
  {
    title: 'Blogs',
    path: '/posts',
    icon: <Iconify icon="carbon:folder" sx={{ width: 1, height: 1 }} />,
    moreLink: {
      title: 'More Blog Articles',
      path: '#',
    },
    children: [],
  },
  {
    title: 'Publications',
    path: '/publications',
    icon: <Iconify icon="carbon:document" sx={{ width: 1, height: 1 }} />,
    children: [],
  },
  {
    title: 'People',
    path: '#',
    icon: <Iconify icon="carbon:user" sx={{ width: 1, height: 1 }} />,
    children: [
      {
        subheader: '',
        items: [
          { title: 'Metallic Processing Machinery', path: '#' },
          { title: 'Machinery for Food, Beverage & Cereal', path: '#' },
          { title: 'Laser Equipment', path: '#' },
          { title: 'Mould', path: '#' },
          { title: 'Textile Machinery & Parts', path: '#' },
          { title: 'Cutting & Fold-bend Machine', path: '#' },
          { title: 'Paper Machinery', path: '#' },
          { title: 'Rubber Machinery', path: '#' },
          { title: 'Chemical Equipment & Machinery', path: '#' },
          { title: 'Mixing Equipment', path: '#' },
          { title: 'Machinery for Garment, Shoes & Accessories', path: '#' },
          { title: 'Crushing & Culling Machine', path: '#' },
        ],
      },
    ],
  },
  {
    title: 'Events',
    path: '#',
    icon: <Iconify icon="carbon:event" sx={{ width: 1, height: 1 }} />,
    children: [
      {
        subheader: '',
        items: [
          { title: 'Metallic Processing Machinery', path: '#' },
          { title: 'Machinery for Food, Beverage & Cereal', path: '#' },
          { title: 'Laser Equipment', path: '#' },
          { title: 'Mould', path: '#' },
          { title: 'Textile Machinery & Parts', path: '#' },
          { title: 'Cutting & Fold-bend Machine', path: '#' },
          { title: 'Paper Machinery', path: '#' },
          { title: 'Rubber Machinery', path: '#' },
          { title: 'Chemical Equipment & Machinery', path: '#' },
          { title: 'Mixing Equipment', path: '#' },
          { title: 'Machinery for Garment, Shoes & Accessories', path: '#' },
          { title: 'Crushing & Culling Machine', path: '#' },
        ],
      },
    ],
  },
];