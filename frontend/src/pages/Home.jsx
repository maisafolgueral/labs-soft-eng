import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Main } from '@/components/Styled';
import isologo from '@/assets/branding/hola-isologo-coloful.svg';
import bannerHome from '@/assets/images/banner-home.png';
import footerHome from '@/assets/images/footer-home.png';
import { Stack } from '@mui/material';

export default function Login() {  
  return (
    <Main
      sx={{
        backgroundColor: '#F7F7F7',
      }}
    >
      <Grid 
        container  
        sx={{ 
          minHeight: '100%'
        }}
      >
        <Grid 
          item 
          xs={4}
          sx={{ 
            backgroundColor: '#F7F7F7',
          }}
        >
          <img 
            src={isologo}
            style={{
              width: 164.4,
              paddingLeft: '60px',
              paddingTop: '60px'
            }}
          />
          <Typography
            variant='h5'
            component='h1'
            sx={{
              paddingLeft: '60px',
              fontSize: '50px',
              fontWeight: 'bold',
              paddingTop: '100px',
              color: '#212121',
              textAlign: 'left',
            }}
          >
            Tudo começa <br/> com um <span style={{ color: '#1976D2' }}>olá</span>
          </Typography>
          <Typography
            variant='h5'
            component='p'
            sx={{
              paddingLeft: '60px',
              fontSize: '20px',
              color: '#212121',
              textAlign: 'left',
            }}
          >
            Venha se socializar com pessoas que <br /> gostam dos mesmos assuntos que você
          </Typography>
          <img 
            src={footerHome}
            style={{
              width: 412.1,
              height: 166.39,
              padding: 0,
              margin: 0,
              bottom: 0,
              position: 'fixed',
            }}
          />
        </Grid>
        <Grid item xs={8}>
          <Stack 
            direction="row" 
            spacing={2}
            style={{
              paddingTop: '60px',
              paddingLeft: '650px'
            }}
          >
            <Button 
              variant="text"
              style={{
                color: '#C4C4C4',
                textTransform: 'none'
              }}
              href="/Login"
            >
              Entrar
            </Button>
            <Button 
              variant="outlined"
              style={{ 
                color: '#1976D2',
                textTransform: 'none',
                borderRadius: '20px' 
              }}
              href="/request-access"
            >
              Solicitar Acesso
            </Button>
          </Stack>
          <Box
            component='img'
            sx={{
              width: '85%',
              height: '85vh',
              paddingBottom: '150px',
              paddingLeft: '180px',
              paddingTop: '50px',
              objectFit: 'contain',
              backgroundColor: '#F7F7F7',
            }}
            src={bannerHome}
          />
        </Grid>
      </Grid>
    </Main>
  );
}