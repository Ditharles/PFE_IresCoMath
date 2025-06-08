import pino from "pino";
import fs from "fs";
import path from "path";
import pinoPretty from "pino-pretty";

// Configuration du dossier de logs
const logDirectory = path.join(process.cwd(), "logs");
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

// Fichier de log journalier unique
const getLogFilePath = () => {
  const date = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  return path.join(logDirectory, `app-${date}.log`);
};

// Filtrage des données sensibles
const sensitiveFields = ['password', 'token', 'authorization', 'creditCard'];
const redactSensitiveData = (obj: Record<string, any>) => {
  if (!obj || typeof obj !== 'object') return obj;
  
  const safeData = { ...obj };
  for (const key of Object.keys(safeData)) {
    if (sensitiveFields.includes(key.toLowerCase())) {
      safeData[key] = '*****';
    } else if (typeof safeData[key] === 'object') {
      safeData[key] = redactSensitiveData(safeData[key]);
    }
  }
  return safeData;
};

// Configuration des streams de sortie
const streams = [
  { 
    stream: fs.createWriteStream(getLogFilePath(), { flags: "a" }),
    level: "debug"
  },
  {
    stream: pinoPretty({
      colorize: true,
      translateTime: "SYS:dd-mm-yyyy HH:MM:ss",
      ignore: "pid,hostname",
      messageFormat: (log, messageKey, levelLabel) => {
        const emojiMap: Record<string, string> = {
          trace: "🔍 [TRACE]",
          debug: "🐞 [DEBUG]",
          info: "ℹ️ [INFO]",
          warn: "⚠️ [WARN]",
          error: "❌ [ERROR]",
          fatal: "💀 [FATAL]",
        };
        const level = typeof log.levelLabel === 'string' ? log.levelLabel.toLowerCase() : 'info';
        const emoji = emojiMap[level] || "ℹ️ [INFO]";
        const context = log.context ? ` (${log.context})` : "";
        return `${emoji}${context}: ${log[messageKey]}`;
      },
    }),
    level: "info"
  },
];

// Création du logger avec contexte
const logger = pino(
  {
    level: process.env.NODE_ENV === "development" ? "debug" : "info",
    formatters: {
      level(label) {
        return { levelLabel: label };
      },
      bindings() {
        return { context: "app" };
      },
    },
    timestamp: () => `,"time":"${new Date().toISOString()}"`,
    serializers: {
      req: redactSensitiveData,
      res: redactSensitiveData,
      err: pino.stdSerializers.err,
    },
  },
  pino.multistream(streams)
);

// Nettoyage des vieux logs (optionnel)
const cleanOldLogs = (maxDays = 7) => {
  try {
    const files = fs.readdirSync(logDirectory);
    const now = Date.now();
    const cutoff = now - maxDays * 24 * 60 * 60 * 1000;

    files.forEach(file => {
      if (file.startsWith('app-') && file.endsWith('.log')) {
        const filePath = path.join(logDirectory, file);
        const stat = fs.statSync(filePath);
        if (stat.mtimeMs < cutoff) {
          fs.unlinkSync(filePath);
          logger.info(`Deleted old log file: ${file}`);
        }
      }
    });
  } catch (error) {
    logger.error({ error }, "Failed to clean old logs");
  }
};

// Exécuter le nettoyage au démarrage (optionnel)
if (process.env.NODE_ENV === "production") {
  cleanOldLogs();
}

// Export du logger amélioré
export default logger;