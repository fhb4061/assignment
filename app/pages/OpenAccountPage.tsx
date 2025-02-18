import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../component/Toast/ToastContext";
import { mockCreateAccount } from "../mock/mockapi";
import { useCustomForm } from "../hooks/useCustomForm";

// TODO: how can we pass this to our useCustomForm?
export type AccountType = "savings" | "everyday";

const OpenAccountPage: FC = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const { showToast } = useToast();

    const { values, errors, handleSubmit, register } = useCustomForm(
        { nickName: "", accountType: "savings" as AccountType, savingsGoal: 0 },
        {
            nickName: { required: true, minLengh: 5, maxLength: 30 },
            accountType: { required: true },
            savingsGoal: { required: true }
        }
    );

    const onSubmit = async (data: { nickName: string, accountType: AccountType, savingsGoal: number }) => {

        // if had to use actual api call
        // const response = await fetch("/api/create-account", {
        //     method: "POST",
        //     body: JSON.stringify(payload)
        // });

        setIsSubmitting(true);
        const response = await mockCreateAccount(data);

        if (!response.success) {
            let message = "Something went wrong";
            if (response.errorMessage) {
                message = response.errorMessage;
            }

            showToast(message, "error");
            setIsSubmitting(false);
            throw new Error("Failed to create account");
        } else {
            showToast(`Account ${data.nickName} succefully created`, "success");
            navigate("/");
        }
    }

    return (
        <div>
            <span>Create account</span>
            {
                isSubmitting ? <div><span>Submitting</span></div> : (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <div><label>Account Nickname</label></div>
                            <input
                                type="text"
                                {...register("nickName")}
                            />

                            {errors.nickName &&
                                <div>
                                    <span style={{ color: "red" }}>{errors.nickName}</span>
                                </div>
                            }
                        </div>

                        <div>
                            <div><label>Account Type</label></div>
                            <div>
                                <input
                                    type="radio"
                                    {...register("accountType", "everyday")}
                                />
                                Everyday
                                {errors.accountType &&
                                    <div>
                                        <span style={{ color: "red" }}>{errors.accountType}</span>
                                    </div>
                                }
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    {...register("accountType", "savings")}
                                />
                                Savings
                                {errors.accountType &&
                                    <div>
                                        <span>{errors.accountType}</span>
                                    </div>
                                }
                            </div>
                        </div>

                        {
                            values.accountType === "savings" && (
                                <div>
                                    <div><label>Account Nickname</label></div>
                                    <input
                                        type="number"
                                        {...register("savingsGoal")}
                                    />

                                    {errors.savingsGoal &&
                                        <div>
                                            <span style={{ color: "red" }}>{errors.savingsGoal}</span>
                                        </div>
                                    }
                                </div>
                            )
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