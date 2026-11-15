export const formatToDuration = (string) => {
  const regex = /^P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
  let numerics = string.match(regex);

  if (!numerics) return "";
  numerics = numerics.slice(1);
  if (numerics.every((num) => !num)) return "";

  const hasHours = Boolean(numerics[0] || numerics[1]);

  numerics = numerics.map((num) => num ?? "0");
  if (hasHours) {
    numerics.splice(0, 2, `${Number(numerics[1]) + Number(numerics[0]) * 24}`);
    numerics[1] = numerics[1].padStart(2, "0");
    numerics[2] = numerics[2].padStart(2, "0");
  } else {
    numerics.splice(0, 2);
    numerics[1] = numerics[1].padStart(2, "0");
  }
  return numerics.join(":");
};

export const formatToViewsSummary = (number) => {
  if (number === 0) return "0";

  const format = (m, l) => {
    const formatted = `${Math.trunc((number / m) * 10) / 10}`.concat(l);
    return formatted.endsWith(".0") ? formatted.slice(0, -2) : formatted;
  };
  if (number >= 1000000000) return format(1000000000, "B");
  if (number >= 1000000) return format(1000000, "M");
  if (number >= 1000) return format(1000, "K");

  return number.toString();
};

export const formatToTimeAgo = (datetime, variant = "long") => {
  const diff = new Date() - new Date(datetime);
  const inSecs = Math.floor(diff / 1000);
  const inMins = Math.floor(inSecs / 60);
  const inHours = Math.floor(inMins / 60);
  const inDays = Math.floor(inHours / 24);
  const inWeeks = Math.floor(inDays / 7);
  const inMonths = Math.floor(inWeeks / 4);
  const inYears = Math.floor(inMonths / 12);

  if (inYears)
    return `${inYears}${variant === "short" ? "y" : inYears > 1 ? " years" : " year"} ago`;
  if (inMonths)
    return `${inMonths}${variant === "short" ? "mo" : inMonths > 1 ? " months" : " month"} ago`;
  if (inWeeks)
    return `${inWeeks}${variant === "short" ? "w" : inWeeks > 1 ? " weeks" : " week"} ago`;
  if (inDays)
    return `${inDays}${variant === "short" ? "d" : inDays > 1 ? " days" : " day"} ago`;
  if (inHours)
    return `${inHours}${variant === "short" ? "h" : inHours > 1 ? " hours" : " hour"} ago`;
  if (inMins)
    return `${inMins}${variant === "short" ? "min" : inMins > 1 ? " minutes" : " minute"} ago`;
  if (inSecs)
    return `${inSecs}${variant === "short" ? "s" : inSecs > 1 ? " seconds" : " second"} ago`;
};

export const formatToDate = (datetime) => {
  const date = new Date(datetime);
  return date
    .toDateString()
    .replace(/^\w+\s/, "")
    .replace(/\s(?=\w+$)/, ", ");
};

export const formatToDescription = (text) => {
  const regex = /(https?:\/\/[^\s]+)|(#[^\s#]+)|(\d{1,2}(?::\d{1,2})+)/g;
  const chunks = text.split(regex);

  return chunks.map((chunk, i) => {
    if (/^(https?:\/\/[^\s]+)$/.test(chunk)) {
      return (
        <a
          key={i}
          className="text-blue-500 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
          href={chunk}
        >
          {chunk}
        </a>
      );
    }
    if (/^(#[^\s#]+)$/.test(chunk)) {
      const encoded = new URLSearchParams({ q: chunk.slice(1) });
      return (
        <a
          key={i}
          className="text-blue-500 hover:underline"
          href={`/results?${encoded.toString()}`}
        >
          {chunk}
        </a>
      );
    }
    if (/(\d{1,2}(?::\d{1,2})+)/.test(chunk)) {
      return (
        <span key={i} className="text-blue-500 hover:underline">
          {chunk}
        </span>
      );
    }

    return chunk;
  });
};
