/* eslint-disable react/display-name */
import React, { useEffect, useReducer } from "react";
import { Input } from "./ui/input";
import { formatMoneyValue } from "@/lib";

type MoneyInputProps = React.TextareaHTMLAttributes<HTMLInputElement> & {
  onValueChange?: (value: number) => void;
  maxValue?: number;
};

const MoneyInput = React.forwardRef<HTMLInputElement, MoneyInputProps>(
  ({ value, maxValue, ...props }, ref) => {
    const initialValue = value
      ? formatMoneyValue(Number(value))
      : formatMoneyValue(0);

    const [formattedValue, setFormattedValue] = useReducer(
      (_: string, next: string) => {
        const digits = next.replace(/\D/g, "");
        return formatMoneyValue(Number(digits) / 100);
      },
      initialValue
    );

    function handleChange(formattedValue: string) {
      const digits = formattedValue.replace(/\D/g, "");
      const realValue = Number(digits) / 100;

      if (maxValue !== undefined && realValue > maxValue) {
        return;
      }

      if (props.onValueChange) props.onValueChange(realValue);
    }

    useEffect(() => {
      setFormattedValue(initialValue);
    }, [initialValue, value]);

    return (
      <Input
        {...props}
        inputMode="decimal"
        type="text"
        value={formattedValue}
        ref={ref}
        onChange={(ev) => {
          const newValue = ev.target.value;
          const digits = newValue.replace(/\D/g, "");
          const realValue = Number(digits) / 100;

          if (maxValue !== undefined && realValue > maxValue) {
            return;
          }

          setFormattedValue(newValue);
          handleChange(newValue);
        }}
      />
    );
  }
);

export { MoneyInput };
