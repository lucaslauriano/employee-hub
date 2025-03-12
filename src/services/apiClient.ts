// import { getSession, signOut } from 'next-auth/react';
//import { UserWithToken } from '@/types/users';

interface QueryParams {
  [key: string]: string | number | boolean;
}

interface RequestOptions extends RequestInit {
  queryParams?: QueryParams;
}

export async function apiRequest<T>(
  route: string,
  { queryParams, headers, ...fetchOptions }: RequestOptions = {},
  isMultipartForm = false
): Promise<T> {
  try {
    const queryString = queryParams
      ? `?${new URLSearchParams(queryParams as Record<string, string>)}`
      : '';

    // const session = (await getSession()) as { user: UserWithToken | null };
    // const token = session?.user?.token ?? '';

    const defaultHeaders: HeadersInit = {
      ...(isMultipartForm ? {} : { 'Content-Type': 'application/json' }),
      // ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers, // override default headers
    };

    const response = await fetch(`/api/${route}${queryString}`, {
      ...fetchOptions,
      headers: defaultHeaders,
    });

    if (!response.ok) {
      const data = await response.json();
      if (response.status === 401 || response.status === 412) {
        if (typeof window !== 'undefined') {
          console.error('API request failed:', data);

          // signOut();
        }
      }
      console.error('API request failed:', data);
      throw new Error('API request failed');
    }

    return response.status === 204 ? ({} as T) : response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}
