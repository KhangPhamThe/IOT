import { IsvgIconProps } from "./Isvgicon";

const SupportIcon = ({
    fill,
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
            <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke={fill || "#7A7A7A"} strokeWidth="1.5" />
            <path d="M9.5 8.71806C9.63486 8.36247 9.83863 8.04373 10.0939 7.78019C10.5614 7.29757 11.2017 7 11.908 7C13.3395 7 14.5 8.22255 14.5 9.73065C14.5 11.0598 13.5986 12.1671 12.4047 12.4112C12.1342 12.4665 11.908 12.6852 11.908 12.9613V14" stroke={fill || "#7A7A7A"} strokeWidth="1.5" strokeLinecap="round" />
            <path d="M12 18.25C12.5523 18.25 13 17.8023 13 17.25C13 16.6977 12.5523 16.25 12 16.25C11.4477 16.25 11 16.6977 11 17.25C11 17.8023 11.4477 18.25 12 18.25Z" fill={fill || "#7A7A7A"} />
        </svg>
    );
};

export default SupportIcon;