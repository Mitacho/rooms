import * as Apollo from "@apollo/client";
import { gql } from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type FieldError = {
  __typename?: "FieldError";
  field: Scalars["String"];
  message: Scalars["String"];
};

export type LoginInput = {
  avatarUrl: Scalars["String"];
  bio?: InputMaybe<Scalars["String"]>;
  login: Scalars["String"];
  name?: InputMaybe<Scalars["String"]>;
};

export type Message = {
  __typename?: "Message";
  from: User;
  id: Scalars["ID"];
  message: Scalars["String"];
  time: Scalars["DateTime"];
  to: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  findGitHubUser: UserResponse;
  login: UserResponse;
  logout: Scalars["Boolean"];
  sendMessage: Scalars["Boolean"];
};

export type MutationFindGitHubUserArgs = {
  login: Scalars["String"];
};

export type MutationLoginArgs = {
  options: LoginInput;
};

export type MutationSendMessageArgs = {
  options: SendMessageInput;
};

export type Query = {
  __typename?: "Query";
  hello: Scalars["String"];
  me?: Maybe<User>;
  room?: Maybe<Room>;
  rooms: Array<Room>;
};

export type QueryRoomArgs = {
  slug?: InputMaybe<Scalars["String"]>;
};

export type Room = {
  __typename?: "Room";
  description: Scalars["String"];
  discussion: Scalars["String"];
  members: Array<User>;
  messages: Array<Message>;
  slug: Scalars["String"];
};

export type SendMessageInput = {
  from: UserInput;
  message: Scalars["String"];
  to: Scalars["String"];
};

export type User = {
  __typename?: "User";
  avatarUrl: Scalars["String"];
  bio?: Maybe<Scalars["String"]>;
  login: Scalars["String"];
  name?: Maybe<Scalars["String"]>;
};

export type UserInput = {
  avatarUrl: Scalars["String"];
  bio?: InputMaybe<Scalars["String"]>;
  login: Scalars["String"];
  name?: InputMaybe<Scalars["String"]>;
};

export type UserResponse = {
  __typename?: "UserResponse";
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UserFragment = {
  __typename?: "User";
  login: string;
  name?: string | null;
  avatarUrl: string;
  bio?: string | null;
};

export type LoginMutationVariables = Exact<{
  options: LoginInput;
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  login: {
    __typename?: "UserResponse";
    errors?: Array<{
      __typename?: "FieldError";
      field: string;
      message: string;
    }> | null;
    user?: {
      __typename?: "User";
      login: string;
      name?: string | null;
      avatarUrl: string;
    } | null;
  };
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: "Mutation"; logout: boolean };

export type FindGitHubUserMutationVariables = Exact<{
  login: Scalars["String"];
}>;

export type FindGitHubUserMutation = {
  __typename?: "Mutation";
  findGitHubUser: {
    __typename?: "UserResponse";
    errors?: Array<{
      __typename?: "FieldError";
      field: string;
      message: string;
    }> | null;
    user?: {
      __typename?: "User";
      login: string;
      name?: string | null;
      avatarUrl: string;
      bio?: string | null;
    } | null;
  };
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: "Query";
  me?: {
    __typename?: "User";
    login: string;
    name?: string | null;
    avatarUrl: string;
    bio?: string | null;
  } | null;
};

export type RoomQueryVariables = Exact<{
  slug?: InputMaybe<Scalars["String"]>;
}>;

export type RoomQuery = {
  __typename?: "Query";
  room?: {
    __typename?: "Room";
    slug: string;
    discussion: string;
    description: string;
    members: Array<{
      __typename?: "User";
      login: string;
      avatarUrl: string;
      name?: string | null;
      bio?: string | null;
    }>;
    messages: Array<{
      __typename?: "Message";
      to: string;
      message: string;
      time: any;
      id: string;
      from: {
        __typename?: "User";
        login: string;
        name?: string | null;
        avatarUrl: string;
        bio?: string | null;
      };
    }>;
  } | null;
};

export type RoomsQueryVariables = Exact<{ [key: string]: never }>;

export type RoomsQuery = {
  __typename?: "Query";
  rooms: Array<{
    __typename?: "Room";
    slug: string;
    discussion: string;
    description: string;
    members: Array<{
      __typename?: "User";
      avatarUrl: string;
      login: string;
      name?: string | null;
    }>;
  }>;
};

export const UserFragmentDoc = gql`
  fragment User on User {
    login
    name
    avatarUrl
    bio
  }
`;
export const LoginDocument = gql`
  mutation Login($options: LoginInput!) {
    login(options: $options) {
      errors {
        field
        message
      }
      user {
        login
        name
        avatarUrl
      }
    }
  }
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;
export type LogoutMutationFn = Apollo.MutationFunction<
  LogoutMutation,
  LogoutMutationVariables
>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LogoutMutation,
    LogoutMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    options
  );
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>;
export const FindGitHubUserDocument = gql`
  mutation FindGitHubUser($login: String!) {
    findGitHubUser(login: $login) {
      errors {
        field
        message
      }
      user {
        ...User
      }
    }
  }
  ${UserFragmentDoc}
`;
export type FindGitHubUserMutationFn = Apollo.MutationFunction<
  FindGitHubUserMutation,
  FindGitHubUserMutationVariables
>;

/**
 * __useFindGitHubUserMutation__
 *
 * To run a mutation, you first call `useFindGitHubUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFindGitHubUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [findGitHubUserMutation, { data, loading, error }] = useFindGitHubUserMutation({
 *   variables: {
 *      login: // value for 'login'
 *   },
 * });
 */
export function useFindGitHubUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    FindGitHubUserMutation,
    FindGitHubUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    FindGitHubUserMutation,
    FindGitHubUserMutationVariables
  >(FindGitHubUserDocument, options);
}
export type FindGitHubUserMutationHookResult = ReturnType<
  typeof useFindGitHubUserMutation
