export const config = {
  server: {
    basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "http://localhost:4444",
    signUpPath: process.env.NEXT_PUBLIC_SIGN_UP_PATH ?? "/v1/users/signup",
    signInPath: process.env.NEXT_PUBLIC_SIGN_IN_PATH ?? "/v1/users/signin",
    signOutPath: process.env.NEXT_PUBLIC_SIGN_OUT_PATH ?? "/v1/users/signout",
    signInByGooglePath:
      process.env.NEXT_PUBLIC_SIGN_IN_BY_GOOGLE_PATH ?? "/v1/oauth/google",
    signInByFacebookPath:
      process.env.NEXT_PUBLIC_SIGN_IN_BY_FACEBOOK_PATH ?? "/v1/oauth/facebook",
    emailVerificationPath:
      process.env.NEXT_PUBLIC_EMAIL_VERIFICATION_PATH ??
      "/v1/email-verification",
    getUserPath: process.env.NEXT_PUBLIC_GET_USER_PATH ?? "/v1/users",
    updateUserNamePath:
      process.env.NEXT_PUBLIC_UPDATE_USER_NAME_PATH ?? "/v1/users/update-name",
    sessionStatsPath:
      process.env.NEXT_PUBLIC_SESSION_STATS_PATH ?? "/v1/sessions/stats",
    userStatsPath: process.env.NEXT_PUBLIC_USER_STATS_PATH ?? "/v1/users/stats",
    resetPasswordPath:
      process.env.NEXT_PUBLIC_RESET_PASSWORD_PATH ?? "/v1/users/reset-password",
  },
};
