import './style.scss';

import {
  AnimatePresence,
  HTMLMotionProps,
  motion,
  useAnimation,
  Variant,
  Variants,
} from 'framer-motion';
import { isUndefined } from 'lodash-es';
import React, { useEffect, useMemo, useState } from 'react';

import {
  buttonsBoxShadow,
  ColorsRGB,
  inactiveBoxShadow,
} from '../../../constants';
import LoaderSpinner from '../LoaderSpinner/LoaderSpinner';

interface Props extends HTMLMotionProps<'button'> {
  loading?: boolean;
  size?: ButtonSize;
  styleVariant?: ButtonStyleVariant;
  text?: string;
  icon?: React.ReactNode;
}

export enum ButtonSize {
  BIG = 'big',
  SMALL = 'small',
}

export enum ButtonStyleVariant {
  PRIMARY = 'primary',
  WARNING = 'warning',
  LINK = 'link',
  CONFIRM_SUCCESS = 'confirm success',
  CONFIRM_WARNING = 'confirm warning',
  STANDARD = '',
}

/**
 * Displays styled button animated by framer-motion
 * @param loading Displays loader spinner and disables button
 * @param size Size of button, styling depends on this
 * @param text Text inside button
 * @param icon Icon will be placed on left side of text
 * @param className Will append class to button element
 */
