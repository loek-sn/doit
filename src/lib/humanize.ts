const ONE_SECOND = 1000;
const ONE_MINUTE = 60 * ONE_SECOND;
const ONE_HOUR = 60 * ONE_MINUTE;
const ONE_DAY = 24 * ONE_HOUR;
const ONE_MONTH = 30 * ONE_DAY; // Approximation
const ONE_YEAR = 365 * ONE_DAY; // Approximation

export function humanize(target: Date, reference: Date = new Date()): string {
  const diffMs = target.getTime() - reference.getTime();

  if (diffMs === 0) {
    return "now";
  }

  const absDiff = Math.abs(diffMs);
  const isFuture = diffMs > 0;
  let value: number;
  let unit: string;

  if (absDiff < 45 * ONE_SECOND) {
    value = Math.round(absDiff / ONE_SECOND);
    unit = "second";
  } else if (absDiff < 45 * ONE_MINUTE) {
    value = Math.round(absDiff / ONE_MINUTE);
    unit = "minute";
  } else if (absDiff < 22 * ONE_HOUR) {
    value = Math.round(absDiff / ONE_HOUR);
    unit = "hour";
  } else if (absDiff < 26 * ONE_DAY) {
    value = Math.round(absDiff / ONE_DAY);
    unit = "day";
  } else if (absDiff < 11 * ONE_MONTH) {
    value = Math.round(absDiff / ONE_MONTH);
    unit = "month";
  } else {
    value = Math.round(absDiff / ONE_YEAR);
    unit = "year";
  }

  const plural = value > 1 ? "s" : "";
  const suffix = isFuture ? "from now" : "ago";
  return `${value} ${unit}${plural} ${suffix}`;
}
