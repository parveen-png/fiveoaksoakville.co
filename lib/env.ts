function optional(name: string): string | undefined {
  const value = process.env[name];
  if (!value) {
    return undefined;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

export const serverEnv = {
  leadWebhookUrl: optional("LEAD_WEBHOOK_URL"),
  leadWebhookSecret: optional("LEAD_WEBHOOK_SECRET"),
  crmOrWebhookProvider: optional("CRM_OR_WEBHOOK_PROVIDER"),
  leadDestination: optional("LEAD_DESTINATION"),
  emailProviderApiKey: optional("EMAIL_PROVIDER_API_KEY"),
  emailProviderEndpoint:
    optional("EMAIL_PROVIDER_ENDPOINT") ?? "https://api.resend.com/emails",
  internalLeadEmail: optional("INTERNAL_LEAD_EMAIL"),
  fromEmail: optional("FROM_EMAIL"),
  fromName: optional("FROM_NAME"),
  acknowledgementEmailProvider: optional("ACKNOWLEDGEMENT_EMAIL_PROVIDER"),
  googleSearchConsoleVerification: optional(
    "GOOGLE_SEARCH_CONSOLE_VERIFICATION",
  ),
  bingWebmasterVerification: optional("BING_WEBMASTER_VERIFICATION"),
  googleOauthClientId: optional("GOOGLE_OAUTH_CLIENT_ID"),
  googleOauthClientSecret: optional("GOOGLE_OAUTH_CLIENT_SECRET"),
  googleOauthRefreshToken: optional("GOOGLE_OAUTH_REFRESH_TOKEN"),
  googleSheetsSpreadsheetId: optional("GOOGLE_SHEETS_SPREADSHEET_ID"),
  googleSheetsTabName: optional("GOOGLE_SHEETS_TAB_NAME") ?? "Sheet1",
  rateLimitMax: Number.parseInt(process.env.RATE_LIMIT_MAX ?? "8", 10),
  rateLimitWindowMs: Number.parseInt(
    process.env.RATE_LIMIT_WINDOW_MS ?? "900000",
    10,
  ),
  isProduction: process.env.NODE_ENV === "production",
  allowLocalCapture: process.env.ALLOW_LOCAL_LEAD_CAPTURE === "true",
};

export function hasPrimaryLeadDestination(): boolean {
  if (
    serverEnv.googleSheetsSpreadsheetId &&
    serverEnv.googleOauthClientId &&
    serverEnv.googleOauthClientSecret &&
    serverEnv.googleOauthRefreshToken
  ) {
    return true;
  }
  if (serverEnv.leadWebhookUrl) {
    return true;
  }
  if (serverEnv.internalLeadEmail && serverEnv.emailProviderApiKey) {
    return true;
  }
  return !serverEnv.isProduction || serverEnv.allowLocalCapture;
}
