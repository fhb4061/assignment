import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

type ValidationRules = {
    required?: boolean;
    minLengh?: number;
    maxLength?: number;
}

type FieldValidation = Record<string, ValidationRules>;

type FormState<T> = {
    values: T;
    errors: Record<string, string>
    submitted: boolean;
}

export function useCustomForm<T extends Record<string, any>>(initialValue: T, validations: FieldValidation) {
    const [formState, setFormState] = useState<FormState<T>>({
        values: initialValue,
        errors: {},
        submitted: false
    });

    const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

    // focus on the first error field when form is submitted
    useEffect(() => {
        if (formState.submitted) {
            // get the key for the first error if error message exist
            const firstErrorKey = Object.entries(formState.errors).filter(([_, value]) => {
                if (value) return true;
                return false;
            }).map(([key, _]) => key)[0];

            // focus user to the field they need to correct
            if (firstErrorKey) {
                inputRefs.current[firstErrorKey]?.focus();
            }
        }
    }, [formState.errors, formState.submitted]);

    const validateField = (name: string, value: string) => {
        if (!(name in validations)) return "";
        const rules = validations[name];

        if (!rules) return "";

        if (rules.required && !value) return "This field is required";

        if (rules.minLengh && value.length < rules.minLengh) return `Minimum length is ${rules.minLengh}`;

        if (rules.maxLength && value.length > rules.maxLength) return `Maximum length is ${rules.maxLength}`;

        return "";
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;

        // in theory, we don't need this check since we've typed useCustomForm to always provide a key/value pair
        // and key will be the name. But just to be safe and maybe we should throw an error?
        if (!name) return;

        // edge case for radio button since their values are used to determine if it is checked or not
        const newValue = type === "radio" ? (checked ? value : formState.values[name]) : value ?? "";
        setFormState((prev) => {
            const updatedError = prev.submitted ? { ...prev.errors, [name]: validateField(name, newValue) } : prev.errors;

            return {
                values: { ...prev.values, [name]: newValue },
                errors: updatedError,
                submitted: prev.submitted
            }
        });
    }

    const handleSubmit = (callback: (values: T) => void) => (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newErrors: Record<string, string> = {};
        Object.keys(validations).forEach((field) => {
            const value = formState.values[field];
            const error = validateField(field, value);

            if (error) newErrors[field] = error;
        });

        // if there were errors then we update errors, flag that a submission has been done and return
        if (Object.keys(newErrors).length > 0) {
            setFormState((prev) => ({ ...prev, errors: newErrors, submitted: true }));
            return;
        }

        callback(formState.values);
    }

    const register = (name: keyof T, radioValue?: string) => ({
        name,
        value: radioValue ?? formState.values[name] ?? "",
        checked: radioValue ? formState.values[name] === radioValue : undefined,
        onChange: handleChange,
        ref: (el: HTMLInputElement | null) => {
            inputRefs.current[name as string] = el;
        }
    });

    return {
        values: formState.values,
        errors: formState.errors,
        handleSubmit,
        register
    }
}