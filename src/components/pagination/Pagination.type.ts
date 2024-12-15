export interface IPagination {
  page: number;
  totalCount: number;
  onPageSelect: (page: number) => void;
}

export enum BUTTON_ACTION {
  PREV,
  NEXT,
}
