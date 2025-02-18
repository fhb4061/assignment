import { FC, useState } from "react";

type AccountType = "savings" | "everyday";

const OpenAccountPage: FC = () => {
    const [nickName, setNickName] = useState<string>("");
    const [accountType, setAccountType] = useState<AccountType>("savings");
    const [savingGoal, setSavingGoal] = useState<string>("0");
    const [errors, setErrors] = useState<{[key: string]: string}>({});

    return (
        <div>
            <span>Create account</span>
            <form>
                <div>
                    <label>Account Nickname</label>
                    <input
                     type="text"
                     value={nickName}
                     onChange={(e) => setNickName(e.target.value)}
                    />
                </div>

                <div>
                    <label>Account Type</label>
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
                    <div>
                        <label>Savings goal</label>
                        <input
                            type="number"
                            value={savingGoal}
                            onChange={(e) => setSavingGoal(e.target.value)}
                        />
                    </div>
                }
                <button type="submit" disabled={false}>
                    Create account
                </button>
            </form>
        </div>
    )
}

export default OpenAccountPage;