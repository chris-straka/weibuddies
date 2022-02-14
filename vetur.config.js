/** @type {import('vls').VeturConfig} */
module.exports = {
  settings: {
    "vetur.useWorkspaceDependencies": true,
    "vetur.experimental.templateInterpolationService": true
  },
  projects: [
    "./app/client",
    {
      root: './app/client',
      package: './package.json',
      tsconfig: './tsconfig.json',
      globalComponents: [
        './src/components/**/*.vue'
      ]
    }
  ]
}