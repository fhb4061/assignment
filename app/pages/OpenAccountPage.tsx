import { FC, useState } from "react";
import InputTextField from "../component/InputTextField";
import InputNumberField from "../component/InputNumberField";
import { useNavigate } from "react-router-dom";

type AccountType = "savings" | "everyday";
type RadioOptionType = {
    value: AccountType;
    label: string;
}

const OpenAccountPage: FC = () => {
    const navigate = useNavigate();
    const [nickName, setNickName] = useState<string>();
    const [accountType, setAccountType] = useState<AccountType>("savings");
    const [savingGoal, setSavingGoal] = useState<number>();
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const radioOption: RadioOptionType[] = [
        {
            value: "savings",
            label: "Savings"
        },
        {
            value: "everyday",
            label: "Everyday"
        }
    ]

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        navigate("/");
    }

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        // TODO: sanitize nickname
        if (!nickName) {
            newErrors.nickName = "Nickname is required";
        } else if (nickName.length < 5 || nickName.length) {
            newErrors.nickName = "Nickname must be between 5 and 30 characters";
        }

        if (accountType === "savings" && savingGoal !== undefined && savingGoal > 1_000_000) {
            newErrors.savingsGoal = "Savings goal must be up to 1 million";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    return (
        <div>
            <span>Create account</span>
            <form onSubmit={onSubmit}>
                <InputTextField
                    value={nickName}
                    label="Account nickname"
                    onChange={(e) => setNickName(e)}
                    error={errors?.nickName}
                />

                <div>
                    <div>
                        <label>Account Type</label>
                    </div>
                    {
                        radioOption.map((radio) => (
                            <div>
                                <input
                                    type="radio"
                                    value={radio.value}
                                    checked={accountType === radio.value}
                                    // type this better
                                    onChange={(e) => setAccountType(e.target.value as AccountType)}
                                />
                                <span>{radio.label}</span>
                            </div>
                        ))
                    }
                </div>

                {
                    accountType === "savings" &&
                    <InputNumberField
                        label="Savings goal"
                        value={savingGoal}
                        onChange={(e) => setSavingGoal(e)}
                        error={errors?.savingsGoal}
                    />
                }
                <button type="submit" disabled={false}>
                    Create account
                </button>
            </form>
        </div>
    )
}

export default OpenAccountPage;