import { FC, useState } from "react";
import styles from "./OpenAccountPage.module.scss";
import InputTextField from "../component/InputTextField";
import InputNumberField from "../component/InputNumberField";

type AccountType = "savings" | "everyday";

const OpenAccountPage: FC = () => {
    const [nickName, setNickName] = useState<string>();
    const [accountType, setAccountType] = useState<AccountType>("savings");
    const [savingGoal, setSavingGoal] = useState<number>();
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    return (
        <div>
            <span>Create account</span>
            <form>
                <InputTextField
                    value={nickName}
                    label="Account nickname"
                    min={3}
                    max={30}
                    onChange={(e) => setNickName(e)}
                />

                <div>
                    <div>
                        <label>Account Type</label>
                    </div>
                    <input
                        type="radio"
                        value="everyday"
                        checked={accountType === "everyday"}
                        onChange={(e) => setAccountType(e.target.value as AccountType)}
                    />
                    Every day
                    <input
                        type="radio"
                        value="savings"
                        checked={accountType === "savings"}
                        onChange={(e) => setAccountType(e.target.value as AccountType)}
                    />
                    Savings
                </div>

                {
                    accountType === "savings" &&
                    <InputNumberField
                        label="Savings goal"
                        value={savingGoal}
                        onChange={(e) => setSavingGoal(e)}
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