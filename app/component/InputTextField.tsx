import { FC } from "react";
import { SharedInputProps } from "../model/common-model";

const InputTextField: FC<SharedInputProps<string>> = (props) => {

    return (
        <div>
            <div>
                <label>{props.label}</label>
            </div>

            <input
                type="text"
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
            />
        </div>
    )
}

export default InputTextField;