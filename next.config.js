module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/callapi',
        destination: 'http://8e2b-103-109-40-10.ngrok.io/predict',
      },
    ]
  },
}
