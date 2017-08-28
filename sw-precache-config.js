module.exports = {
  staticFileGlobs: [
    'dist/**.html',
    'dist/**.js',
    'dist/**.css',
    'dist/assets/icons/*',
    'dist/assets/images/no_poster_available.jpg',
    'dist/assets/scss/*'
  ],
  root: 'dist',
  stripPrefix: 'dist/',
  navigateFallback: '/index.html',
  navigateFallbackWhitelist: [/^(?!\/__)/]
};