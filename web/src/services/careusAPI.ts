import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  LoginData,
  LoginResponse,
  TokenData,
  TokenResponse,
  UserInfoData,
  UserInfoResponse,
  SymptomData,
  SymptomResponse,
  MedicineData,
  MedicineResponse,
  MedicineTypeData,
  MedicineTypeResponse,
  WalletData,
  WalletResponse,
  ChatData,
  ChatResponse,
} from '../types';

export const careusApi = createApi({
  reducerPath: 'careusApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://careus-api.lunabi.co.kr/v2/' }),
  endpoints: (builder) => ({
    doLogin: builder.mutation<TokenData, LoginData>({
      query: (LoginData) => ({
        url: 'users/login',
        method: 'POST',
        params: LoginData,
      }),
      transformResponse: (response: LoginResponse): TokenData => response.data,
    }),
    refreshToken: builder.mutation<TokenData, TokenData>({
      query: (TokenData) => ({
        url: 'users/refresh',
        method: 'GET',
        headers: {
          token: TokenData.accessToken,
          refresh: TokenData.refreshToken,
        },
      }),
      transformResponse: (response: TokenResponse): TokenData => ({
        accessToken: response.data.newAccessToken,
        refreshToken: response.data.newRefreshToken,
      }),
    }),
    getUserInfo: builder.mutation<UserInfoData, TokenData>({
      query: (TokenData) => ({
        url: 'users',
        method: 'GET',
        headers: {
          token: TokenData.accessToken,
        },
      }),
      transformResponse: (response: UserInfoResponse): UserInfoData =>
        response.data,
    }),
    getSymptoms: builder.mutation<SymptomData[], void>({
      query: () => ({
        url: 'symptoms',
        method: 'GET',
      }),
      transformResponse: (response: SymptomResponse): SymptomData[] =>
        response.data,
    }),
    getMedicines: builder.mutation<MedicineData[], void>({
      query: () => ({
        url: 'medicines',
        method: 'GET',
      }),
      transformResponse: (response: MedicineResponse): MedicineData[] =>
        response.data,
    }),
    getMedicineTypes: builder.mutation<MedicineTypeData[], void>({
      query: () => ({
        url: 'medicines/types',
        method: 'GET',
      }),
      transformResponse: (response: MedicineTypeResponse): MedicineTypeData[] =>
        response.data,
    }),
    getMyWallet: builder.mutation<WalletData, TokenData>({
      query: (TokenData) => ({
        url: 'wallets',
        method: 'GET',
        headers: {
          token: TokenData.accessToken,
        },
      }),
      transformResponse: (response: WalletResponse): WalletData =>
        response.data,
    }),
    getChat: builder.mutation<ChatData[], string>({
      query: (id) => ({
        url: 'chats',
        method: 'GET',
        params: { id },
      }),
      transformResponse: (response: ChatResponse): ChatData[] => response.data,
    }),
  }),
});

export const {
  useDoLoginMutation,
  useRefreshTokenMutation,
  useGetUserInfoMutation,
  useGetSymptomsMutation,
  useGetMedicinesMutation,
  useGetMedicineTypesMutation,
  useGetMyWalletMutation,
  useGetChatMutation,
} = careusApi;
