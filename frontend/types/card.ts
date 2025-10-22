export interface ICardType {
  title: string;
  icon: string;
  favourite: boolean;
  color: string;
  description: string;
  cards: string[];
  isNew: boolean;
}

export interface ICustomCategoryType {
  id: number;
  title: string;
  cards: string[];
}
