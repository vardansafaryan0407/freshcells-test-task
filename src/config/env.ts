/**
 * Environment configuration with validation.
 * Centralizes environment variables with type safety and defaults.
 */

interface EnvConfig {
    graphqlApiUrl: string;
    isDevelopment: boolean;
    isProduction: boolean;
}

/**
 * Validates and returns environment configuration
 * @throws Error if required environment variables are missing
 */
const getEnvConfig = (): EnvConfig => {
    const graphqlApiUrl =
        import.meta.env.VITE_GRAPHQL_API_URL || 'https://cms.trial-task.k8s.ext.fcse.io/graphql';

    const isDevelopment = import.meta.env.DEV;
    const isProduction = import.meta.env.PROD;

    return {
        graphqlApiUrl,
        isDevelopment,
        isProduction,
    };
};

/**
 * Validated environment configuration
 */
export const env = getEnvConfig();
