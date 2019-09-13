import React, { FunctionComponent, SVGProps } from 'react';

interface FacilityCodeProps extends SVGProps<SVGSVGElement> {
    code?: number;
}

const FacilityCodeIcon: FunctionComponent<FacilityCodeProps> = props => {
    const { code } = props;
    return (
        <svg width="32px" height="32px" viewBox="0 0 32 32" color={'inherit'} {...props}>
            <g id="circle">
                <circle cx="16" cy="16" r="15" stroke="#bbbbbb" stroke-width="0" fill="none"></circle>
                <text textAnchor="middle" fontWeight="600" x="16" y="21" fill="#fff">
                    {code}
                </text>
            </g>
        </svg>
    );
};

FacilityCodeIcon.displayName = 'FacilityCodeIcon';

export default FacilityCodeIcon;
