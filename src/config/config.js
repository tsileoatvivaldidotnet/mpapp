const path = require('path');
const dotenv = require('dotenv');
const Joi = require('joi');

const envVarsSchema = Joi.object()
    .keys({
        PORT: Joi.number().default(3000),
        API_GATEWAY_URL: Joi.string().uri().required()
    }).unknown();

function createConfig(configPath) {
    dotenv.config({path: configPath});

    const { value: envVars, error} = envVarsSchema
        .prefs({errors: {label: 'key'}})
        .validate(process.env)

    if (error) {
        throw new Error(`Config validation error: ${error.message}`);
    }

    return {
        port: envVars.PORT,
        apiGatewayUrl: envVars.API_GATEWAY_URL
    }
}

const config = createConfig(path.join(__dirname, '../../.env'));

module.exports = { createConfig, ...config };
