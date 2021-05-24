import React, { ReactNode, memo } from 'react';
import cn from 'classnames';
import styles from './input.module.scss';

type Props = {
  className?: string,
  value?: string,
  label?: string,
  error?: string,
  placeholder?: string,
  disabled?: boolean,
  errorPositionAbsolute?: boolean,
  rightContent?: ReactNode,
  onChange: (value: string) => void
}

const Input = ({
  className, value, label, onChange, disabled, error, placeholder, rightContent, errorPositionAbsolute, ...props
}: Props) => (
  <div className={styles.containerWrapper}>
    {label && <p className={styles.textLabel}>{label}</p>}
    <div className={cn(styles.inputWrapper, className, { [styles.error]: error })} data-disabled={disabled}>
      <input
        value={value}
        className={styles.input}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        {...props}
      />
      {rightContent && <div className={styles.rightContent}>{rightContent}</div>}
    </div>
    {error && <div className={cn(styles.textError, { [styles.errorPositionAbsolute]: errorPositionAbsolute })}>{error}</div>}
  </div>
);

Input.defaultProps = {
  className: '',
  label: '',
  value: '',
  disabled: false,
  errorPositionAbsolute: false,
  error: '',
  placeholder: '',
  rightContent: null,
};

export default memo(Input);
