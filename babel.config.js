module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin",
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            "@assets": "./src/assets",
            "@components": "./src/components",
            "@routes": "./src/routes",
            "@screens": "./src/screens",
            "@storage": "./src/storage",
            "@theme": "./src/theme",
            "@utils": "./src/utils",
            "@hooks": "./src/hooks",
            "@interfaces": "./src/interfaces",
            "@fakes": "./src/fakes",
            "@services": "./src/services",
            "@constants": "./src/constants",
            "@manager": "./src/manager",
            "@typings": "./src/typings",
          },
        },
      ],
    ],
  };
};
