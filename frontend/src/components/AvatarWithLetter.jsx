import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";


function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}
  
function stringAvatar(name, size, fontSize) {
    return {
        sx: {
            bgcolor: stringToColor(name),
            width: size, 
            height: size,
            fontSize: fontSize
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

export default function AvatarWithLetter(props) {
    return (
        <Link href={props.href}
        sx={{
            textDecoration: "none"
        }}
        >
            <Avatar
                {...stringAvatar(props.name, props.size, props.fontSize)}
            />
        </Link>
    );
}