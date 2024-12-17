/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
      // Ensure the loader excludes files in 'api/templates' from being compiled
      config.module.rules.push({
        test: /api\/templates/,
        loader: 'ignore-loader',
      });
  
      // If you are using TypeScript, make sure to also ignore .ts files
      config.resolve.extensions.push('.ts', '.tsx'); // Ensuring TypeScript extensions are resolved correctly
  
      return config;
    },
  };
  
  export default nextConfig;
