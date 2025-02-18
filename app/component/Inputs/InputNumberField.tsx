import { FC } from "react";
import { SharedInputProps } from "../../model/common-model";

const InputNumberField: FC<SharedInputProps<number>> = (props) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const parsed = inputValue === "" ? undefined : Number(inputValue);

        props.onChange(parsed);
    }

    return (
        <div>
            <div>
                <label htmlFor={props.id}>{props.label}</label>
            </div>

            <input
                id={props.id}
                type="number"
                value={props.value ?? ""}
                onChange={handleChange}
            />
            {props?.error &&
                <p style={{ color: "red" }}>{props.error}</p>
            }
        </div>
    )
}

export default InputNumberField;