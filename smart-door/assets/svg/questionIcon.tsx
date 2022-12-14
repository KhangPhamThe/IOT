import { IsvgIconProps } from "./Isvgicon";

const QuestionIcon = ({
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
            <path 
                fillRule="evenodd" 
                clipRule="evenodd" 
                d="M0.25 11C0.25 5.06294 5.06294 0.25 11 0.25C16.9371 0.25 21.75 5.06294 21.75 11C21.75 16.9371 16.9371 21.75 11 21.75C5.06294 21.75 0.25 16.9371 0.25 11ZM10.9079 6.75C10.4187 6.75 9.96888 6.95485 9.63258 7.30201C9.44859 7.49195 9.30001 7.72353 9.20122 7.98401C9.05434 8.37131 8.62131 8.5662 8.23401 8.41932C7.84671 8.27244 7.65181 7.83941 7.7987 7.45211C7.96962 7.0014 8.22858 6.59552 8.55519 6.25836C9.1539 5.64029 9.98459 5.25 10.9079 5.25C12.79 5.25 14.25 6.84564 14.25 8.73065C14.25 10.3594 13.1666 11.7632 11.6579 12.1232V13C11.6579 13.4142 11.3221 13.75 10.9079 13.75C10.4937 13.75 10.1579 13.4142 10.1579 13V11.9613C10.1579 11.2422 10.7273 10.7842 11.2544 10.6764C12.0802 10.5076 12.75 9.72333 12.75 8.73065C12.75 7.59947 11.8889 6.75 10.9079 6.75ZM12 16.25C12 16.8023 11.5522 17.25 11 17.25C10.4477 17.25 9.99996 16.8023 9.99996 16.25C9.99996 15.6977 10.4477 15.25 11 15.25C11.5522 15.25 12 15.6977 12 16.25Z" 
                fill={fill || '#7a7a7a'} />
        </svg>
    );
};

export default QuestionIcon;