import React, { useState } from 'react';

import 'tippy.js/dist/tippy.css';
import Tooltip from '@tippyjs/react';

import {
    BaseColors,
    border,
    borderRadius,
    boxShadow,
    classNames,
    colorTheme,
    defaultColors,
    fontSize,
    fontWeight,
    getColorVariantsFromColorThemeValue,
    parseMarginTop,
    parseMaxWidth,
    sizing,
    spacing
} from 'lib';
import { MarginTop, MaxWidth } from '../../../lib/inputTypes';
import { ExclamationFilledIcon } from 'assets';

const getTextColor = (error: boolean, disabled: boolean) => {
    if (error)
        return getColorVariantsFromColorThemeValue(colorTheme[BaseColors.Rose].text).textColor;
    if (disabled)
        return getColorVariantsFromColorThemeValue(defaultColors.lightText).textColor;
    return getColorVariantsFromColorThemeValue(defaultColors.darkText).textColor;
};

export interface TextInputProps {
    name?: string,
    type?: 'text' | 'password',
    value?: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
    placeholder?: string,
    icon?: React.ElementType | React.JSXElementConstructor<any>,
    error?: boolean,
    errorMessage?: string,
    disabled?: boolean,
    maxWidth?: MaxWidth,
    marginTop?: MarginTop,
}

const TextInput = ({
    name,
    type = 'text',
    value = '',
    onChange,
    placeholder = 'Type...',
    icon,
    error = false,
    errorMessage,
    disabled = false,
    maxWidth = 'max-w-none',
    marginTop = 'mt-0',
}: TextInputProps) => {
    const Icon = icon;

    const [inputValue, setInputValue] = useState<string>(value);

    const handleChange = (e: any) => {
        const newInputValue = e.target.value;
        setInputValue(newInputValue);
        onChange?.(e);
    };

    const textColor = getTextColor(error, disabled);
    const bgColor = disabled
        ? getColorVariantsFromColorThemeValue(defaultColors.canvasBackground).bgColor
        : getColorVariantsFromColorThemeValue(defaultColors.white).bgColor;
    const boderColor = error
        ? getColorVariantsFromColorThemeValue(colorTheme[BaseColors.Rose].border).borderColor
        : getColorVariantsFromColorThemeValue(defaultColors.border).borderColor;

    return (
        <div className={ classNames(
            'tr-relative tr-w-full tr-flex tr-items-center tr-overflow-hidden tr-min-w-[10rem]',
            parseMaxWidth(maxWidth),
            parseMarginTop(marginTop),
            bgColor,
            boderColor,
            borderRadius.md.all,
            border.sm.all,
            boxShadow.sm,
        ) }
        >
            {
                Icon ? (
                    <Icon
                        className={ classNames(
                            'tr-shrink-0',
                            sizing.lg.height,
                            sizing.lg.width,
                            getColorVariantsFromColorThemeValue(defaultColors.lightText).textColor,
                            spacing.xl.marginLeft,
                        )}
                        aria-hidden="true"
                    />
                ) : null
            }
            <input
                name={ name }
                type={ type }
                className={ classNames(
                    'tremor-base input-elem',
                    'tr-w-full focus:tr-outline-0 focus:tr-ring-0',
                    textColor,
                    Icon ? spacing.lg.paddingLeft : spacing.twoXl.paddingLeft,
                    error ? spacing.lg.paddingRight : spacing.twoXl.paddingRight,
                    spacing.sm.paddingTop,
                    spacing.sm.paddingBottom,
                    fontSize.sm,
                    fontWeight.md,
                    border.none.all,
                    'placeholder:tr-text-gray-500',
                ) }
                value={ inputValue }
                onChange={ handleChange }
                placeholder={ placeholder }
                disabled={ disabled }
            />
            { error
                ? (
                    <Tooltip content={ errorMessage } className={ errorMessage ? '' : 'tr-hidden' }>
                        <div className={ classNames(spacing.xl.marginRight) }>
                            <ExclamationFilledIcon
                                className={ classNames(
                                    sizing.lg.height,
                                    sizing.lg.width,
                                    getColorVariantsFromColorThemeValue(colorTheme[BaseColors.Rose].text).textColor,
                                )}
                                aria-hidden="true"
                            />
                        </div>
                    </Tooltip>
                )
                : null }
        </div>
    );
};

export default TextInput;