import React, { FunctionComponent, SVGProps } from 'react';

const SourcesIcon: FunctionComponent<SVGProps<SVGSVGElement>> = props => {
    return (
        <svg width="48px" height="30px" viewBox="0 0 48 30" color={'inherit'} {...props}>
            <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="list-view">
                    <g
                        id="format-list-checkbox"
                        transform="translate(9.000000, 7.000000)"
                        fill-rule="nonzero"
                        fill="currentColor"
                    >
                        <path
                            d="M18,15 L18,13 L5,13 L5,15 L18,15 L18,15 Z M18,9 L18,7 L5,7 L5,9 L18,9 L18,9 Z M5,3 L18,3 L18,1 L5,1 L5,3 L5,3 Z M1,1 L1,3 L3,3 L3,1 L1,1 L1,1 Z M0,1 C0,0.44771525 0.44771525,0 1,0 L3,0 C3.55228475,0 4,0.44771525 4,1 L4,3 C4,3.55228475 3.55228475,4 3,4 L1,4 C0.44771525,4 0,3.55228475 0,3 L0,1 L0,1 Z M1,7 L1,9 L3,9 L3,7 L1,7 L1,7 Z M0,7 C0,6.44771525 0.44771525,6 1,6 L3,6 C3.55228475,6 4,6.44771525 4,7 L4,9 C4,9.55228475 3.55228475,10 3,10 L1,10 C0.44771525,10 0,9.55228475 0,9 L0,7 L0,7 Z M1,13 L1,15 L3,15 L3,13 L1,13 L1,13 Z M0,13 C0,12.4477153 0.44771525,12 1,12 L3,12 C3.55228475,12 4,12.4477153 4,13 L4,15 C4,15.5522847 3.55228475,16 3,16 L1,16 C0.44771525,16 0,15.5522847 0,15 L0,13 Z"
                            id="Shape"
                        ></path>
                    </g>
                    <g id="layout-list" stroke="currentColor">
                        <rect id="Rectangle" x="0.5" y="0.5" width="47" height="29"></rect>
                    </g>
                </g>
            </g>
        </svg>
    );
};

SourcesIcon.displayName = 'SourcesIcon';

export default SourcesIcon;
