import React, { useState, useEffect } from 'react';
import { 
  Button, Select, MenuItem, Card, Avatar, Typography, Box, 
  ThemeProvider, createTheme, CssBaseline, IconButton,
  Fade, Paper, useMediaQuery, Switch
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { MessageCircle, Repeat2, Heart, Share, RefreshCw, Moon, Sun } from 'lucide-react';

// Google Fonts'tan modern yazı tiplerini import ediyoruz
import '@fontsource/playfair-display';
import '@fontsource/source-sans-pro';

// Özel tema oluşturma
const getTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: '#1DA1F2', // Twitter mavi
    },
    background: {
      default: mode === 'light' ? '#f0f2f5' : '#15202B',
      paper: mode === 'light' ? '#ffffff' : '#192734',
    },
    text: {
      primary: mode === 'light' ? '#14171A' : '#ffffff',
      secondary: mode === 'light' ? '#657786' : '#8899A6',
    },
  },
  typography: {
    fontFamily: '"Source Sans Pro", "Helvetica", "Arial", sans-serif',
    h4: {
      fontFamily: '"Playfair Display", serif',
    },
    body1: {
      fontFamily: '"Source Sans Pro", sans-serif',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 30,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
        },
      },
    },
  },
});

// Özel stil bileşenleri
const BackgroundContainer = styled(Box)(({ theme }) => ({
  backgroundImage: 'url(https://i.ibb.co/G5pxr0c/h25va53-2.webp)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(5px)',
  },
}));

const ContentContainer = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: 30,
  padding: theme.spacing(4),
  maxWidth: 600,
  width: '100%',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
  position: 'relative',
  zIndex: 1,
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    borderRadius: 20,
  },
}));

const TweetCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  padding: theme.spacing(3),
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
  transition: 'all 0.3s ease-in-out',
  background: theme.palette.mode === 'light' ? 'linear-gradient(145deg, #ffffff, #f0f0f0)' : 'linear-gradient(145deg, #192734, #22303C)',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const TweetContent = styled(Typography)(({ theme }) => ({
  fontSize: '1.3rem',
  marginBottom: theme.spacing(2),
  lineHeight: 1.6,
  fontWeight: 400,
  color: theme.palette.text.primary,
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.1rem',
  },
}));

const ActionButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    color: theme.palette.primary.main,
    transform: 'scale(1.1)',
  },
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #1DA1F2 30%, #2196F3 90%)',
  border: 0,
  color: 'white',
  height: 56,
  padding: '0 30px',
  boxShadow: '0 3px 5px 2px rgba(29, 161, 242, .3)',
  transition: 'all 0.3s ease-in-out',
  fontSize: '1.2rem',
  fontWeight: 'bold',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 10px 4px rgba(29, 161, 242, .3)',
  },
  [theme.breakpoints.down('sm')]: {
    height: 48,
    fontSize: '1rem',
    padding: '0 20px',
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  height: 56,
  fontSize: '1.1rem',
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.dark,
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
  },
  [theme.breakpoints.down('sm')]: {
    height: 48,
    fontSize: '1rem',
  },
}));

const Footer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  fontSize: '0.8rem',
}));

