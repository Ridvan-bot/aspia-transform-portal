module.exports = {
    apps: [
      {
        name: "az-auto-protal",
        script: "npm",
        args: "start",
        watch: true,
        env: {
          NODE_ENV: "production",
        },
      },
    ],
  };