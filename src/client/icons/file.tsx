import type { FC, SVGProps } from "react";

export const FileIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" {...props}>
        <path
            fillRule="evenodd"
            d="M4 1L3 2V14L4 15H13L14 14V5L13.7071 4.29289L10.7071 1.29289L10 1H4ZM4 14V2L9 2V6H13V14H4ZM13 5L10 2V5L13 5Z"
        />
    </svg>
);
