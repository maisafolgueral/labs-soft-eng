import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/theme';
import App from '@/app';


ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
