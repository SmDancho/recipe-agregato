export interface IcardTypes {
  recipe: any;
  label?: string;
  category?: string;
  image?: string;
  href?: String;
  _links?: {
    self?: {
      href?: String;
    };
  };
}

export interface IfavCard {
  label: Array<String>;
  category:  Array<String>;
  img:string;
  cusType:Array<String>;
  _id: number;
  link: String
}

