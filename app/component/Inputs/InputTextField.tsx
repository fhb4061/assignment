import { FC } from "react";
import { SharedInputProps } from "../../model/common-model";

const InputTextField: FC<SharedInputProps<string>> = (props) => {
    return (
        <div>
            <div>
                <label htmlFor={props.id}>{props.label}</label>
            </div>

            <input
                id={props.id}
                type="text"
                value={props.value ?? ""}
                onChange={(e) => props.onChange(e.target.value)}
            />

            {props?.error &&
                <p style={{ color: "red" }}>{props.error}</p>
            }
        </div>
    )
}

export default InputTextField;