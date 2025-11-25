/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
    [_ in K]?: never;
};
export type Incremental<T> =
    | T
    | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: { input: string; output: string };
    String: { input: string; output: string };
    Boolean: { input: boolean; output: boolean };
    Int: { input: number; output: number };
    Float: { input: number; output: number };
    /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
    Date: { input: any; output: any };
    /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
    DateTime: { input: any; output: any };
    /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
    JSON: { input: any; output: any };
    /** The `Long` scalar type represents 52-bit integers */
    Long: { input: any; output: any };
    /** A time string with format: HH:mm:ss.SSS */
    Time: { input: any; output: any };
    /** The `Upload` scalar type represents a file upload. */
    Upload: { input: any; output: any };
};

export enum CacheControlScope {
    Private = 'PRIVATE',
    Public = 'PUBLIC',
}

export type ForgotPassword = {
    __typename?: 'ForgotPassword';
    ok?: Maybe<Scalars['Boolean']['output']>;
};

export type InputId = {
    id: Scalars['ID']['input'];
};

export type Morph =
    | ForgotPassword
    | UploadFile
    | UsersPermissionsLoginPayload
    | UsersPermissionsMe
    | UsersPermissionsMeRole
    | UsersPermissionsPermission
    | UsersPermissionsRole
    | UsersPermissionsUser
    | CreateUserPayload
    | UpdateUserPayload;

export type Mutation = {
    __typename?: 'Mutation';
    changePassword?: Maybe<UsersPermissionsLoginPayload>;
    emailConfirmation?: Maybe<UsersPermissionsLoginPayload>;
    forgotPassword?: Maybe<ForgotPassword>;
    login: UsersPermissionsLoginPayload;
    multipleUpload: Array<Maybe<UploadFile>>;
    register: UsersPermissionsLoginPayload;
    /** Update an existing user */
    updateUser?: Maybe<UpdateUserPayload>;
    upload: UploadFile;
};

export type MutationChangePasswordArgs = {
    code: Scalars['String']['input'];
    password: Scalars['String']['input'];
    passwordConfirmation: Scalars['String']['input'];
};

export type MutationEmailConfirmationArgs = {
    confirmation: Scalars['String']['input'];
};

export type MutationForgotPasswordArgs = {
    email: Scalars['String']['input'];
};

export type MutationLoginArgs = {
    input: UsersPermissionsLoginInput;
};

export type MutationMultipleUploadArgs = {
    field?: InputMaybe<Scalars['String']['input']>;
    files: Array<InputMaybe<Scalars['Upload']['input']>>;
    ref?: InputMaybe<Scalars['String']['input']>;
    refId?: InputMaybe<Scalars['ID']['input']>;
    source?: InputMaybe<Scalars['String']['input']>;
};

export type MutationRegisterArgs = {
    input: UserInput;
};

export type MutationUpdateUserArgs = {
    input?: InputMaybe<UpdateUserInput>;
};

export type MutationUploadArgs = {
    field?: InputMaybe<Scalars['String']['input']>;
    file: Scalars['Upload']['input'];
    ref?: InputMaybe<Scalars['String']['input']>;
    refId?: InputMaybe<Scalars['ID']['input']>;
    source?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
    __typename?: 'Query';
    me?: Maybe<UsersPermissionsMe>;
    user?: Maybe<UsersPermissionsUser>;
};

export type QueryUserArgs = {
    id: Scalars['ID']['input'];
};

