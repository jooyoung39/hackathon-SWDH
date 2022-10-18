export type UserData = {
  id: string;
  name: string;
  is_healthcare: boolean;
};

export type LoginData = {
  id: string;
  password: string;
};

export type AccountResponse = {
  ok: boolean;
  account: UserData;
};

///

export type SymptomData = {
  id: number;
  name: string;
  icon: string;
  iconColor: string;
  type: string[];
}[];

export type SymptomResponse = {
  ok: boolean;
  symptoms: SymptomData;
};
