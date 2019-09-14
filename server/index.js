const logger = require("./src/logger.js").getLogger();

logger.debug("index.js - Starting.");

// Initiation
logger.info("index.js - initiating.");
require("./src/init");

// validate configs (using joi)
logger.info("index.js - validating configurations.");
require("./config");

logger.info(
    "index.js - Validation of configurations and env variables succeeded."
);

logger.info("index.js - Requiring server.js to initialize the server.");
require('./src/server')