export type RoleInput = {
    description?: InputMaybe<Scalars['String']['input']>;
    name: Scalars['String']['input'];
    permissions?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
    type?: InputMaybe<Scalars['String']['input']>;
    users?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

export type UploadFile = {
    __typename?: 'UploadFile';
    alternativeText?: Maybe<Scalars['String']['output']>;
    caption?: Maybe<Scalars['String']['output']>;
    created_at: Scalars['DateTime']['output'];
    ext?: Maybe<Scalars['String']['output']>;
    formats?: Maybe<Scalars['JSON']['output']>;
    hash: Scalars['String']['output'];
    height?: Maybe<Scalars['Int']['output']>;
    id: Scalars['ID']['output'];
    mime: Scalars['String']['output'];
    name: Scalars['String']['output'];
    previewUrl?: Maybe<Scalars['String']['output']>;
    provider: Scalars['String']['output'];
    provider_metadata?: Maybe<Scalars['JSON']['output']>;
    related?: Maybe<Array<Maybe<Morph>>>;
    size: Scalars['Float']['output'];
    updated_at: Scalars['DateTime']['output'];
    url: Scalars['String']['output'];
    width?: Maybe<Scalars['Int']['output']>;
};

export type UploadFileRelatedArgs = {
    limit?: InputMaybe<Scalars['Int']['input']>;
    sort?: InputMaybe<Scalars['String']['input']>;
    start?: InputMaybe<Scalars['Int']['input']>;
    where?: InputMaybe<Scalars['JSON']['input']>;
};

export type UserInput = {
    blocked?: InputMaybe<Scalars['Boolean']['input']>;
    confirmed?: InputMaybe<Scalars['Boolean']['input']>;
    email: Scalars['String']['input'];
    firstName?: InputMaybe<Scalars['String']['input']>;
    lastName?: InputMaybe<Scalars['String']['input']>;
    password?: InputMaybe<Scalars['String']['input']>;
    provider?: InputMaybe<Scalars['String']['input']>;
    resetPasswordToken?: InputMaybe<Scalars['String']['input']>;
    role?: InputMaybe<Scalars['ID']['input']>;
    username: Scalars['String']['input'];
};

export type UsersPermissionsLoginInput = {
    identifier: Scalars['String']['input'];
    password: Scalars['String']['input'];
    provider?: InputMaybe<Scalars['String']['input']>;
};

export type UsersPermissionsLoginPayload = {
    __typename?: 'UsersPermissionsLoginPayload';
    jwt: Scalars['String']['output'];
    user: UsersPermissionsMe;
};

export type UsersPermissionsMe = {
    __typename?: 'UsersPermissionsMe';
    blocked?: Maybe<Scalars['Boolean']['output']>;
    confirmed?: Maybe<Scalars['Boolean']['output']>;
    email: Scalars['String']['output'];
    id: Scalars['ID']['output'];
    role?: Maybe<UsersPermissionsMeRole>;
    username: Scalars['String']['output'];
};

export type UsersPermissionsMeRole = {
    __typename?: 'UsersPermissionsMeRole';
    description?: Maybe<Scalars['String']['output']>;
    id: Scalars['ID']['output'];
    name: Scalars['String']['output'];
    type?: Maybe<Scalars['String']['output']>;
};

export type UsersPermissionsPermission = {
    __typename?: 'UsersPermissionsPermission';
    action: Scalars['String']['output'];
    controller: Scalars['String']['output'];
    enabled: Scalars['Boolean']['output'];
    id: Scalars['ID']['output'];
    policy?: Maybe<Scalars['String']['output']>;
    role?: Maybe<UsersPermissionsRole>;
    type: Scalars['String']['output'];
};

export type UsersPermissionsRole = {
    __typename?: 'UsersPermissionsRole';
    description?: Maybe<Scalars['String']['output']>;
    id: Scalars['ID']['output'];
    name: Scalars['String']['output'];
    permissions?: Maybe<Array<Maybe<UsersPermissionsPermission>>>;
    type?: Maybe<Scalars['String']['output']>;
    users?: Maybe<Array<Maybe<UsersPermissionsUser>>>;
};

export type UsersPermissionsRolePermissionsArgs = {
    limit?: InputMaybe<Scalars['Int']['input']>;
    sort?: InputMaybe<Scalars['String']['input']>;
    start?: InputMaybe<Scalars['Int']['input']>;
    where?: InputMaybe<Scalars['JSON']['input']>;
};

export type UsersPermissionsRoleUsersArgs = {
    limit?: InputMaybe<Scalars['Int']['input']>;
    sort?: InputMaybe<Scalars['String']['input']>;
    start?: InputMaybe<Scalars['Int']['input']>;
    where?: InputMaybe<Scalars['JSON']['input']>;
};

export type UsersPermissionsUser = {
    __typename?: 'UsersPermissionsUser';
    blocked?: Maybe<Scalars['Boolean']['output']>;
    confirmed?: Maybe<Scalars['Boolean']['output']>;
    created_at: Scalars['DateTime']['output'];
    email: Scalars['String']['output'];
    firstName?: Maybe<Scalars['String']['output']>;
    id: Scalars['ID']['output'];
    lastName?: Maybe<Scalars['String']['output']>;
    provider?: Maybe<Scalars['String']['output']>;
    role?: Maybe<UsersPermissionsRole>;
    updated_at: Scalars['DateTime']['output'];
    username: Scalars['String']['output'];
};

export type CreateUserInput = {
    data?: InputMaybe<UserInput>;
};

export type CreateUserPayload = {
    __typename?: 'createUserPayload';
    user?: Maybe<UsersPermissionsUser>;
};

export type EditRoleInput = {
    description?: InputMaybe<Scalars['String']['input']>;
    name?: InputMaybe<Scalars['String']['input']>;
    permissions?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
    type?: InputMaybe<Scalars['String']['input']>;
    users?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

export type EditUserInput = {
    blocked?: InputMaybe<Scalars['Boolean']['input']>;
    confirmed?: InputMaybe<Scalars['Boolean']['input']>;
    email?: InputMaybe<Scalars['String']['input']>;
    firstName?: InputMaybe<Scalars['String']['input']>;
    lastName?: InputMaybe<Scalars['String']['input']>;
    password?: InputMaybe<Scalars['String']['input']>;
    provider?: InputMaybe<Scalars['String']['input']>;
    resetPasswordToken?: InputMaybe<Scalars['String']['input']>;
    role?: InputMaybe<Scalars['ID']['input']>;
    username?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
    data?: InputMaybe<EditUserInput>;
    where?: InputMaybe<InputId>;
};

export type UpdateUserPayload = {
    __typename?: 'updateUserPayload';
    user?: Maybe<UsersPermissionsUser>;
};

export type LoginMutationVariables = Exact<{
    identifier: Scalars['String']['input'];
    password: Scalars['String']['input'];
}>;

export type LoginMutation = {
    __typename?: 'Mutation';
    login: {
        __typename?: 'UsersPermissionsLoginPayload';
        jwt: string;
        user: { __typename?: 'UsersPermissionsMe'; id: string };
    };
};

export type UserQueryVariables = Exact<{
    id: Scalars['ID']['input'];
}>;

export type UserQuery = {
    __typename?: 'Query';
    user?: {
        __typename?: 'UsersPermissionsUser';
        id: string;
        firstName?: string | null;
        lastName?: string | null;
    } | null;
};

export const LoginDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'login' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'identifier' } },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
                    },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'password' } },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
                    },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'login' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'input' },
                                value: {
                                    kind: 'ObjectValue',
                                    fields: [
                                        {
                                            kind: 'ObjectField',
                                            name: { kind: 'Name', value: 'identifier' },
                                            value: {
                                                kind: 'Variable',
                                                name: { kind: 'Name', value: 'identifier' },
                                            },
                                        },
                                        {
                                            kind: 'ObjectField',
                                            name: { kind: 'Name', value: 'password' },
                                            value: {
                                                kind: 'Variable',
                                                name: { kind: 'Name', value: 'password' },
                                            },
                                        },
                                    ],
                                },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'jwt' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'user' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const UserDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'user' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
                    },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'user' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'id' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<UserQuery, UserQueryVariables>;
