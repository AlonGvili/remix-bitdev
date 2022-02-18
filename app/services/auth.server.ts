import { GitHubExtraParams, GitHubProfile, GitHubStrategy } from "remix-auth-github";
import { GoogleExtraParams, GoogleProfile, GoogleStrategy } from "remix-auth-google";
import { FormStrategy } from "remix-auth-form";
import { Authenticator, AuthorizationError } from "remix-auth";
import { sessionStorage } from "./session.server";
import { db } from "./db.server";
import bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";

async function getUser({ email }: { email: string }) {
	return await db.user.findFirst({
		where: { email },
		include: {
			scopes: true,
			profile: true
		}
	});
}

type AuthReturnType = Prisma.PromiseReturnType<typeof getUser>;

export let authenticator = new Authenticator<
	| {
			id: string;
			email: string;
	  }
	| Error
>(sessionStorage);

export async function loginGithub({
	accessToken,
	extraParams,
	profile
}: {
	profile: GitHubProfile;
	accessToken: string;
	extraParams: GitHubExtraParams;
}) {
	console.log("login", {
		accessToken,
		extraParams,
		...profile
	});
	let user = await getUser({ email: profile.emails[0].value });
	if (!user) {
		return await db.user.create({
			data: {
				email: profile.emails[0].value,
				password: accessToken,
				profile: {
					create: {
						provider: "github",
						primaryEmail: `no-reply+${profile.emails[0].value.split("@")[0]}_github@bit.dev`,
						name: profile._json.name,
						displayName: profile.displayName,
						bio: profile._json.bio,
						company: profile._json.company,
						location: profile._json.location,
						homepage: profile._json.html_url,
						avatar: profile._json.avatar_url,
						emails: profile._json.email,
					}
				}
			}
		});
	}
	return { id: user?.id!, email: user?.email! };
}

export async function loginGoogle({
	accessToken,
	refreshToken,
	extraParams,
	profile
}: {
	profile: GoogleProfile;
	accessToken: string;
	refreshToken: string;
	extraParams: GoogleExtraParams;
}) {
	console.log("login", {
		accessToken,
		extraParams,
		...profile
	});
	let user = await getUser({ email: profile.emails[0].value });
	if (!user) {
		return await db.user.create({
			data: {
				email: profile.emails[0].value,
				password: accessToken,
				profile: {
					create: {
						provider: "google",
						primaryEmail: `no-reply+${profile._json.email.split("@")[0]}_google@bit.dev`,
						name: profile._json.email.split("@")[0],
						displayName: profile.displayName,
						bio: "",
						company: "",
						location: "",
						homepage: "",
						avatar: profile._json.picture,
						emails: profile._json.email
					}
				}
			}
		});
	}
	return { id: user?.id!, email: user?.email! };
}

if (!process.env.GOOGLE_CLIENT_ID) throw new Error("GOOGLE_CLIENT_ID is not set");
if (!process.env.GOOGLE_CLIENT_SECRET) throw new Error("GOOGLE_CLIENT_SECRET is not set");
if (!process.env.GITHUB_CLIENT_ID) throw new Error("GITHUB_CLIENT_ID is not set");
if (!process.env.GITHUB_CLIENT_SECRET) throw new Error("GITHUB_CLIENT_SECRET is not set");

let googleStrategy = new GoogleStrategy(
	{
		clientID: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		callbackURL: "http://localhost:3000/auth/google/callback"
	},
	async ({ accessToken, refreshToken, extraParams, profile }) => await loginGoogle({ accessToken, refreshToken, extraParams, profile })
);

let gitHubStrategy = new GitHubStrategy(
	{
		clientID: process.env.GITHUB_CLIENT_ID,
		clientSecret: process.env.GITHUB_CLIENT_SECRET,
		callbackURL: "http://localhost:3000/auth/github/callback"
	},
	async ({ accessToken, extraParams, profile }) => await loginGithub({ accessToken, extraParams, profile })
);

authenticator
	.use(googleStrategy, "google")
	.use(gitHubStrategy, "github")
	.use(
		new FormStrategy(async ({ form }) => {
			const email = form.get("email") as string;
			if (!email) throw new AuthorizationError("Email is required");
			const password = form.get("password") as string;
			if (!password) throw new AuthorizationError("Password is required");
			let user = await getUser({ email });
			let isOk = user && (await bcrypt.compare(password, user.password));
			if (!isOk) throw new AuthorizationError("Login Failed. The username or password may be incorrect.");
			return user;
			// replace the code below with your own authentication logic
		}),
		"form"
	);
