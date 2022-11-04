export type LoginData = {
  user_id: string;
  password: string;
};

export type TokenData = {
  accessToken: string;
  refreshToken: string;
};

export type LoginResponse = {
  code: number;
  data: TokenData;
};

export type TokenResponse = {
  code: number;
  data: {
    newAccessToken: string;
    newRefreshToken: string;
  };
};

export type UserInfoData = {
  user_id: string;
  name: string;
};

export type UserInfoResponse = {
  code: number;
  data: UserInfoData;
};

export type UserData = {
  user_id: string;
  name: string;
  token: TokenData;
};

///

export type SymptomData = {
  id: number;
  name: string;
  icon: string;
  iconColor: string;
  type: string[];
};

export type SymptomResponse = {
  code: number;
  data: SymptomData[];
};

///

export type MedicineData = {
  id: number;
  name: string;
  quantity: number;
  icon: string;
  type: string;
  ingredient: string;
  effect: string;
  dosage: string;
};

export type MedicineResponse = {
  code: number;
  data: MedicineData[];
};

///

export type MedicineTypeData = {
  id: number;
  name: string;
  type: string;
  icon: string;
  iconColor: string;
};

export type MedicineTypeResponse = {
  code: number;
  data: MedicineTypeData[];
};

export type WalletData = {
  user_id: string;
  healthcare_flag: boolean;
  money: string;
};

export type WalletResponse = {
  code: number;
  data: WalletData;
};