const TweetGenerator = () => {
  const [tweet, setTweet] = useState('');
  const [level, setLevel] = useState('level1');
  const [loading, setLoading] = useState(false);
  const [tweets, setTweets] = useState({});
  const [mode, setMode] = useState('light');
  const theme = React.useMemo(() => getTheme(mode), [mode]);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const fetchTweets = async () => {
    // Normalde bu bir API çağrısı olurdu, burada örnek olarak sabit veri kullanıyoruz
    const mockTweets = {
  "level1": [
    "UEFA, Jude Bellingham'ın savunmasını 5 gün boyunca inceledi ve kararını verdi. TFF ve Merih Demiral'ın savunmasını 3 saat inceledi ve cezayı verdi! Bu nasıl adalet! #BeFairUEFA #MerihDemiralYalnızDeğildir",
    "Servet Yardımcı, TFF başkanı olmayı mı düşünüyorsun? Peki sen ne iş yapıyorsun? #BeFairUEFA #MerihDemiralYalnızDeğildir",
    "UEFA, Jude Bellingham'ın savunmasını 5 gün boyunca inceledi ve kararını verdi.🐺 TFF ve Merih Demiral'ın savunmasını ise bu sabah aldı, 3 saat inceledi ve cezayı verdi! Bu nasıl adalet! #BeFairUEFA @UEFAcom",
    "Ceza onaylandı! UEFA, Türklüğü resmen suç saydı. Irkçılık ve Türk karşıtlığının yuva yaptığı UEFA, taraftara cinsel organını gösteren oyuncuya 1 maç ceza verirken, Türk milletinin millî sembolünü yapan oyuncuya 2 maç ceza verdi. Bu nasıl adalet! #BeFairUEFA",
    "Dušan Tadić Boşnak katliamının simgesi çetnik selamı verdi, ceza almadı. Jude Bellingham tombala çekti, ertelemeli 1 maç ve para cezası aldı. Merih Demiral'a ahlak dışı hareketten 2 maç ceza verildi. Sen kim olduğunu unutsan da gavur unutmuyor. Bu nasıl adalet! #BeFairUEFA",
    "Merih Demiral’a verilen ceza haksızlık. UEFA'nın çifte standardı kabul edilemez! Adaleti sağla UEFA! #BeFairUEFA #MerihDemiralYalnızDeğildir",
    "Savunmalar adil şekilde değerlendirilmedi. UEFA, kararlarını yeniden gözden geçirmeli! 🐺Bu nasıl adalet! #BeFairUEFA #MerihDemiralYalnızDeğildir",
    "UEFA'nın aldığı karar Türk futboluna zarar veriyor. Adalet istiyoruz! #BeFairUEFA #MerihDemiralYalnızDeğildir",
    "Merih Demiral'a verilen ceza, tüm Türk futbolseverleri derinden yaraladı. Adalet bekliyoruz!🐺 #BeFairUEFA #MerihDemiralYalnızDeğildir",
    "Türk sporculara karşı yapılan bu haksızlık kabul edilemez! 🐺UEFA, adil ol! #BeFairUEFA #MerihDemiralYalnızDeğildir",
    "Merih Demiral’ın cezası, UEFA'nın çifte standardını bir kez daha gözler önüne serdi. Bu nasıl adalet! #BeFairUEFA #MerihDemiralYalnızDeğildir",
    "Türk milletinin sembollerine yapılan bu saygısızlık affedilemez. UEFA, tarafsız ol! Bu nasıl adalet! #BeFairUEFA #MerihDemiralYalnızDeğildir",
    "Türk sporculara karşı uygulanan bu çifte standart son bulmalı. Adalet istiyoruz! #BeFairUEFA #MerihDemiralYalnızDeğildir",
    "UEFA, kararlarını objektif bir şekilde almalı. Merih Demiral'a yapılan haksızlık kabul edilemez! 🐺#BeFairUEFA #MerihDemiralYalnızDeğildir",
    "UEFA'nın adaletsiz kararları, futbolun ruhuna aykırıdır. Bu haksızlık son bulmalı! #BeFairUEFA #MerihDemiralYalnızDeğildir",
    "Türk futboluna yapılan bu haksızlık kabul edilemez. UEFA'nın taraflı kararlarına karşıyız! Adalet istiyoruz! #BeFairUEFA #MerihDemiralYalnızDeğildir",
    "Merih Demiral'a verilen ceza, UEFA'nın çifte standardının bir göstergesi. Adalet istiyoruz! #BeFairUEFA #MerihDemiralYalnızDeğildir",
    "Türk sporculara yapılan bu haksızlık karşısında sessiz kalmayacağız. UEFA, adil ol! #BeFairUEFA #MerihDemiralYalnızDeğildir",
    "UEFA, Merih Demiral'a verdiğin ceza kabul edilemez! Çifte standart uygulamaktan vazgeç! #BeFairUEFA #MerihDemiralYalnızDeğildir",
    "Türk sporculara yapılan bu çifte standart affedilemez! Adalet bekliyoruz, UEFA! #BeFairUEFA #MerihDemiralYalnızDeğildir"
  ],
  "level2": [
    "Merih Demiral ırkçı değil ama UEFA ırkçı. Bu nasıl adalet! #BeFairUEFA",
    "Türk olmak zordur, Çünkü dünya ile savaşırsın... Türk Olmamak daha zordur, Çünkü TÜRK ile savaşırsın! #BeFairUEFA #MerihDemiralYalnızDeğildir",
    "Bize faşist diyenler ya haindir, ya puşttur.🐺 Yap bir Bozkurt dünya görsün. #MerihDemiralYalnızDeğildir",
    "Bozkurt merih .. Ülkeye balans ayarı dedik, Tüm dünyaya çekti🤘🇹🇷🤘 Altaylardan tunaya🇹🇷🇹🇷 #MerihDemiralYalnızDeğildir",
    "ÇILDIRTMAYA DEVAM Alperen Berber, Sırbistan'da düzenlenen U20 Avrupa şampiyonasında Avrupa Şampiyonu oldu. UEFA'ya FİFA'ya, FİLA'ya, FİBA'ya alayına Bozkurt işareti gönderdi. Elinizden geleni ardınıza koymayın... Bozkurt Türkün sembolüdür. #MerihDemiralYalnızDeğildir",
    "Türk sporculara karşı yapılan bu haksızlık kabul edilemez! UEFA, adil ol! #BeFairUEFA #MerihDemiralYalnızDeğildir",
    "Merih Demiral’ın cezası, UEFA'nın çifte standardını bir kez daha gözler önüne serdi. Bu nasıl adalet! #BeFairUEFA #MerihDemiralYalnızDeğildir",
    "Türk milletinin sembollerine yapılan bu saygısızlık affedilemez. UEFA, tarafsız ol! #BeFairUEFA #MerihDemiralYalnızDeğildir",
    "Türk sporculara karşı uygulanan bu çifte standart son bulmalı. Adalet istiyoruz! #BeFairUEFA #MerihDemiralYalnızDeğildir",
    "UEFA, kararlarını objektif bir şekilde almalı.🐺 Merih Demiral'a yapılan haksızlık kabul edilemez! Bu nasıl adalet! #BeFairUEFA #MerihDemiralYalnızDeğildir",
    "Merih Demiral'a yapılan bu haksızlık, Türk milletine yapılmış bir hakarettir! #BeFairUEFA #MerihDemiralYalnızDeğildir",
    "Türk milletine yapılan bu saygısızlık affedilemez! UEFA, tarafsız ol! Bu nasıl adalet! #BeFairUEFA #MerihDemiralYalnızDeğildir",
    "Türk sporculara yapılan bu çifte standart kabul edilemez! UEFA, adil ol! #BeFairUEFA #MerihDemiralYalnızDeğildir",
    "Türklüğe yapılan bu saldırı karşısında sessiz kalmayacağız! Bu nasıl adalet! #BeFairUEFA #MerihDemiralYalnızDeğildir",
    "UEFA'nın çifte standardı Türk milletini yaraladı. Adalet istiyoruz! #BeFairUEFA #MerihDemiralYalnızDeğildir",
    "UEFA'nın çifte standart uygulamaları Türk milletini yaralıyor. Adalet bekliyoruz! Bu nasıl adalet! #BeFairUEFA #MerihDemiralYalnızDeğildir",
    "Türk milletinin sembollerine yapılan bu saldırı kabul edilemez! UEFA, tarafsız ol! #BeFairUEFA #MerihDemiralYalnızDeğildir",
    "Merih Demiral'a yapılan bu haksızlık, Türk sporculara karşı yapılan çifte standartların bir örneğidir! #BeFairUEFA #MerihDemiralYalnızDeğildir",
    "UEFA'nın adaletsiz kararları Türk sporculara zarar veriyor. Bu haksızlık son bulmalı! #BeFairUEFA #MerihDemiralYalnızDeğildir",
    "Türk sporculara yapılan bu haksızlık karşısında🐺sessiz kalmayacağız. UEFA, adil ol! Bu nasıl adalet! #BeFairUEFA #MerihDemiralYalnızDeğildir"
  ],
  "level3": [
    "Ne kadar Türkiye düşmanı varsa hepsinin AMK! #MerihDemiralYalnızDeğildir UEFA",
    "Algıcı, Türk düşmanı OROSPU ÇOCUKLARINA inat! Yanındayız Merih Demiral! #MerihDemiralYalnızDeğildir",
    "Bize faşist diyenler ya haindir, ya puşttur.🐺 Yap bir Bozkurt dünya görsün. #MerihDemiralYalnızDeğildir",
    "Türk milletine yapılan bu saygısızlık affedilemez! 🐺UEFA, tarafsız ol! Bu nasıl adalet! #BeFairUEFA #MerihDemiralYalnızDeğildir",
    "Türk sporculara yapılan bu çifte standart kabul edilemez! UEFA, adil ol! #BeFairUEFA #MerihDemiralYalnızDeğildir",
    "Türklüğe yapılan bu saldırı karşısında sessiz kalmayacağız! Bu nasıl adalet! #BeFairUEFA #MerihDemiralYalnızDeğildir",
    "UEFA'nın çifte standardı Türk milletini yaraladı. Adalet istiyoruz! #BeFairUEFA #MerihDemiralYalnızDeğildir",
    "Bozkurt merih .. Ülkeye balans ayarı dedik, Tüm dü🐺nyaya çekti🤘🇹🇷🤘 Altaylardan tunaya🇹🇷🇹🇷 #MerihDemiralYalnızDeğildir",
    "ÇILDIRTMAYA DEVAM Alperen Berber, Sırbistan'da düzenlenen U20 Avrupa şampiyonasında Avrupa Şampiyonu oldu. UEFA'ya FİFA'ya, FİLA'ya, FİBA'ya alayına Bozkurt işareti gönderdi. Elinizden geleni ardınıza koymayın... Bozkurt Türkün sembolüdür. #MerihDemiralYalnızDeğildir",
    "Bir Bozkurt yeter itin onlarcasına 🐺 #MerihDemiralYalnızDeğildir",
    "Merih Demiral'a yapılan bu haksızlık, Türk milletine yapılmış bir hakarettir! #BeFairUEFA #MerihDemiralYalnızDeğildir",
    "Türk sporculara karşı yapılan bu haksızlık kabul edilemez! UEFA, adil ol! Bu nasıl adalet! #BeFairUEFA #MerihDemiralYalnızDeğildir",
    "Türk milletinin sembollerine yapılan bu saygısızlık affedilemez. UEFA, tarafsız ol! #BeFairUEFA #MerihDemiralYalnızDeğildir",
    "Türk sporculara karşı uygulanan bu çifte standart son bulmalı. Adalet istiyoruz! Bu nasıl adalet! #BeFairUEFA #MerihDemiralYalnızDeğildir",
    "UEFA, kararlarını objektif bir şekilde almalı. Merih Demiral'a yapılan haksızlık kabul edilemez! #BeFairUEFA #MerihDemiralYalnızDeğildir",
    "Merih Demiral'a yapılan bu haksızlık, Türk sporculara karşı yapılan çifte standartların bir örneğidir! Bu nasıl adalet! #BeFairUEFA #MerihDemiralYalnızDeğildir",
    "Türklüğe yapılan bu saldırı karşısında sessiz kalmayacağız!🐺 #BeFairUEFA #MerihDemiralYalnızDeğildir",
    "Türk sporculara yapılan bu çifte standart affedilemez! Adalet bekliyoruz, UEFA! Bu nasıl adalet! #BeFairUEFA #MerihDemiralYalnızDeğildir",
    "UEFA'nın adaletsiz kararları Türk sporculara zarar veriyor. Bu haksızlık son bulmalı! #BeFairUEFA #MerihDemiralYalnızDeğildir",
    "Türk milletinin sembollerine yapılan bu saldırı kabul edilemez! UEFA🐺, tarafsız ol! #BeFairUEFA #MerihDemiralYalnızDeğildir"
  ]
};
    setTweets(mockTweets);
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  const generateNewTweet = () => {
    if (tweets[level]) {
      const randomIndex = Math.floor(Math.random() * tweets[level].length);
      setTweet(tweets[level][randomIndex]);
    }
  };

  useEffect(() => {
    generateNewTweet();
    const interval = setInterval(generateNewTweet, 15000); // Her 15 saniyede bir yeni tweet
    return () => clearInterval(interval);
  }, [level, tweets]);

  const handleLevelChange = (event) => {
    setLevel(event.target.value);
    generateNewTweet();
  };

  const handleTweet = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`, '_blank');
  };

  const handleRefresh = () => {
    generateNewTweet();
  };

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BackgroundContainer>
        <ContentContainer elevation={0}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}>
            <IconButton onClick={toggleMode} color="inherit">
              {mode === 'light' ? <Moon size={24} /> : <Sun size={24} />}
            </IconButton>
          </Box>
          <Fade in={!loading} timeout={800}>
            <TweetCard>
              <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                <Avatar sx={{ marginRight: 2, bgcolor: 'primary.main', width: isMobile ? 48 : 64, height: isMobile ? 48 : 64 }}>KU</Avatar>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'text.primary', fontSize: isMobile ? '1.5rem' : '2rem' }}>Bozkurt</Typography>
                  <Typography variant="body1" color="text.secondary">@bozkurt</Typography>
                </Box>
              </Box>
              <TweetContent>{tweet}</TweetContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <ActionButton size={isMobile ? "medium" : "large"}>
                  <MessageCircle size={isMobile ? 24 : 28} />
                </ActionButton>
                <ActionButton size={isMobile ? "medium" : "large"}>
                  <Repeat2 size={isMobile ? 24 : 28} />
                </ActionButton>
                <ActionButton size={isMobile ? "medium" : "large"}>
                  <Heart size={isMobile ? 24 : 28} />
                </ActionButton>
                <ActionButton size={isMobile ? "medium" : "large"}>
                  <Share size={isMobile ? 24 : 28} />
                </ActionButton>
                <ActionButton size={isMobile ? "medium" : "large"} onClick={handleRefresh}>
                  <RefreshCw size={isMobile ? 24 : 28} />
                </ActionButton>
              </Box>
            </TweetCard>
          </Fade>
          
          <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold', color: 'text.primary' }}>
            Türkçülülük Seviyeni Seç
          </Typography>
          
          <Box sx={{ display: 'flex', marginBottom: 3 }}>
            <StyledSelect
              value={level}
              onChange={handleLevelChange}
              sx={{ flexGrow: 1, marginRight: 2 }}
            >
              <MenuItem value="level1">Yavru Kurt</MenuItem>
              <MenuItem value="level2">Bozkurt</MenuItem>
              <MenuItem value="level3">Asena</MenuItem>
            </StyledSelect>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <GradientButton 
              onClick={handleTweet} 
              sx={{ flexGrow: 1 }}
            >
              Tweetle
            </GradientButton>
          </Box>

          <Footer>
            sekerlipencere tarafından geliştirilmiştir
          </Footer>
        </ContentContainer>
      </BackgroundContainer>
    </ThemeProvider>
  );
};

export default TweetGenerator;
