const dotenv = require('dotenv');
const Joi = require('joi');

const envVarsSchema = Joi.object()
    .keys({
        PORT: Joi.number().default(3000),
        MONGODB_URL: Joi.string().required().description('Mongo DB url'),
        MONGODB_USERNAME: Joi.string().required().description('Monogo DB username'),
        MONGODB_PASSWORD: Joi.string().required().description('Mongo DB password')
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
        port: envVars.PORT,
        mongo: {
            url: envVars.MONGODB_URL,
            username: envVars.MONGODB_USERNAME,
            password: envVars.MONGODB_PASSWORD
        }
    }
}

module.exports = { createConfig, };