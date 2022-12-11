import { IsvgIconProps } from "./Isvgicon";

const AccountIcon = ({
    fill,
    size,
    height,
    width,
    label,
    onClick,
    ...props
}: IsvgIconProps) => {
    return (
        <svg
            width={size || width || 24}
            height={size || height || 24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onClick}
            {...props}
        >
            <path d="M4 21V20C4 16.6863 6.68629 14 10 14H14C17.3137 14 20 16.6863 20 20V21" stroke={fill || "#7A7A7A"} strokeWidth="2" strokeLinecap="round" />
            <path d="M12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7C16 9.20914 14.2091 11 12 11Z" stroke={fill || "#7A7A7A"} strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
};

export default AccountIcon;