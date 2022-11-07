module.exports = {
  siteUrl: 'https://drivingteacher.co.kr',
  generateRobotsTxt: true,
  exclude: ['/server-sitemap.xml'], // <= exclude here
  robotsTxtOptions: {
    additionalSitemaps: ['https://drivingteacher.co.kr/server-sitemap.xml'],
  },
};
