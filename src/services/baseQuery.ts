import {
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError
} from '@reduxjs/toolkit/query';

export const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('tokens');
    console.log("token124",token);
    
    if (token) {
      const tokenParse = JSON.parse(token);
      const {
        token: { accessToken }
      } = tokenParse;
      headers.set('Authorization', `Bearer ${accessToken}`);
    }
    return headers;
  }
});

export const baseQueryWithoutToken = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`
});

export const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const refreshArgs = {
      url: '/get-refresh-token',
      body: {
        refreshToken: JSON.parse(localStorage.getItem('tokens') || '{}').token
          .refreshToken
      },
      method: 'POST'
    };
    try {
      const refreshResult = await baseQuery(refreshArgs, api, extraOptions);
      if (refreshResult.data) {
        localStorage.setItem(
          'tokens',
          JSON.stringify({ token: refreshResult.data })
        );
        result = await baseQuery(args, api, extraOptions);
      } else {
        window.location.href = '/';
        localStorage.removeItem('tokens');
        localStorage.removeItem('user');
        localStorage.removeItem('permissions');
      }
    } catch (error) {
      localStorage.removeItem('tokens');
      localStorage.removeItem('user');
      localStorage.removeItem('permissions');
    }
  }
  return result;
};
