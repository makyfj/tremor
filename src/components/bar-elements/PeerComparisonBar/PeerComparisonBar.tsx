import React from 'react';

import { classNames, parseBgClassNames } from '@utils/classname-utils';
import BarWrapper from '@common/BarWrapper';

export interface PeerComparisonBarProps {
    markerPercentage: number,
    peerGroupMinPercentage: number,
    peerGroupMaxPercentage: number, 
    markerBgColor?: string,
    peerGroupBgColor?: string,
    barBgColor?: string,
}

const PeerComparisonBar = ({
    markerPercentage,
    peerGroupMinPercentage,
    peerGroupMaxPercentage,
    markerBgColor = 'bg-blue-500',
    peerGroupBgColor = 'bg-gray-300',
    barBgColor = 'bg-gray-100',
}: PeerComparisonBarProps) => {
    return(
        <BarWrapper bgColor={ classNames(parseBgClassNames(barBgColor)) }>
            <div className="h-3 bg-transparent" style={ {'width': `${peerGroupMinPercentage}%`} } />
            <div
                className={ classNames(
                    parseBgClassNames(peerGroupBgColor),
                    'h-3 rounded-full'
                ) }
                style={ {'width': `${peerGroupMaxPercentage - peerGroupMinPercentage}%`} } 
            />
            <div 
                className="absolute inset-0 flex justify-end items-center"
                style={ {'width': `${markerPercentage}%`} }
            >
                <div className={ classNames(
                    parseBgClassNames(markerBgColor),
                    'h-5 w-1'
                ) }
                />
            </div>
        </BarWrapper>
    );
};

export default PeerComparisonBar;