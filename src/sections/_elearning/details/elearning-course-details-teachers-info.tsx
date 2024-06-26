import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { fShortenNumber } from 'src/utils/format-number';

import Iconify from 'src/components/iconify';

import { ICourseTeacherProp } from 'src/types/course';

// ----------------------------------------------------------------------

type Props = {
  teachers: ICourseTeacherProp[];
};

export default function ElearningCourseDetailsTeachersInfo({ teachers = [] }: Props) {
  return (
    <>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Instructors ({teachers.length})
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gap: { xs: 3, md: 4 },
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            lg: 'repeat(2, 1fr)',
          },
        }}
      >
        {teachers.map((teacher) => (
          <TeacherItem key={teacher.id} teacher={teacher} />
        ))}
      </Box>
    </>
  );
}

// ----------------------------------------------------------------------

type TeacherItemProps = {
  teacher: ICourseTeacherProp;
};

function TeacherItem({ teacher }: TeacherItemProps) {
  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
      <Stack direction="row" spacing={3} flexWrap="wrap">
        <Avatar src={teacher.avatar} sx={{ width: 72, height: 72 }} />

        <Stack spacing={1} flexGrow={1}>
          <Stack spacing={0.5}>
            <Typography variant="h6">{teacher.name}</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {teacher.role}
            </Typography>
          </Stack>

          <Stack spacing={0.5} direction="row" alignItems="center">
            <Iconify icon="carbon:star-filled" sx={{ color: 'warning.main' }} />
            <Box sx={{ typography: 'h6' }}>
              {Number.isInteger(teacher.ratingNumber)
                ? `${teacher.ratingNumber}.0`
                : teacher.ratingNumber}
            </Box>

            {teacher.totalReviews && (
              <Link variant="body2" sx={{ color: 'text.secondary' }}>
                ({fShortenNumber(teacher.totalReviews)} reviews)
              </Link>
            )}
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            sx={{ typography: 'body2', color: 'text.disabled' }}
          >
            <Iconify icon="carbon:events" sx={{ mr: 1 }} />
            <Box component="strong" sx={{ mr: 0.25 }}>
              {fShortenNumber(teacher.totalStudents)}
            </Box>
            Students
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            sx={{ typography: 'body2', color: 'text.disabled' }}
          >
            <Iconify icon="carbon:notebook" sx={{ mr: 1 }} />
            <Box component="strong" sx={{ mr: 0.25 }}>
              {teacher.totalCourses}
            </Box>
            Lessons
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
}
