import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';

import { THEME } from '@theme/theme';

export const Icon = styled(MaterialIcons).attrs(() => ({
  size: 24,
  color: THEME.colors.white,
}))``;
