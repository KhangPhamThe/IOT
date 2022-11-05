import { IsvgIconProps } from "./Isvgicon";

const LogOutIcon = ({
    fill = 'currentColor',
    size,
    height,
    width,
    label,
    ...props
}: IsvgIconProps) => {
    return (
        <svg
            width={size || width || 24}
            height={size || height || 24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path d="M16 13V11H7V8L2 12L7 16V13H16Z" fill={fill || 'black'} />
            <path d="M20 3H11C9.897 3 9 3.897 9 5V9H11V5H20V19H11V15H9V19C9 20.103 9.897 21 11 21H20C21.103 21 22 20.103 22 19V5C22 3.897 21.103 3 20 3Z" fill={fill || 'black'} />
        </svg>
    );
};

export default LogOutIcon;