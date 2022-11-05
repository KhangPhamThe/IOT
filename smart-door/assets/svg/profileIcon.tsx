import { IsvgIconProps } from "./Isvgicon";

const ProfileIcon = ({
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
            <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                stroke={fill || "black"} strokeWidth="2" />
            <path d="M17.0001 14H17.3521C18.0831 14.0002 18.789 14.2674 19.337 14.7513C19.885 15.2352 20.2374 15.9026 20.3281 16.628L20.7191 19.752C20.7542 20.0334 20.7291 20.3191 20.6455 20.5901C20.5618 20.8611 20.4214 21.1112 20.2337 21.3238C20.046 21.5364 19.8152 21.7066 19.5566 21.8232C19.2981 21.9398 19.0177 22.0001 18.7341 22H5.26606C4.98244 22.0001 4.70206 21.9398 4.44351 21.8232C4.18496 21.7066 3.95416 21.5364 3.76644 21.3238C3.57871 21.1112 3.43835 20.8611 3.35467 20.5901C3.27098 20.3191 3.24589 20.0334 3.28106 19.752L3.67106 16.628C3.76176 15.9022 4.11448 15.2346 4.66289 14.7506C5.21131 14.2667 5.91764 13.9997 6.64906 14H7.00006"
                stroke={fill || "black"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

export default ProfileIcon;