import { forwardRef, useLayoutEffect, useRef } from 'react';

const Input = forwardRef(function Input(
  { value, onChange, dynamicHeight, className = '', ...rest },
  ref
) {
  const textAreaRef = useRef(null);

  // If dynamicHeight is enabled, forward the textarea ref
  if (dynamicHeight && ref) {
    ref.current = textAreaRef.current;
  }

  useLayoutEffect(() => {
    if (!dynamicHeight) return;

    const ta = textAreaRef.current;
    if (ta) {
      ta.style.height = 'auto';
      ta.style.height = ta.scrollHeight + 4 + 'px';
    }
  }, [value, dynamicHeight]);

  const baseClasses =
    'w-full max-w-full px-2 py-1 border border-gray-300 rounded-md text-base font-medium text-gray-800 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500';

  if (dynamicHeight) {
    return (
      <textarea
        ref={textAreaRef}
        value={value}
        onChange={onChange}
        className={`${baseClasses} resize-none overflow-hidden ${className}`}
        {...rest}
      />
    );
  }

  return (
    <input
      ref={ref}
      value={value}
      onChange={onChange}
      className={`${baseClasses} ${className}`}
      {...rest}
    />
  );
});

export default Input;
