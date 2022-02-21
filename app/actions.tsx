import { Scope, Prisma, Visibility } from "@prisma/client";
import { db } from "~/services/db.server";

// Scopes
export async function createScope(scope: Prisma.ScopeCreateInput) {
  let newScope = await db.scope.create({
    data: {
      ...scope,
      harmony: Boolean(scope.harmony),
      privacy: scope.privacy?.toUpperCase() as Visibility,
    },
    include: {
      owner: {
        include: {
          profile: true,
        },
      },
    },
  });
  return newScope;
}

export async function getScopes(props: Prisma.ScopeFindManyArgs) {
  return await db.scope.findMany({
    ...props,
  });
}

export async function getScope(props: Prisma.ScopeFindUniqueArgs) {
  return await db.scope.findUnique({
    ...props,
    include: {
      collaborators: true,
      owner: true,
      components: true,
      tags: true,
      _count: true,
    },
  });
}

export type GetScope = Prisma.PromiseReturnType<typeof getScope>;
export type GetScopes = Prisma.PromiseReturnType<typeof getScopes>;
export type CreateScope = Prisma.PromiseReturnType<typeof createScope>;

// Users
export async function getUser(props: Prisma.UserFindUniqueArgs) {
  return await db.user.findUnique({
    ...props,
    include: {
      contributions: true,
      followers: true,
      following: true,
      organizationsAdmin: true,
      profile: true,
      scopes: true,
      _count: true,
      organizations: true,
    },
  });
}

export async function getUsers(props: Prisma.UserFindManyArgs) {
  return await db.user.findMany({
    ...props,
    include: {
      contributions: true,
      followers: true,
      following: true,
      organizationsAdmin: true,
      profile: true,
      scopes: true,
      _count: true,
      organizations: true,
    },
  });
}

export async function createUser(user: Prisma.UserCreateInput) {
  let newUser = await db.user.create({
    data: {
      ...user,
    },
    include: {
      contributions: true,
      followers: true,
      following: true,
      organizationsAdmin: true,
      profile: true,
      scopes: true,
      _count: true,
      organizations: true,
    },
  });
  return newUser;
}

export type GetUser = Prisma.PromiseReturnType<typeof getUser>;
export type GetUsers = Prisma.PromiseReturnType<typeof getUsers>;
export type CreateUser = Prisma.PromiseReturnType<typeof createUser>;
