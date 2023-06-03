module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/descriptiongenerator',
        permanent: true,
      },
    ]
  },
}
