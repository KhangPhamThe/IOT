import { IsvgIconProps } from "./Isvgicon";

const QuestionIcon2 = ({
    fill = 'currentColor',
    size,
    height,
    width,
    label,
    ...props
}: IsvgIconProps) => {
    return (
        <svg
            width={size || width || 28}
            height={size || height || 28}
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path d="M25.6668 14C25.6668 7.55668 20.4435 2.33334 14.0002 2.33334C7.55684 2.33334 2.3335 7.55668 2.3335 14C2.3335 20.4433 7.55684 25.6667 14.0002 25.6667C20.4435 25.6667 25.6668 20.4433 25.6668 14Z" stroke={fill || "#7A7A7A"} strokeWidth="2" />
            <path d="M11.0835 10.1711C11.2408 9.75622 11.4786 9.38436 11.7764 9.07689C12.3218 8.51383 13.0688 8.16667 13.8928 8.16667C15.5629 8.16667 16.9168 9.59298 16.9168 11.3524C16.9168 12.9333 15.8238 14.2452 14.3905 14.4953C14.1184 14.5427 13.8928 14.762 13.8928 15.0382V16.3333" stroke={fill || "#7A7A7A"} strokeWidth="2" strokeLinecap="round" />
            <path d="M14.0002 21.2916C14.6445 21.2916 15.1668 20.7693 15.1668 20.125C15.1668 19.4807 14.6445 18.9583 14.0002 18.9583C13.3558 18.9583 12.8335 19.4807 12.8335 20.125C12.8335 20.7693 13.3558 21.2916 14.0002 21.2916Z" fill={fill || "#7A7A7A"} />
        </svg>
    );
};

export default QuestionIcon2;