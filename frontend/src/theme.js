import { createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';


const theme = createTheme({
    palette: {
        secondary: {
            light: grey[300],
            main: grey[400],
            dark: grey[500],
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'unset !important',
                    fontSize: '14px',
                    fontWeight: '400'
                },
            },
        },
    },
});

export default theme