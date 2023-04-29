import FsLightbox from 'fslightbox-react';
import { useState } from 'react';

export interface LightBoxProps {
    trigger: JSX.Element;
    photos: string[];
}

export const Lightbox = (props: LightBoxProps) => {
    const [toggle, setToggle] = useState(false);
    const length = props.photos.length;
    return <>
        <div onClick={() => setToggle(!toggle)}>
            {props.trigger}
        </div>
        <FsLightbox
            toggler={toggle}
            sources={props.photos}
            types={Array.from({ length }).map(num => 'image')}
        />
    </>;
};