>;
export type FindGitHubUserMutationResult =
  Apollo.MutationResult<FindGitHubUserMutation>;
export type FindGitHubUserMutationOptions = Apollo.BaseMutationOptions<
  FindGitHubUserMutation,
  FindGitHubUserMutationVariables
>;
export const MeDocument = gql`
  query Me {
    me {
      ...User
    }
  }
  ${UserFragmentDoc}
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
  baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const RoomDocument = gql`
  query Room($slug: String) {
    room(slug: $slug) {
      slug
      members {
        login
        avatarUrl
        name
        bio
      }
      discussion
      description
      messages {
        from {
          login
          name
          avatarUrl
          bio
        }
        to
        message
        time
        id
      }
    }
  }
`;

/**
 * __useRoomQuery__
 *
 * To run a query within a React component, call `useRoomQuery` and pass it any options that fit your needs.
 * When your component renders, `useRoomQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRoomQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useRoomQuery(
  baseOptions?: Apollo.QueryHookOptions<RoomQuery, RoomQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<RoomQuery, RoomQueryVariables>(RoomDocument, options);
}
export function useRoomLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<RoomQuery, RoomQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<RoomQuery, RoomQueryVariables>(
    RoomDocument,
    options
  );
}
export type RoomQueryHookResult = ReturnType<typeof useRoomQuery>;
export type RoomLazyQueryHookResult = ReturnType<typeof useRoomLazyQuery>;
export type RoomQueryResult = Apollo.QueryResult<RoomQuery, RoomQueryVariables>;
export const RoomsDocument = gql`
  query Rooms {
    rooms {
      slug
      members {
        avatarUrl
        login
        name
      }
      discussion
      description
    }
  }
`;

/**
 * __useRoomsQuery__
 *
 * To run a query within a React component, call `useRoomsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRoomsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRoomsQuery({
 *   variables: {
 *   },
 * });
 */
export function useRoomsQuery(
  baseOptions?: Apollo.QueryHookOptions<RoomsQuery, RoomsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<RoomsQuery, RoomsQueryVariables>(
    RoomsDocument,
    options
  );
}
export function useRoomsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<RoomsQuery, RoomsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<RoomsQuery, RoomsQueryVariables>(
    RoomsDocument,
    options
  );
}
export type RoomsQueryHookResult = ReturnType<typeof useRoomsQuery>;
export type RoomsLazyQueryHookResult = ReturnType<typeof useRoomsLazyQuery>;
export type RoomsQueryResult = Apollo.QueryResult<
  RoomsQuery,
  RoomsQueryVariables
>;
