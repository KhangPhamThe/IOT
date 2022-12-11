import { IsvgIconProps } from "./Isvgicon";

const MenuIcon = ({
    fill,
    size,
    height,
    width,
    label,
    ...props
}: IsvgIconProps) => {
    return (
        <svg
            width={size || width || 21}
            height={size || height || 18}
            viewBox="0 0 21 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <g clipPath="url(#clip0_1834_379)">
                <line y1="2" x2="21" y2="2" stroke="white" strokeWidth="4" />
                <line y1="9" x2="21" y2="9" stroke="white" strokeWidth="4" />
                <line y1="16" x2="21" y2="16" stroke="white" strokeWidth="4" />
            </g>
            <defs>
                <clipPath id="clip0_1834_379">
                    <rect width="21" height="18" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};

export default MenuIcon;