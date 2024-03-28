import { zustandStorage } from '@/store/mmkv-storage'
import { create } from 'zustand';
import { createJSONStorage, persist } from "zustand/middleware";

export interface Transaction {
	id: string;
	amount: number;
	date: Date;
	title: string;
}

export interface BalanceState {
	transactions: Array<Transaction>;
	runTransaction: (transaction: Transaction) => void;
	balance: () => number;
	clearTransaction: () => void;
}

export const useBalanceStore = create<BalanceState>()(
	persist(
		(set, get) => ({
			transactions: [],
			runTransaction: (transaction: Transaction) => {
				set(state => ({ transactions: [...state.transactions, transaction] }))
			},
			balance: () => get().transactions.reduce((acc, t) => acc + t.amount, 0),
			clearTransaction: () => set(() => ({ transactions: [] })),
		}),
		{
			name: 'balance-storage',
			storage: createJSONStorage(() => zustandStorage),
		})
)
