interface CurrencyAmount {
	currency: string;
	value: number;
}

export interface Project {
	projectId?: string;
	contactId?: string;
	name?: string;
	currencyCode?: string;
	minutesLogged?: number;
	totalTaskAmount?: CurrencyAmount;
	totalExpenseAmount?: CurrencyAmount;
	minutesToBeInvoiced?: number;
	taskAmountToBeInvoiced?: CurrencyAmount;
	taskAmountInvoiced?: CurrencyAmount;
	expenseAmountToBeInvoiced?: CurrencyAmount;
	expenseAmountInvoiced?: CurrencyAmount;
	deposit?: CurrencyAmount;
	depositApplied?: CurrencyAmount;
	deadlineUTC?: string;
	totalInvoiced?: CurrencyAmount;
	totalToBeInvoiced?: CurrencyAmount;
	estimate?: CurrencyAmount;
	status?: 'INPROGRESS' | 'CLOSED';
}
