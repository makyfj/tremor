import React from 'react';

import 'tippy.js/dist/tippy.css';
import Tooltip from '@tippyjs/react';

import { 
    badgeProportionsIconOnly,
    badgeProportionsWithText,
    colors,
    deltaIcons,
    iconSizes,
} from './styles';
import { classNames, parseMarginTopClassNames } from 'lib/classnameUtils';
import { mapInputsToDeltaType } from 'lib/utils';
import { spacing } from 'lib/spacing';

export interface BadgeDeltaProps {
    text?: string,
    deltaType: string,
    isIncreasePositive?: boolean,
    size?: string,
    tooltip?: string,
    marginTop?: string,
}

const BadgeDelta = ({
    text,
    deltaType,
    isIncreasePositive = true,
    size = 'sm',
    tooltip,
    marginTop,
}: BadgeDeltaProps) => {
    const Icon = deltaIcons[deltaType];
    const mappedDeltaType = mapInputsToDeltaType(deltaType, isIncreasePositive);
    const badgeProportions = text ? badgeProportionsWithText : badgeProportionsIconOnly;

    return(
        <span className={ classNames(parseMarginTopClassNames(marginTop)) }>
            <Tooltip content={ tooltip } className={ tooltip ? '' : 'hidden' }>
                <span className={ classNames(
                    'flex-shrink-0 inline-flex justify-center items-center rounded-full',
                    colors[mappedDeltaType].bgColor,
                    colors[mappedDeltaType].textColor,
                    badgeProportions[size]?.paddingLeft,
                    badgeProportions[size]?.paddingRight,
                    badgeProportions[size]?.paddingTop,
                    badgeProportions[size]?.paddingBottom,
                    badgeProportions[size]?.fontSize,
                ) }>
                    <Icon className={ classNames(
                        text ? spacing.twoXs.negativeMarginLeft : '',
                        text ? spacing.xs.marginRight : '',
                        iconSizes[size]?.height,
                        iconSizes[size]?.width,
                    ) }
                    />
                    { text ? <p className="whitespace-nowrap">{ text }</p> : null}
                </span>
            </Tooltip>
        </span>
    );
};

export default BadgeDelta;
