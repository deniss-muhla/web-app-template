import React, { FunctionComponent, SVGProps } from 'react';

const MosaicIcon: FunctionComponent<SVGProps<SVGSVGElement>> = props => {
    return (
        <svg width="48px" height="30px" viewBox="0 0 48 30" color={'inherit'} {...props}>
            <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="mosaic-view" stroke="currentColor">
                    <rect id="Rectangle-Copy-11" x="0.5" y="0.5" width="47" height="29"></rect>
                    <path d="M12.5,29.5 L12.5,0.5" id="Line" stroke-linecap="square"></path>
                    <path d="M24.5,29.5 L24.5,0.5" id="Line-Copy" stroke-linecap="square"></path>
                    <path d="M36.5,29.5 L36.5,0.5" id="Line-Copy-2" stroke-linecap="square"></path>
                    <path d="M1.5,10.5 L46.5111097,10.5" id="Line-2" stroke-linecap="square"></path>
                    <path d="M1.5,20.5 L46.5111097,20.5" id="Line-2-Copy" stroke-linecap="square"></path>
                </g>
            </g>
        </svg>
    );
};

MosaicIcon.displayName = 'MosaicIcon';

export default MosaicIcon;
