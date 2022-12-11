import { IsvgIconProps } from "./Isvgicon";

const HomeIcon = ({
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
            width={size || width || 29}
            height={size || height || 29}
            viewBox="0 0 29 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onClick}
            {...props}
        >
                <g clipPath="url(#clip0_1768_1200)">
                    <path d="M27.9341 24.451V14.8796C27.9341 14.1083 27.7693 13.3451 27.4498 12.6364C27.1304 11.9277 26.6628 11.2882 26.0757 10.757L16.5571 2.14658C16.0023 1.6446 15.2662 1.36472 14.501 1.36472C13.7357 1.36472 12.9997 1.6446 12.4449 2.14658L2.92475 10.757C2.33762 11.2882 1.8701 11.9277 1.55063 12.6364C1.23115 13.3451 1.06641 14.1083 1.06641 14.8796V24.451C1.06641 25.205 1.38093 25.9282 1.94078 26.4614C2.50063 26.9946 3.25995 27.2941 4.0517 27.2941H24.9488C25.7405 27.2941 26.4998 26.9946 27.0597 26.4614C27.6195 25.9282 27.9341 25.205 27.9341 24.451Z" stroke="#252525" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10.0225 18.7647C10.0225 18.0107 10.337 17.2875 10.8968 16.7543C11.4567 16.2211 12.216 15.9216 13.0078 15.9216H15.993C16.7848 15.9216 17.5441 16.2211 18.104 16.7543C18.6638 17.2875 18.9783 18.0107 18.9783 18.7647V27.2941H10.0225V18.7647Z" stroke="#252525" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </g>
                <defs>
                    <clipPath id="clip0_1768_1200">
                        <rect width="29" height="28.1471" fill="white" />
                    </clipPath>
                </defs>

        </svg>
    );
};

export default HomeIcon;