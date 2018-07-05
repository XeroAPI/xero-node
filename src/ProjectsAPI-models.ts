export interface Project {
	projectId?: string;
	contactId?: string;
	name?: string;
	currencyCode?: string;
	minutesLogged?: number;
	totalTaskAmount?: {
		currency: string,
		value: number
	};
	totalExpenseAmount?: {
		currency: string,
		value: number
	};
	minutesToBeInvoiced?: number;
	taskAmountToBeInvoiced?: {
		currency: string,
		value: number
	};
	taskAmountInvoiced?: {
		currency: string,
		value: number
	};
	expenseAmountToBeInvoiced?: {
		currency: string,
		value: number
	};
	expenseAmountInvoiced?: {
		currency: string,
		value: number
	};
	deposit?: {
		currency: string,
		value: number
	};
	depositApplied?: {
		currency: string,
		value: number
	};
	deadlineUTC?: string;
	totalInvoiced?: {
		currency: string,
		value: number
	};
	totalToBeInvoiced?: {
		currency: string,
		value: number
	};
	estimate?: {
		currency: string,
		value: number
	};
	status?: string;
}
