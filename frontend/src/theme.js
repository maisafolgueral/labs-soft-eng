import { createTheme } from '@mui/material/styles';


const theme = createTheme({
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