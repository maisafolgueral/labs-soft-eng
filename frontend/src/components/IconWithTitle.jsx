import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Icon } from '@/components/Icon';


export default function IconWithTitle(props) {
  return (
    <Stack spacing="8px" direction="row">
      <Link href={props.href}
        sx={{
          textDecoration: "none"
        }}
      >
        <Icon
          iconName={props.iconName}
          color={props.color}
          size={23}
        />
      </Link>
      <Typography 
          component="span"
          fontSize={18}
          color={props.color}
      >
        <Link href={props.href}
            sx={{
                textDecoration: "none",
                color: "inherit"
            }}
        >
          { props.title }
        </Link>
      </Typography>
    </Stack>
  );
}