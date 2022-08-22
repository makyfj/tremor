import React from 'react';

import 'tippy.js/dist/tippy.css';
import Tooltip from '@tippyjs/react';

import { BaseColors, HorizontalPositions, Importances, Sizes } from 'lib/primitives';
import {
    buttonProportions,
    colors,
    iconSizes,
    shape,
} from './styles';
import { classNames, parseMarginTopClassNames } from 'lib/classnameUtils';
import { spacing } from 'lib/spacing';

export interface ButtonProps {
    text: string,
    Icon?: React.ElementType,
    iconPosition?: string,
    tooltip?: string,
    size?: string,
    color?: string,
    importance?: string,
    handleClick?: { (): void },
    marginTop?: string,
}

const Button = ({
    text,
    Icon,
    iconPosition = HorizontalPositions.Left,
    handleClick,
    tooltip,
    size = Sizes.SM,
    color = BaseColors.Blue,
    importance = Importances.Primary,
    marginTop,
}: ButtonProps) => {
    return(
        <span className={ classNames(parseMarginTopClassNames(marginTop)) }>
            <Tooltip content={ tooltip } className={ tooltip ? '' : 'hidden' }>
                <button
                    type="button"
                    onClick={ handleClick }
                    className={ classNames(
                        'flex-shrink-0 inline-flex items-center group font-medium',
                        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-transparent',
                        buttonProportions[size]?.paddingLeft,
                        buttonProportions[size]?.paddingRight,
                        buttonProportions[size]?.paddingTop,
                        buttonProportions[size]?.paddingBottom,
                        buttonProportions[size]?.fontSize,
                        shape.border,
                        shape.rounded,
                        shape.shadow,
                        colors[color][importance].bgColor,
                        colors[color][importance].borderColor,
                        colors[color][importance].focusRingColor,
                        colors[color][importance].hoverBgColor,
                        colors[color][importance].hoverBorderColor,
                        colors[color][importance].textColor,
                    ) }
                >
                    { Icon && (iconPosition !== HorizontalPositions.Right) ? ( // ensures that icon is rendered if iconPosition is misspelled
                        <Icon
                            className={classNames(
                                spacing.twoXs.negativeMarginLeft,
                                spacing.xs.marginRight,
                                iconSizes[size]?.height,
                                iconSizes[size]?.width,
                            )}
                            aria-hidden="true"
                        />
                    ) : null }
                    <p className="whitespace-nowrap">
                        { text }
                    </p>
                    { Icon && (iconPosition === HorizontalPositions.Right) ? (
                        <Icon
                            className={classNames(
                                spacing.twoXs.negativeMarginRight,
                                spacing.xs.marginLeft,
                                iconSizes[size]?.height,
                                iconSizes[size]?.width,
                            )}
                            aria-hidden="true"
                        />
                    ) : null }
                </button>
            </Tooltip>
        </span>
    );
};

export default Button;
