export interface ActiveTimePeriod {
  open: string;
  close: string;
}

export interface Restaurant {
  name: string;
  id: number;
  coverImage: string;
  menus: string[];
  activeTimePeriod: ActiveTimePeriod;
}

export interface DiscountedTimePeriod {
  begin: string;
  end: string;
}

export interface ShortMenu {
  name: string;
  id: string;
  thumbnailImage?: string;
  fullPrice: number;
  discountedPercent: number;
  discountedTimePeriod?: DiscountedTimePeriod;
  sold: number;
  totalInStock: number;
}

export interface FullMenu extends ShortMenu {
  largeImage?: string;
  options: {
    label: string;
    choices: {
      label: string;
    }[];
  }[];
}