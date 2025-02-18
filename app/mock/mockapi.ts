import { AccountType } from "../pages/OpenAccountPage";

export type CreateAccountType = {
    nickName?: string;
    savingsGoal?: number;
    accountType?: AccountType;
}

export const mockCreateAccount = (payload: CreateAccountType): Promise<{ success: boolean, errorMessage?: string }> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (payload.accountType === "savings" && !payload.savingsGoal) {
                resolve({ success: false, errorMessage: "savingsGoal is mandatory when accountType is 'savings'" });
            }
            console.log("Api called");
            resolve({ success: true });
        }, 1500);
    })
}