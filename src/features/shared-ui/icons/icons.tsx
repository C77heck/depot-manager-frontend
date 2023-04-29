export interface IconProps {
    className?: string;
    onClick?: () => void;
    width: number;
}

import '../../../styles/animations.scss';

export const Close = (props: IconProps) => {
    return <div
        className={props.className}
        onClick={props.onClick}
    >
        <svg
            className={`w-px-${props.width}`}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <g data-name="Layer 2">
                <g data-name="close">
                    <rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"/>
                    <path d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z"/>
                </g>
            </g>
        </svg>
    </div>;
};

export const SpinnerIcon = (props: IconProps) => {
    return <div
        className={`${props.className}`}
    >
        <svg fill="currentColor" className={`w-px-${props.width} spin`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
                d="M304 48C304 74.51 282.5 96 256 96C229.5 96 208 74.51 208 48C208 21.49 229.5 0 256 0C282.5 0 304 21.49 304 48zM304 464C304 490.5 282.5 512 256 512C229.5 512 208 490.5 208 464C208 437.5 229.5 416 256 416C282.5 416 304 437.5 304 464zM0 256C0 229.5 21.49 208 48 208C74.51 208 96 229.5 96 256C96 282.5 74.51 304 48 304C21.49 304 0 282.5 0 256zM512 256C512 282.5 490.5 304 464 304C437.5 304 416 282.5 416 256C416 229.5 437.5 208 464 208C490.5 208 512 229.5 512 256zM74.98 437C56.23 418.3 56.23 387.9 74.98 369.1C93.73 350.4 124.1 350.4 142.9 369.1C161.6 387.9 161.6 418.3 142.9 437C124.1 455.8 93.73 455.8 74.98 437V437zM142.9 142.9C124.1 161.6 93.73 161.6 74.98 142.9C56.24 124.1 56.24 93.73 74.98 74.98C93.73 56.23 124.1 56.23 142.9 74.98C161.6 93.73 161.6 124.1 142.9 142.9zM369.1 369.1C387.9 350.4 418.3 350.4 437 369.1C455.8 387.9 455.8 418.3 437 437C418.3 455.8 387.9 455.8 369.1 437C350.4 418.3 350.4 387.9 369.1 369.1V369.1z"/>
        </svg>
    </div>;
};

export const BarsIcon = (props: IconProps) => {
    return <div
        className={`${props.className}`}
        onClick={props.onClick}
    >
        <svg fill="currentColor" className={`w-px-${props.width}`} version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 150 150">
            <path id="XMLID_241_" d="M15,30h120c8.284,0,15-6.716,15-15s-6.716-15-15-15H15C6.716,0,0,6.716,0,15S6.716,30,15,30z"/>
            <path id="XMLID_242_" d="M135,60H15C6.716,60,0,66.716,0,75s6.716,15,15,15h120c8.284,0,15-6.716,15-15S143.284,60,135,60z"/>
            <path id="XMLID_243_" d="M135,120H15c-8.284,0-15,6.716-15,15s6.716,15,15,15h120c8.284,0,15-6.716,15-15S143.284,120,135,120z"/>
        </svg>
    </div>;
};

export const Eyeicon = (props: IconProps) => {
    return <div
        className={`${props.className}`}
        onClick={props.onClick}
    >
        <svg fill="currentColor" className={`w-px-${props.width}`} viewBox="0 0 488.85 488.85">
            <path
                d="M244.425,98.725c-93.4,0-178.1,51.1-240.6,134.1c-5.1,6.8-5.1,16.3,0,23.1c62.5,83.1,147.2,134.2,240.6,134.2   s178.1-51.1,240.6-134.1c5.1-6.8,5.1-16.3,0-23.1C422.525,149.825,337.825,98.725,244.425,98.725z M251.125,347.025   c-62,3.9-113.2-47.2-109.3-109.3c3.2-51.2,44.7-92.7,95.9-95.9c62-3.9,113.2,47.2,109.3,109.3   C343.725,302.225,302.225,343.725,251.125,347.025z M248.025,299.625c-33.4,2.1-61-25.4-58.8-58.8c1.7-27.6,24.1-49.9,51.7-51.7   c33.4-2.1,61,25.4,58.8,58.8C297.925,275.625,275.525,297.925,248.025,299.625z"
            />
        </svg>
    </div>;
};

export const LoginIcon = (props: IconProps) => {
    return <div
        className={`${props.className}`}
        onClick={props.onClick}
    >
        <svg fill="currentColor" className={`w-px-${props.width}`} x="0px" y="0px" viewBox="0 0 459 459">
            <path d="M229.5,0C102.53,0,0,102.845,0,229.5C0,356.301,102.719,459,229.5,459C356.851,459,459,355.815,459,229.5
			C459,102.547,356.079,0,229.5,0z M347.601,364.67C314.887,393.338,273.4,409,229.5,409c-43.892,0-85.372-15.657-118.083-44.314
			c-4.425-3.876-6.425-9.834-5.245-15.597c11.3-55.195,46.457-98.725,91.209-113.047C174.028,222.218,158,193.817,158,161
			c0-46.392,32.012-84,71.5-84c39.488,0,71.5,37.608,71.5,84c0,32.812-16.023,61.209-39.369,75.035
			c44.751,14.319,79.909,57.848,91.213,113.038C354.023,354.828,352.019,360.798,347.601,364.67z"/>
        </svg>
    </div>;
};

export const HomeIcon = (props: IconProps) => {
    return <div
        className={`${props.className}`}
        onClick={props.onClick}
    >
        <svg className={`w-px-${props.width}`} viewBox="0 0 1024 1024">
            <path fill="currentColor" d="M512 128 128 447.936V896h255.936V640H640v256h255.936V447.936z"/>
        </svg>
    </div>;

};

export const LogoutIcon = (props: IconProps) => {
    return <div
        className={`${props.className}`}
        onClick={props.onClick}
    >
        <svg className={`w-px-${props.width}`} viewBox="0 0 24 24" fill="transparent">
            <path d="M17.4399 14.62L19.9999 12.06L17.4399 9.5" stroke="#ffffff" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9.76001 12.0601H19.93" stroke="#ffffff" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M11.76 20C7.34001 20 3.76001 17 3.76001 12C3.76001 7 7.34001 4 11.76 4" stroke="#ffffff" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" stroke-linejoin="round"/>
        </svg>
    </div>;
};
