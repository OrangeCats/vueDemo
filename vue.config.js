module.exports = {
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "前端测试";
      return args;
    });
  },
  configureWebpack: {
    externals: {
      AMap: "AMap",
    },
  },
};
