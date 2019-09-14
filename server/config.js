require("dotenv").config();

const joi = require("joi");

const envVarsSchema = joi
  .object({
    PORT: joi
    .number()
    .min(99)
    .max(99999)
    .required(),
    NODE_ENV: joi
      .string()
      .allow(["development", "production", "test"])
      .default("production"),
LOG_LEVEL: joi
      .string()
      .allow(["test", "error", "warn", "info", "verbose", "debug", "silly"])
      .when("NODE_ENV", {
        is: "development",
        then: joi.default("silly")
      })
      .when("NODE_ENV", {
        is: "production",
        then: joi.default("info")
      })
      .when("NODE_ENV", {
        is: "test",
        then: joi.default("warn")
      })
  })
  .unknown()
  .required();

const envVars = joi.attempt(process.env, envVarsSchema);

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  logger: {
    level: envVars.LOG_LEVEL
  }
};

module.exports = config;
