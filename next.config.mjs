let userConfig = undefined;
try {
  userConfig = await import("./next.config");
} catch (e) {
  // ignore error
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  output: "export",
  webpack: (config, { dev, isServer }) => {
    // Disable persistent caching
    config.cache = false;

    if (!dev && !isServer) {
      // Optimize for size
      config.optimization = {
        ...config.optimization,
        minimize: true,
        sideEffects: true,
        // Disable webpack cache
        runtimeChunk: false,
        splitChunks: {
          chunks: "all",
          maxInitialRequests: Infinity,
          minSize: 0,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                // Get the package name
                const packageName = module.context.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                )[1];
                // Return a name that won't exceed length limits
                return `npm.${packageName.replace("@", "")}`;
              },
              maxSize: 20000000, // 20MB max chunk size
            },
          },
        },
      };
    }

    return config;
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
};

mergeConfig(nextConfig, userConfig);

function mergeConfig(nextConfig, userConfig) {
  if (!userConfig) {
    return;
  }

  for (const key in userConfig) {
    if (
      typeof nextConfig[key] === "object" &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...userConfig[key],
      };
    } else {
      nextConfig[key] = userConfig[key];
    }
  }
}

export default nextConfig;
