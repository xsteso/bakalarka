import { format, formatDistance } from "date-fns";
import { cs, enUS, sk } from "date-fns/locale";
import { ExportToCsv } from "export-to-csv";
import i18n from "i18next";
import { EmailWithStatistics, GameRunWithStatistics, PlayerAnswer } from "../api/models";
import { AvailableLocale } from "../i18n/i18n";

export const locales = {
  [AvailableLocale.EN]: enUS,
  [AvailableLocale.SK]: sk,
  [AvailableLocale.CZ]: cs,
};

export const fullDateFormat = "dd-MM-yyyy HH:mm:ss";

export const getLocale = () => locales[i18n.language];

export const getDate = (date: Date) => format(date, "dd.MM.yyyy");

export const getSuccessRate = (
  statistics: Array<PlayerAnswer>,
  totalEmails: number
): number => {
  const correct = statistics?.filter((stat) => !!stat.correctness).length;
  const percentage = (correct / totalEmails) * 100;
  return !isNaN(percentage) && Math.round(percentage * 100) / 100;
};

export const getEllapsedTime = (
  date1: Date,
  date2: Date,
  addSuffix = true,
  includeSeconds = false
) => {
  if (isNaN(date1?.getTime()) || isNaN(date2?.getTime())) {
    return "-";
  }
  return formatDistance(date2, date1, {
    addSuffix,
    includeSeconds,
    locale: getLocale(),
  });
};

export const delay = (milliseconds) =>
  new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });

export const exportGameruns = (gameruns: Array<GameRunWithStatistics>) => {
  const dataToExport = gameruns.map((gamerun) => ({
    id: gamerun.id,
    player_name: gamerun.player_name,
    player_age: gamerun.player_age,
    player_gender: gamerun.player_gender,
    emails: JSON.stringify(gamerun.emails),
    start_time: gamerun.start_time,
    end_time: gamerun.end_time,
    statistics: JSON.stringify(gamerun.statistics),
  }));

  const now = new Date();
  const filenameDate = format(now, "dd-MM-yyyy_kk-mm-ss", {
    locale: getLocale(),
  });
  const titleDate = format(now, "dd.MM.yyyy kk:mm:ss", {
    locale: getLocale(),
  });

  const options = {
    fieldSeparator: ",",
    quoteStrings: "\"",
    decimalSeparator: ".",
    showLabels: true,
    showTitle: true,
    useTextFile: false,
    filename: `gameruns_report_${filenameDate}`,
    title: `Gameruns report - ${titleDate}`,
    useBom: true,
    useKeysAsHeaders: true,
  };

  const csvExporter = new ExportToCsv(options);
  csvExporter.generateCsv(dataToExport);
}

export const exportEmails= (emails: Array<EmailWithStatistics>) => {
  const dataToExport = emails.map((email) => ({
    id: email.id,
    occurrence: email.occurrence,
    average_duration: email.average_duration,
    average_correctness: email.average_correctness,
    subject: email.subject,
    sender: email.sender,
    reply_to: email.reply_to,
    recipient: email.recipient,
    date: email.date,
    cc: email.cc,
    body: email.body,
    type: email.type,
    sign: email.sign,
  }));

  const now = new Date();
  const filenameDate = format(now, "dd-MM-yyyy_kk-mm-ss", {
    locale: getLocale(),
  });
  const titleDate = format(now, "dd.MM.yyyy kk:mm:ss", {
    locale: getLocale(),
  });

  const options = {
    fieldSeparator: ",",
    quoteStrings: '"',
    decimalSeparator: ".",
    showLabels: true,
    showTitle: true,
    useTextFile: false,
    filename: `emails_report_${filenameDate}`,
    title: `Emails report - ${titleDate}`,
    useBom: true,
    useKeysAsHeaders: true,
  };

  const csvExporter = new ExportToCsv(options);
  csvExporter.generateCsv(dataToExport);
};