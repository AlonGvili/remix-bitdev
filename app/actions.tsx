import { Prisma, Visibility } from "@prisma/client";
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
    include: {
      owner: {
        include: {
          profile: true,
        },
      },
      collaborators: true,
      _count: true,
      tags: true,
      components: {
        include: {
          _count: true,
        },
      },
    },
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

export async function deleteUser(user: Prisma.UserDeleteArgs) {
  return await db.user.delete({
    ...user,
  });
}

export type GetUser = Prisma.PromiseReturnType<typeof getUser>;
export type GetUsers = Prisma.PromiseReturnType<typeof getUsers>;
export type CreateUser = Prisma.PromiseReturnType<typeof createUser>;

// Components
export async function getComponent(props: Prisma.ComponentFindUniqueArgs) {
  return await db.component.findUnique({
    ...props,
    include: {
      Scope: true,
      _count: true,
      component: true,
      dependencies: true,
      tags: true,
      tests: true,
      versions: true,
    },
  });
}

export async function getComponents(props: Prisma.ComponentFindManyArgs) {
  return await db.component.findMany({
    ...props,
    include: {
      Scope: true,
      _count: true,
      component: true,
      dependencies: true,
      tags: true,
      tests: true,
      versions: true,
    },
  });
}

export async function createComponent(component: Prisma.ComponentCreateInput) {
  let newUser = await db.component.create({
    data: {
      ...component,
    },
    include: {
      Scope: true,
      _count: true,
      component: true,
      dependencies: true,
      tags: true,
      tests: true,
      versions: true,
    },
  });
  return newUser;
}

export async function deleteComponent(component: Prisma.ComponentDeleteArgs) {
  return await db.component.delete({
    ...component,
  });
}

export type GetComponent = Prisma.PromiseReturnType<typeof getComponent>;
export type GetComponents = Prisma.PromiseReturnType<typeof getComponents>;
export type CreateComponent = Prisma.PromiseReturnType<typeof createComponent>;

// Organizations
export async function getOrganization(
  props: Prisma.OrganizationFindUniqueArgs
) {
  return await db.organization.findUnique({
    ...props,
    include: {
      _count: true,
      members: true,
      owner: true,
      scopes: true,
    },
  });
}

export async function getOrganizations(props: Prisma.OrganizationFindManyArgs) {
  return await db.organization.findMany({
    ...props,
    include: {
      _count: true,
      members: true,
      owner: true,
    },
  });
}

export async function createOrganization(user: Prisma.OrganizationCreateInput) {
  let newUser = await db.organization.create({
    data: {
      ...user,
    },
    include: {
      _count: true,
      members: true,
      owner: true,
    },
  });
  return newUser;
}

export async function deleteOrganization(
  organization: Prisma.OrganizationDeleteArgs
) {
  return await db.organization.delete({
    ...organization,
  });
}

export type GetOrganization = Prisma.PromiseReturnType<typeof getOrganization>;
export type GetOrganizations = Prisma.PromiseReturnType<
  typeof getOrganizations
>;
export type CreateOrganization = Prisma.PromiseReturnType<
  typeof createOrganization
>;
