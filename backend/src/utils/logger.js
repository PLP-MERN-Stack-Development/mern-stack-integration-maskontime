// Simple logger utility
const logInfo = (message, meta = {}) => {
  console.log(`[INFO] ${new Date().toISOString()} - ${message}`, meta);
};

const logError = (message, error = null, meta = {}) => {
  if (error) {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, {
      error: error.message,
      stack: error.stack,
      ...meta
    });
  } else {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, meta);
  }
};

const logWarn = (message, meta = {}) => {
  console.warn(`[WARN] ${new Date().toISOString()} - ${message}`, meta);
};

const logDebug = (message, meta = {}) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[DEBUG] ${new Date().toISOString()} - ${message}`, meta);
  }
};

module.exports = {
  logInfo,
  logError,
  logWarn,
  logDebug
};
