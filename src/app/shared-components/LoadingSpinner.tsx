import { Box, CircularProgress, Typography, useTheme } from '@mui/material';

interface LoadingSpinnerProps {
  size?: number;
  text?: string;
  fullScreen?: boolean;
  color?: 'primary' | 'secondary' | 'inherit';
}

export default function LoadingSpinner({ 
  size = 40, 
  text = '', 
  fullScreen = false,
  color = 'primary' 
}: LoadingSpinnerProps) {
  const theme = useTheme();

  const containerProps = fullScreen 
    ? {
        position: 'fixed' as const,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: theme.zIndex.modal,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
      }
    : {};

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight={fullScreen ? '100vh' : '200px'}
      gap={2}
      {...containerProps}
    >
      <CircularProgress 
        size={size} 
        color={color}
        thickness={4}
      />
      {text && (
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ 
            fontWeight: 500,
            letterSpacing: '0.5px'
          }}
        >
          {text}
        </Typography>
      )}
    </Box>
  );
}