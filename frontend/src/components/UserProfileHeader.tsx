import { THEME } from '@/constants/theme';
import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';

interface Props {
  name: string;
}

const UserProfileHeader: React.FC<Props> = ({ name }) => (
  <Box display="flex" alignItems="center" sx={{ gap: THEME.SPACING.SM }}>
    <Typography variant={THEME.TYPOGRAPHY.BODY}>{name}</Typography>
    <Avatar>{name.charAt(0).toUpperCase()}</Avatar>
  </Box>
);

export default UserProfileHeader;
