const SENSITIVE = /email|phone|firstName|lastName|name/i;

export function redactValue(key: string, value: unknown): unknown {
  if (SENSITIVE.test(key) && typeof value === "string" && value.length > 0) {
    return "[redacted]";
  }
  return value;
}

export function redactRecord(
  input: Record<string, unknown>,
): Record<string, unknown> {
  const output: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(input)) {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      output[key] = redactRecord(value as Record<string, unknown>);
    } else {
      output[key] = redactValue(key, value);
    }
  }
  return output;
}

export const logger = {
  info(message: string, context?: Record<string, unknown>) {
    if (context) {
      console.info(message, redactRecord(context));
      return;
    }
    console.info(message);
  },
  warn(message: string, context?: Record<string, unknown>) {
    if (context) {
      console.warn(message, redactRecord(context));
      return;
    }
    console.warn(message);
  },
  error(message: string, context?: Record<string, unknown>) {
    if (context) {
      console.error(message, redactRecord(context));
      return;
    }
    console.error(message);
  },
};
