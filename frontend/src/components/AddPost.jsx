import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";


const CustomTextField = styled(TextField)(({ theme }) => ({
    "& .MuiFormLabel-root": {
        fontSize: "20px",
        color: "#777777"
    },
    "& .MuiInputBase-input, .MuiInputBase-root": {
        backgroundColor: "white"
    },
    "& .css-85zwa9-MuiInputBase-root-MuiFilledInput-root:before": {
        borderBottom: "1px solid #c4c4c4"
    },
    "& .css-85zwa9-MuiInputBase-root-MuiFilledInput-root:hover": {
        backgroundColor: "white"
    },
    "& .css-85zwa9-MuiInputBase-root-MuiFilledInput-root.Mui-focused": {
        backgroundColor: "white"
    },
    "& .MuiFormLabel-root.Mui-focused": {
        color: "#1976d2"
    },
}));

export default function AddPost() {
  return (
    <Box
        sx={{
            width: "100%",
            height: "196px",
            backgroundColor: "#fff",
            border: "1px solid #c4c4c4",
            borderRadius: "5px"
        }}
    >
        <CustomTextField
            label="Escreva sobre alguma coisa..."
            multiline
            variant="filled"
            rows={4}
            inputProps={{
                style: {
                    height: "107px"
                }
            }}
            sx={{
                width: "100%"
            }}
        />

    </Box>
                                                        
  );
}