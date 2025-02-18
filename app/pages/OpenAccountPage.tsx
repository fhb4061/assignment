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
    const [savingsGoal, setSavingsGoal] = useState<number>();
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [submitting, setSubmitting] = useState(false);

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

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        setSubmitting(true);
        const payload = {
            nickName,
            accountType,
            savingsGoal
        }

        const response = await fetch("/api/create-account", {
            method: "POST",
            body: JSON.stringify(payload)
        });

        setSubmitting(false);
        if (!response.ok) throw new Error("Failed to create account");

        navigate("/");
    }

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        // TODO: sanitize nickname
        if (!nickName) {
            newErrors.nickName = "Nickname is required";
        } else if (nickName.length < 5 || nickName.length > 30) {
            newErrors.nickName = "Nickname must be between 5 and 30 characters";
        } else {
            delete newErrors.nickName;
        }

        if (accountType === "savings" && savingsGoal !== undefined && savingsGoal > 1_000_000) {
            newErrors.savingsGoal = "Savings goal must be up to 1 million";
        } else {
            delete newErrors.savingsGoal;
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    return (
        <div>
            <span>Create account</span>
            {
                submitting ? <span>Submitting</span> : (
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
                                    <div key={radio.value}>
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
                                value={savingsGoal}
                                onChange={(e) => setSavingsGoal(e)}
                                error={errors?.savingsGoal}
                            />
                        }
                        <button type="submit">
                            Create account
                        </button>
                    </form>
                )
            }
        </div>
    )
}

export default OpenAccountPage;