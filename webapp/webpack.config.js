const path = require('path');

module.exports = {
  // Your existing webpack configuration settings...
  // Add or merge the following resolve section to your webpack configuration:
  resolve: {
    fallback: {
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "util": require.resolve("util/"),
      "zlib": require.resolve("browserify-zlib"),
      "stream": require.resolve("stream-browserify"),
      "assert": require.resolve("assert/"),
      "url": require.resolve("url/")
    }
  }
};
