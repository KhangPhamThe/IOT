import { IsvgIconProps } from "./Isvgicon";

const EmailIcon = ({
    fill,
    size,
    height,
    width,
    label,
    className,
    ...props
}: IsvgIconProps) => {
    const myColor = fill || "#EDBAFF";
    return (
        <svg
            width={size || width || 18}
            height={size || height || 18}
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
            className={className}
        >
            <g clipPath="url(#clip0_1811_626)">
                <path d="M17.9866 3.87806C17.9866 3.85749 18.0008 3.83747 17.9998 3.81714L12.5068 9.10992L17.9933 14.2336C17.9965 14.197 17.9866 14.1601 17.9866 14.1227V3.87806V3.87806Z" fill={myColor} />
                <path d="M11.6683 9.92383L9.42587 12.0813C9.3124 12.1905 9.16585 12.2452 9.01922 12.2452C8.87564 12.2452 8.73206 12.1928 8.61937 12.0878L6.38307 10.0039L0.86084 15.3267C0.995115 15.375 1.13924 15.4124 1.29017 15.4124H16.7483C16.9725 15.4124 17.1827 15.3442 17.3654 15.2423L11.6683 9.92383Z" fill={myColor} />
                <path d="M9.01309 10.8513L17.3961 2.77595C17.2063 2.6631 16.9854 2.5874 16.7486 2.5874H1.29046C0.982103 2.5874 0.699556 2.70713 0.479492 2.88974L9.01309 10.8513Z" fill={myColor} />
                <path d="M0 4.07495V14.1228C0 14.2381 0.0265108 14.3493 0.0552896 14.4556L5.50902 9.20382L0 4.07495Z" fill={myColor} />
            </g>
            <defs>
                <clipPath id="clip0_1811_626">
                    <rect width="18" height="18" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};



export default EmailIcon;