import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

export function useThemeMode() {
  const context = useContext(ThemeContext);
  return context;
}
