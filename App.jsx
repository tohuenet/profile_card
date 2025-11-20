import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Paper,
  Typography,
  Avatar,
  IconButton,
  Stack,
  Fade,
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import {
  PlayArrowRounded,
  PauseRounded,
  MusicNoteRounded,
  WbSunnyRounded,
  DarkModeRounded,
  
  CallRounded, 
  MailRounded,
  SmsRounded, 
  Telegram, 
} from '@mui/icons-material';

// Import ảnh và nhạc cục bộ
// Vui lòng đảm bảo các file này tồn tại trong thư mục src:
// import avatar from './avatar.jpg';
// import musicFile from './music.mp3';
// Tạm thời dùng placeholder nếu file chưa có
// const avatar = 'https://via.placeholder.com/110/333333/FFFFFF?text=AV'; 
const avatar = './avatar.jpg'; 
const musicFile = './music.mp3'; 


// --- 1. Animations & Keyframes ---

const bounceInUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(60px); 
  }
  60% {
    opacity: 1;
    transform: translateY(-10px); 
  }
  100% {
    transform: translateY(0); 
  }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-8px); }
  60% { transform: translateY(-4px); }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// --- 2. Styled Components & Logic ---

// Hàm tạo Glassmorphism Base Style để đảm bảo đồng nhất
const glassBaseStyles = (theme) => ({
    // Màu nền Glassmorphism đồng nhất cho cả Light/Dark Mode
    background: theme.palette.mode === 'dark' 
        ? 'rgba(255, 255, 255, 0.15)' // Trắng mờ trong Dark Mode
        : 'rgba(255, 255, 255, 0.45)', // Trắng mờ hơn trong Light Mode
    
    backdropFilter: 'blur(10px)',
    border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 0.3)'}`,
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
    transition: 'all 0.3s ease',
});

// Widget Nhạc (Glassmorphism)
const MusicWidget = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 20,
  right: 20,
  ...glassBaseStyles(theme), 
  borderRadius: '20px',
  padding: '6px 12px 6px 8px',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  zIndex: 2,
  maxWidth: 220,
  '&:hover': {
    transform: 'scale(1.02)',
    background: theme.palette.mode === 'dark' 
    ? 'rgba(255, 255, 255, 0.25)' 
    : 'rgba(255, 255, 255, 0.65)',
  }
}));

const MusicIconContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isPlaying',
})(({ isPlaying }) => ({
  width: 40,
  height: 40,
  borderRadius: '50%',
  background: 'none', 
  border: 'none',    
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  color: '#ffffff',
  fontSize: '24px', 
  animation: isPlaying ? `${bounce} 1.5s ease-in-out infinite` : 'none',
  transition: 'transform 0.3s ease-out' 
}));

// Action Button Item (Với Glassmorphism đồng nhất và Link)
const ActionItem = ({ icon, label, color, href, theme }) => (
  <Stack 
    component="a" 
    href={href} 
    target="_blank" 
    alignItems="center" 
    spacing={0.8} 
    sx={{ 
      cursor: 'pointer', 
      transition: 'transform 0.2s',
      textDecoration: 'none', 
      '&:hover': { transform: 'translateY(-4px)' } 
    }}
  >
    <Box
      sx={{
        width: 48,
        height: 48,
        borderRadius: '16px',
        ...glassBaseStyles(theme), // Áp dụng Glassmorphism base đồng nhất
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: color,
        '&:hover': {
             // Nền mờ hơn khi hover
             background: theme.palette.mode === 'dark' 
                 ? 'rgba(255, 255, 255, 0.25)' 
                 : 'rgba(255, 255, 255, 0.65)',
        }
      }}
    >
      {icon}
    </Box>
    <Typography 
        variant="caption" 
        sx={{ 
            fontWeight: 500, 
            color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'text.secondary' 
        }}
    >
      {label}
    </Typography>
  </Stack>
);

// --- 3. Music Player Component (giữ nguyên logic) ---

const ActiveMusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false); 
  const audioRef = useRef(null);

  const handleTogglePlay = () => {
      const newState = !isPlaying;
      setIsPlaying(newState); 
      
      if (audioRef.current) {
          if (newState) {
              audioRef.current.play().catch(e => console.error("Error playing audio:", e));
          } else {
              audioRef.current.pause();
          }
      }
  };

  return (
    <MusicWidget>
      <audio ref={audioRef} src={musicFile} loop muted={false} />

      <MusicIconContainer isPlaying={isPlaying}>
        <MusicNoteRounded fontSize="inherit" />
      </MusicIconContainer>
      <Box sx={{ overflow: 'hidden' }}>
        <Typography 
          variant="caption" 
          sx={{ fontWeight: 700, display: 'block', lineHeight: 1, color: '#fff' }}
          noWrap
        >
          BẤT QUÁ NHÂN GIAN
        </Typography>
        <Typography 
          variant="caption" 
          sx={{ fontSize: '0.65rem', opacity: 0.9, color: '#eee' }}
          noWrap
        >
          Chu Thúy Quỳnh
        </Typography>
      </Box>
      <IconButton 
        size="small" 
        onClick={handleTogglePlay} 
        sx={{ color: '#fff', ml: 0.5, '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}
      >
        {isPlaying ? <PauseRounded fontSize="small" /> : <PlayArrowRounded fontSize="small" />}
      </IconButton>
    </MusicWidget>
  );
};

// --- 4. Main Application (Đã thêm logic lưu trữ và đọc chế độ hệ thống) ---

// Hàm lấy chế độ ban đầu từ Local Storage hoặc hệ thống
const getInitialMode = () => {
    // 1. Kiểm tra Local Storage
    if (typeof window !== 'undefined') {
        const savedMode = localStorage.getItem('themeMode');
        if (savedMode) {
            return savedMode;
        }
    
        // 2. Kiểm tra chế độ hệ thống (System Preference)
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDark ? 'dark' : 'light';
    }
    // 3. Mặc định
    return 'light'; 
};

export default function ProfilePageV7() {
  const [mode, setMode] = useState(getInitialMode);

  // Hàm xử lý chuyển đổi chế độ và lưu vào Local Storage
  const handleModeToggle = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode); // Lưu vào Local Storage
  };

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: { main: '#2979ff' },
      background: {
        default: mode === 'dark' ? '#000000' : '#f5f5f7',
        paper: mode === 'dark' ? '#1c1c1e' : '#ffffff',
      },
    },
    typography: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    },
    shape: { borderRadius: 24 },
  }), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      <Box sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        position: 'relative',
        overflow: 'hidden'
      }}>
        
        {/* UI Controls (Dark Mode Icon Toggle) */}
        <Box sx={{ position: 'absolute', top: 24, right: 24, zIndex: 100 }}>
           
           <IconButton
              onClick={handleModeToggle} // Dùng handler mới
              sx={{
                ...glassBaseStyles(theme), 
                
                color: mode === 'dark' ? '#FFD700' : '#333', 
                p: 1.5,
                borderRadius: '50%',
                
                '&:hover': {
                    transform: 'scale(1.1)',
                    background: theme.palette.mode === 'dark' 
                        ? 'rgba(255, 255, 255, 0.3)' 
                        : 'rgba(255, 255, 255, 0.65)',  
                    backdropFilter: 'blur(12px)', 
                    boxShadow: 4, 
                }
              }}
            >
              {mode === 'light' ? (
                <WbSunnyRounded sx={{ fontSize: 24 }} />
              ) : (
                <DarkModeRounded sx={{ fontSize: 24 }} />
              )}
            </IconButton>
        </Box>

        {/* --- CORE UI: PROFILE CARD --- */}
        <Paper
          elevation={mode === 'dark' ? 0 : 4}
          sx={{
            width: '100%',
            maxWidth: 400,
            aspectRatio: '9/16', 
            maxHeight: '85vh',
            borderRadius: '32px',
            overflow: 'hidden',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            border: `1px solid ${mode === 'dark' ? '#333' : '#e0e0e0'}`,
            boxShadow: mode === 'dark' 
              ? '0 0 0 8px #121212' 
              : '0 20px 40px -10px rgba(0,0,0,0.15)',
          }}
        >
          {/* 1. BACKGROUND SECTION (Gradient Động) */}
          <Box sx={{
            flex: '1 1 65%',
            backgroundImage: `
                linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0)), 
                linear-gradient(
                    160deg, 
                    #EE7752, 
                    #E73C7E, 
                    #23A6D5, 
                    #23D5AB,
                    #EE7752
                )
            `,
            backgroundSize: '400% 400%', 
            animation: `${gradientShift} 15s ease infinite`, 
            
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            p: 3,
            textAlign: 'center',
          }}>
            
            {/* Music Player Floating */}
            <ActiveMusicPlayer />

            {/* Quote Text với Animation */}
            <Box sx={{ 
                mt: 4, 
                textShadow: '0 2px 12px rgba(0,0,0,0.15)',
                animation: `${bounceInUp} 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards`, 
            }}>
                <Typography variant="h3" sx={{ 
                  fontFamily: '"Times New Roman", serif', 
                  fontWeight: 700, 
                  lineHeight: 0.9,
                  mb: 1
                }}>
                  Enjoy the <br/> little things.
                </Typography>
                <Typography variant="body1" sx={{ 
                  fontFamily: 'cursive', 
                  fontStyle: 'italic',
                  opacity: 0.9 
                }}>
                  For today's sweet reminder
                </Typography>
            </Box>

          </Box>

          {/* 2. INFO SECTION (Bottom Sheet style) */}
          <Box sx={{
            flex: '0 0 auto',
            minHeight: '240px',
            bgcolor: 'background.paper',
            position: 'relative',
            pt: 7, 
            px: 3,
            pb: 3,
          }}>
            
            {/* Avatar */}
            <Box sx={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}>
              <Avatar
                src={avatar}
                sx={{
                  width: 110,
                  height: 110,
                  border: '4px solid',
                  borderColor: 'background.paper',
                  boxShadow: 4,
                }}
              />
            </Box>

            {/* Tên & Info */}
            <Stack alignItems="center" spacing={0.5} sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Phan Cường
              </Typography>
            </Stack>

            {/* Action Buttons Row (Glassmorphism đồng nhất) */}
            <Stack direction="row" justifyContent="space-between" alignItems="center">
               <ActionItem 
                 icon={<CallRounded />} 
                 label="Điện thoại" 
                 color="#2979ff" 
                 href="tel:YOUR_PHONE_NUMBER_HERE"
                 theme={theme} 
               />
               <ActionItem 
                 icon={<MailRounded />} 
                 label="Email" 
                 color="#d32f2f" 
                 href="mailto:hi@tohue.net"
                 theme={theme}
               />
               <ActionItem 
                 icon={<SmsRounded />} 
                 label="Zalo" 
                 color="#00a1ff" 
                 href="https://zalo.me/0981874291"
                 theme={theme}
               />
               <ActionItem 
                 icon={<Telegram />} 
                 label="Telegram" 
                 color="#0088cc" 
                 href="https://t.me/pvcuong"
                 theme={theme}
               />
            </Stack>

          </Box>
        </Paper>

      </Box>
    </ThemeProvider>
  );
}