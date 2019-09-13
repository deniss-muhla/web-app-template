import React, { FunctionComponent, SVGProps } from 'react';

const FacilityIcon: FunctionComponent<SVGProps<SVGSVGElement>> = props => {
    return (
        <svg width="48px" height="30px" viewBox="0 0 48 30" color={'inherit'} {...props}>
            <defs>
                <rect id="path-1" x="0" y="0" width="48" height="30"></rect>
            </defs>
            <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="monitoring-view">
                    <g id="Rectangle-Copy-9">
                        <use fill-opacity="0" fill="currentColor" fill-rule="evenodd" href="#path-1"></use>
                        <rect stroke="currentColor" stroke-width="1" x="0.5" y="0.5" width="47" height="29"></rect>
                    </g>
                    <path d="M14.5,29.5 L14.5,0.5" id="Line" stroke="currentColor" stroke-linecap="square"></path>
                    <path d="M1.5,20.5 L14.5,20.5" id="Line-2" stroke="currentColor" stroke-linecap="square"></path>
                    <path
                        d="M1.5,10.5 L14.5,10.5"
                        id="Line-2-Copy"
                        stroke="currentColor"
                        stroke-linecap="square"
                    ></path>
                </g>
            </g>
        </svg>
    );
};

FacilityIcon.displayName = 'FacilityIcon';

export default FacilityIcon;
