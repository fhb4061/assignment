import { FC } from "react";
import { SharedInputProps } from "../model/common-model";

const InputNumberField: FC<SharedInputProps<number>> = (props) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const parsed = inputValue === "" ? undefined : Number(inputValue);

        props.onChange(parsed);
    }

    return (
        <div>
            <div>
                <label>{props.label}</label>
            </div>

            <input
                type="number"
                value={props.value ?? ""}
                onChange={handleChange}
            />
            {props?.error &&
                <p>{props.error}</p>
            }
        </div>
    )
}

export default InputNumberField;