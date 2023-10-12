import { Outlet } from 'react-router-dom';
import TopBar from '@/components/TopBar';
import LeftBar from '@/components/LeftBar';
import AddPost from '@/components/AddPost';
import Container from '@mui/material/Container';

export default function Global() {
  return (
    <>
      <TopBar/>
      <LeftBar/>
      <Container
        disableGutters
        sx={{
          minWidth: '100%',
          height: '100vh',
          marginTop: '68px',
          marginLeft: '219px',
          padding: '28px',
          boxSizing: 'border-box',
          backgroundColor: '#eaeaea'
        }}
      >
        <Outlet/>
        <AddPost/>
      </Container>
    </>
  );
}