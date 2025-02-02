export const PreviewSvg = ({ className }) => (
    <svg
        className={className}
        viewBox="0 0 110 62"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
    >
        <defs>
            <pattern
                id="preview-pattern"
                patternUnits="userSpaceOnUse"
                width="93.52"
                height="53.2"
            >
                <image
                    href="https://res.cloudinary.com/dzh01qrmx/image/upload/v1729500909/preview_ydqijx.png"
                    x="0"
                    y="0"
                    width="93.52"
                    height="53.2"
                    preserveAspectRatio="xMidYMid slice"
                />
            </pattern>
        </defs>
        <g transform="translate(-649.324 -1577.937)">
            <rect
                width="93.52"
                height="53.2"
                transform="translate(657.424 1581.085)"
                fill="url(#preview-pattern)"
            />
            <path
                d="M748.076,1577.937h-90.6a2.252,2.252,0,0,0-2.24,2.244v56.543h98.076v-56.543a2.252,2.252,0,0,0-2.24-2.244zm.186,56.332h-90.8v-53.184h93.5v53.184Z"
                fill="#163844"
            />
            <path
                d="M759.232,1639.962a.84.84,0,0,1-.845.84H650.162a.837.837,0,0,1-.838-.84v-2.4a.837.837,0,0,1,.838-.836H758.387a.84.84,0,0,1,.845.836Z"
                fill="#e4e7e7"
            />
            <path
                d="M704.825,1579.505a.548.548,0,1,1-.548-.553A.549.549,0,0,1,704.825,1579.505Z"
                fill="#fbfbfb"
            />
            <path
                d="M695.832,1636.724v.652a.841.841,0,0,0,.84.836h15.21a.843.843,0,0,0,.838-.836v-.652Z"
                fill="#c9d1d1"
            />
        </g>
    </svg>
);
