export interface AccountDetails {
  accountId: string;
  balance: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  accountOperationDTOList: AccountOperationDTOList[];
}

export interface AccountOperationDTOList {
  id: number;
  operationDate: Date;
  amount: number;
  type: string;
  description: string;
}

