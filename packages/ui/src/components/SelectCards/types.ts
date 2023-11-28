export type SelectItem = string;
export type SelectedHandler = (item: SelectItem) => void;
export type SelectCardsProps = {
  selectItems?: SelectItem[];
  onSelected?: SelectedHandler;
};
