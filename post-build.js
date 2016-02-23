var Feed, sm, MarkdownIt, filter, frontmatter, fs, generateRssFeed, generateSitemap, md, moment, sortBy;

Feed = require('feed');
sm = require('sitemap');
filter = require('lodash/filter');
sortBy = require('lodash/sortBy');
moment = require('moment');
MarkdownIt = require('markdown-it');
fs = require('fs');
frontmatter = require('front-matter');

md = MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
});

module.exports = function(pages, callback) {
  generateRssFeed(pages);
  generateSitemap(pages);
  return callback();
};

generateSitemap = function(pages) {
  var sitemap, i, len, page, ref;
  sitemap = sm.createSitemap({
    hostname: 'http://ashel.xyz/',
    cacheTime: 600000,
    urls: [
      { url: '/' , changefreq: 'weekly', priority: 0.8 }
    ]
  });
  pages = sortBy(pages, function(page) {
    var ref;
    return (ref = page.data) != null ? ref.datePublished : void 0;
  }).reverse();
  ref = filter(pages, function(f) {
    var ref, ref1;
    return (((ref = f.data) != null ? ref.title : void 0) != null) && !((ref1 = f.data) != null ? ref1.draft : void 0);
  }).slice(0, 10);
  for (i = 0, len = ref.length; i < len; i++) {
    page = ref[i];
    sitemap.add({
      url: page.path,
      priority: 0.7
    });
  }

  return fs.writeFileSync(__dirname + "/public/sitemap.xml", sitemap.toString());
};

generateRssFeed = function(pages) {
  var feed, i, len, page, ref;
  feed = new Feed({
    title: 'Blog by A. Shelepenok',
    description: 'A blog by Alexander Shelepenok',
    link: 'http://ashel.xyz/',
    copyright: 'All rights reserved 2016, Alexander Shelepenok',
    author: {
      name: 'Alexander Shelepenok',
      email: 'alisin560@gmail.com'
    }
  });
  pages = sortBy(pages, function(page) {
    var ref;
    return (ref = page.data) != null ? ref.datePublished : void 0;
  }).reverse();
  ref = filter(pages, function(f) {
    var ref, ref1;
    return (((ref = f.data) != null ? ref.title : void 0) != null) && !((ref1 = f.data) != null ? ref1.draft : void 0);
  }).slice(0, 10);
  for (i = 0, len = ref.length; i < len; i++) {
    page = ref[i];
    feed.addItem({
      title: page.data.title,
      link: "http://ashel.xyz" + page.path,
      date: moment(page.data.datePublished).toDate(),
      content: page.data.description,
      author: [
        {
          name: "Alexander Shelepenok",
          email: "alisin560@gmail.com",
          link: "http://ashel.xyz"
        }
      ]
    });
  }
  feed.addContributor({
    name: "Alexander Shelepenok",
    email: "alisin560@gmail.com",
    link: "http://ashel.xyz"
  });
  return fs.writeFileSync(__dirname + "/public/feed.xml", feed.render('rss-2.0'));
};