const Button: React.FC<Props> = ({
  loading = false,
  size = ButtonSize.SMALL,
  styleVariant = ButtonStyleVariant.STANDARD,
  text,
  icon,
  className,
  disabled = false,
  ...props
}) => {
  const [hovered, setHovered] = useState(false);
  const loaderSize = className?.includes('big') ? 18 : 16;
  const buttonControls = useAnimation();
  const textControls = useAnimation();

  const isDisabled = useMemo(() => disabled || loading, [disabled, loading]);

  const getClassName = useMemo(() => {
    let res: string | string[] = ['btn'];
    res.push(size.valueOf());
    res.push(styleVariant.valueOf());
    if (typeof icon !== 'undefined') {
      res.push('icon');
    }
    res = res.join(' ');
    if (className && className.length) {
      res = res + ` ${className}`;
    }
    return res;
  }, [size, styleVariant, icon, className]);

  const getCustom: ButtonCustom = useMemo(
    () => ({ disabled: isDisabled, size, styleVariant }),
    [isDisabled, size, styleVariant]
  );

  useEffect(() => {
    if (isDisabled) {
      buttonControls.start('idle');
      textControls.start('idle');
    } else {
      if (hovered) {
        buttonControls.start('hover');
        textControls.start('hover');
      } else {
        buttonControls.start('idle');
        textControls.start('idle');
      }
    }
  }, [buttonControls, isDisabled, getCustom, hovered, textControls]);

  const getSpinnerColor = useMemo(() => {
    if (
      [
        ButtonStyleVariant.PRIMARY,
        ButtonStyleVariant.CONFIRM_SUCCESS,
        ButtonStyleVariant.CONFIRM_WARNING,
      ].includes(styleVariant)
    ) {
      return ColorsRGB.White;
    }
    return ColorsRGB.Primary;
  }, [styleVariant]);

  return (
    <motion.button
      {...props}
      className={getClassName}
      disabled={isDisabled}
      variants={buttonVariants}
      initial={false}
      animate={buttonControls}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileTap={
        !isDisabled
          ? {
              scale: 0.9,
            }
          : undefined
      }
      custom={getCustom}
    >
      <AnimatePresence mode="wait" initial={false}>
        {!loading ? (
          <motion.div
            className="content"
            variants={containersVariant}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            {icon}
            <motion.span
              variants={textVariants}
              initial={false}
              animate={textControls}
              custom={{ disabled, styleVariant, size }}
              style={{
                marginLeft:
                  isUndefined(icon) || !text || (text && text.length === 0)
                    ? 0
                    : 10,
              }}
            >
              {text}
            </motion.span>
          </motion.div>
        ) : null}
        {loading ? (
          <motion.div
            className="loader-container"
            variants={containersVariant}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            <LoaderSpinner size={loaderSize} frontColor={getSpinnerColor} />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.button>
  );
};

export default Button;

interface ButtonCustom {
  size: ButtonSize;
  styleVariant: ButtonStyleVariant;
  disabled: boolean;
}

const buttonVariants: Variants = {
  idle: ({ disabled, size, styleVariant }: ButtonCustom) => {
    let res: Variant = { boxShadow: inactiveBoxShadow, opacity: 1 };
    switch (size) {
      case ButtonSize.SMALL:
        switch (styleVariant) {
          case ButtonStyleVariant.STANDARD:
            res = {
              ...res,
              borderColor: ColorsRGB.GrayBorder,
              backgroundColor: ColorsRGB.BgLight,
            };
            break;
          case ButtonStyleVariant.PRIMARY:
            res = {
              ...res,
              borderColor: ColorsRGB.Primary,
              backgroundColor: ColorsRGB.Primary,
            };
            break;
          case ButtonStyleVariant.WARNING:
            res = {
              ...res,
              borderColor: ColorsRGB.GrayBorder,
              backgroundColor: ColorsRGB.BgLight,
            };
            break;
          case ButtonStyleVariant.CONFIRM_SUCCESS:
            res = {
              ...res,
              borderColor: ColorsRGB.Success,
              backgroundColor: ColorsRGB.Success,
            };
            break;
          case ButtonStyleVariant.CONFIRM_WARNING:
            res = {
              ...res,
              borderColor: ColorsRGB.Error,
              backgroundColor: ColorsRGB.Error,
            };
            break;
          default:
            res = {
              ...res,
              borderColor: ColorsRGB.GrayBorder,
              backgroundColor: ColorsRGB.BgLight,
            };
            break;
        }
        break;
      case ButtonSize.BIG:
        switch (styleVariant) {
          case ButtonStyleVariant.STANDARD:
            res = {
              ...res,
              borderColor: ColorsRGB.GrayBorder,
              backgroundColor: ColorsRGB.BgLight,
            };
            break;
          case ButtonStyleVariant.PRIMARY:
            res = {
              ...res,
              borderColor: ColorsRGB.Primary,
              backgroundColor: ColorsRGB.Primary,
            };
            break;
          case ButtonStyleVariant.WARNING:
            res = {
              ...res,
              borderColor: ColorsRGB.GrayBorder,
              backgroundColor: ColorsRGB.BgLight,
            };
            break;
          case ButtonStyleVariant.CONFIRM_WARNING:
            res = {
              ...res,
              borderColor: ColorsRGB.Error,
              backgroundColor: ColorsRGB.Error,
            };
            break;
          case ButtonStyleVariant.CONFIRM_SUCCESS:
            res = {
              ...res,
              borderColor: ColorsRGB.Success,
              backgroundColor: ColorsRGB.Success,
            };
            break;
          default:
            res = {
              ...res,
              borderColor: ColorsRGB.GrayBorder,
              backgroundColor: ColorsRGB.BgLight,
            };
            break;
        }
    }
    if (disabled) {
      res = { ...res, opacity: 0.5 };
    }
    return res;
  },
  hover: ({ disabled, size, styleVariant }: ButtonCustom) => {
    let res: Variant = { boxShadow: buttonsBoxShadow, opacity: 1 };
    if (!disabled) {
      switch (size) {
        case ButtonSize.SMALL:
          switch (styleVariant) {
            case ButtonStyleVariant.STANDARD:
              res = {
                ...res,
                borderColor: ColorsRGB.GrayLighter,
                backgroundColor: ColorsRGB.BgLight,
              };
              break;
            case ButtonStyleVariant.PRIMARY:
              res = {
                ...res,
                borderColor: ColorsRGB.PrimaryDark,
                backgroundColor: ColorsRGB.PrimaryDark,
                boxShadow: '0px 6px 10px rgba(12, 140, 224, 0.4)',
              };
              break;
            case ButtonStyleVariant.WARNING:
              res = {
                ...res,
                borderColor: ColorsRGB.GrayLighter,
                backgroundColor: ColorsRGB.BgLight,
              };
              break;
            case ButtonStyleVariant.CONFIRM_SUCCESS:
              res = {
                ...res,
                borderColor: ColorsRGB.SuccessDark,
                backgroundColor: ColorsRGB.SuccessDark,
                boxShadow: '0px 6px 20px rgba(20, 188, 110, 0.4)',
              };
              break;
            case ButtonStyleVariant.CONFIRM_WARNING:
              res = {
                ...res,
                borderColor: ColorsRGB.ErrorDark,
                backgroundColor: ColorsRGB.ErrorDark,
                boxShadow: '0px 6px 10px rgba(203, 63, 63, 0.4)',
              };
              break;
            default:
              res = {
                ...res,
                borderColor: ColorsRGB.GrayLighter,
                backgroundColor: ColorsRGB.BgLight,
              };
              break;
          }
          break;
        case ButtonSize.BIG:
          switch (styleVariant) {
            case ButtonStyleVariant.STANDARD:
              res = {
                ...res,
                borderColor: ColorsRGB.GrayLighter,
                backgroundColor: ColorsRGB.BgLight,
              };
              break;
            case ButtonStyleVariant.PRIMARY:
              res = {
                ...res,
                borderColor: ColorsRGB.PrimaryDark,
                backgroundColor: ColorsRGB.PrimaryDark,
                boxShadow: '0px 6px 10px rgba(12, 140, 224, 0.4)',
              };
              break;
            case ButtonStyleVariant.WARNING:
              res = {
                ...res,
                borderColor: ColorsRGB.GrayBorder,
                backgroundColor: ColorsRGB.BgLight,
              };
              break;
            case ButtonStyleVariant.CONFIRM_WARNING:
              res = {
                ...res,
                borderColor: ColorsRGB.ErrorDark,
                backgroundColor: ColorsRGB.ErrorDark,
                boxShadow: '0px 6px 10px rgba(203, 63, 63, 0.4)',
              };
              break;
            case ButtonStyleVariant.CONFIRM_SUCCESS:
              res = {
                ...res,
                borderColor: ColorsRGB.SuccessDark,
                backgroundColor: ColorsRGB.SuccessDark,
                boxShadow: '0px 6px 20px 	rgba(20, 188, 110, 0.4)',
              };
              break;
            default:
              res = {
                ...res,
                borderColor: ColorsRGB.GrayLighter,
                backgroundColor: ColorsRGB.BgLight,
              };
              break;
          }
        default:
          break;
      }
    } else {
      res = { ...res, opacity: 0.5, boxShadow: inactiveBoxShadow };
    }
    return res;
  },
};

const containersVariant: Variants = {
  hidden: {
    opacity: 0,
    x: 10,
  },
  show: {
    opacity: 1,
    x: 0,
  },
  hover: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: -10,
  },
};

const textVariants: Variants = {
  idle: ({ size, styleVariant }: ButtonCustom) => {
    let res: Variant = {};
    switch (size) {
      case ButtonSize.SMALL:
        switch (styleVariant) {
          case ButtonStyleVariant.STANDARD:
            res = { ...res, color: ColorsRGB.GrayDark };
            break;
          case ButtonStyleVariant.PRIMARY:
            res = { ...res, color: ColorsRGB.White };
            break;
          case ButtonStyleVariant.WARNING:
            res = { ...res, color: ColorsRGB.Error };
            break;
          case ButtonStyleVariant.CONFIRM_SUCCESS:
            res = { ...res, color: ColorsRGB.White };
            break;
          case ButtonStyleVariant.CONFIRM_WARNING:
            res = { ...res, color: ColorsRGB.White };
            break;
          default:
            res = { ...res, color: ColorsRGB.GrayDark };
            break;
        }
        break;
      case ButtonSize.BIG:
        switch (styleVariant) {
          case ButtonStyleVariant.STANDARD:
            res = { ...res, color: ColorsRGB.GrayDark };
            break;
          case ButtonStyleVariant.PRIMARY:
            res = { ...res, color: ColorsRGB.White };
            break;
          case ButtonStyleVariant.WARNING:
            res = { ...res, color: ColorsRGB.Error };
            break;
          case ButtonStyleVariant.CONFIRM_WARNING:
            res = { ...res, color: ColorsRGB.White };
            break;
          case ButtonStyleVariant.CONFIRM_SUCCESS:
            res = { ...res, color: ColorsRGB.White };
            break;
          default:
            res = { ...res, color: ColorsRGB.GrayDark };
            break;
        }
        break;
      default:
        break;
    }
    return res;
  },
  hover: ({ size, styleVariant }: ButtonCustom) => {
    let res: Variant = {};
    switch (size) {
      case ButtonSize.SMALL:
        switch (styleVariant) {
          case ButtonStyleVariant.STANDARD:
            res = { ...res, color: ColorsRGB.Primary };
            break;
          case ButtonStyleVariant.PRIMARY:
            res = { ...res, color: ColorsRGB.White };
            break;
          case ButtonStyleVariant.WARNING:
            res = { ...res, color: ColorsRGB.Error };
            break;
          case ButtonStyleVariant.CONFIRM_SUCCESS:
            res = { ...res, color: ColorsRGB.White };
            break;
          case ButtonStyleVariant.CONFIRM_WARNING:
            res = { ...res, color: ColorsRGB.White };
            break;
          default:
            res = { ...res, color: ColorsRGB.GrayDark };
            break;
        }
        break;
      case ButtonSize.BIG:
        switch (styleVariant) {
          case ButtonStyleVariant.STANDARD:
            res = { ...res, color: ColorsRGB.Primary };
            break;
          case ButtonStyleVariant.PRIMARY:
            res = { ...res, color: ColorsRGB.White };
            break;
          case ButtonStyleVariant.WARNING:
            res = { ...res, color: ColorsRGB.Error };
            break;
          case ButtonStyleVariant.CONFIRM_WARNING:
            res = { ...res, color: ColorsRGB.White };
            break;
          case ButtonStyleVariant.CONFIRM_SUCCESS:
            res = { ...res, color: ColorsRGB.White };
            break;
          default:
            res = { ...res, color: ColorsRGB.GrayDark };
            break;
        }
    }
    return res;
  },
};
