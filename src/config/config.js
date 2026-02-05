const dotenv = require('dotenv');
const Joi = require('joi');

const envVarsSchema = Joi.object()
    .keys({
        PORT: Joi.number().default(3000)
    }).unknown();

function createConfig(configPath) {
    const theenv = dotenv.config({path: configPath});

    const { value: envVars, error} = envVarsSchema
        .prefs({errors: {label: 'key'}})
        .validate(process.env)

    if (error) {
        throw new Error(`Config validation error: ${error.message}`);
    }

    return {
        port: envVars.PORT
    }
}

module.exports = { createConfig, };