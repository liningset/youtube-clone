export const toDuration = (string) => {
  let result = [];
  [/\d+(?=D)/, /\d+(?=H)/, /\d+(?=M)/, /\d+(?=S)/].forEach((regex, i) => {
    const matched = string.match(regex);
    if (!matched) return;
    result.push(
      i > 0 && result.length > 0 ? matched[0].padStart(2, "0") : matched[0],
    );
  });

  return result.length === 1 ? "0:" + result.join(":") : result.join(":");
};

export const toViews = (number) => {
  const format = (m, l) => (number / m).toFixed(1).concat(l);
  if (number > 1000000000)
    return format(1000000000, "B").replace(/(?<=\d+)\.0(?=[KMB])/, "");
  if (number > 1000000)
    return format(1000000, "M").replace(/(?<=\d+)\.0(?=[KMB])/, "");
  if (number > 1000)
    return format(1000, "K").replace(/(?<=\d+)\.0(?=[KMB])/, "");

  return number.toString();
};

export const toPublishedDate = (datetime) => {
  const diff = new Date() - new Date(datetime);
  const inSecs = Math.floor(diff / 1000);
  const inMins = Math.floor(inSecs / 60);
  const inHours = Math.floor(inMins / 60);
  const inDays = Math.floor(inHours / 24);
  const inWeeks = Math.floor(inDays / 7);
  const inMonths = Math.floor(inWeeks / 4);
  const inYears = Math.floor(inMonths / 12);

  if (inYears) return `${inYears}y ago`;
  if (inMonths) return `${inMonths}mo ago`;
  if (inWeeks) return `${inWeeks}w ago`;
  if (inDays) return `${inDays}d ago`;
  if (inHours) return `${inHours}h ago`;
  if (inMins) return `${inMins}mins ago`;
  if (inSecs) return `${inSecs}s ago`;
};
