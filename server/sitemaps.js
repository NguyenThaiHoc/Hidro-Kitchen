sitemaps.add('/sitemap.xml', function() {
  // required: page
  // optional: lastmod, changefreq, priority, xhtmlLinks, images, videos
  return [
    { page: '/home_private', lastmod: new Date() },
    { page: '/quanlymenu', lastmod: new Date(), changefreq: 'monthly' },
    { page: '/themmonan', lastmod: new Date().getTime(), changefreq: 'monthly', priority: 0.8 },
    // https://support.google.com/webmasters/answer/178636?hl=en
    { page: '/taotaikhoan',
      images: [
        { loc: '/usersetting', },        // Only loc is required
        { loc: '/change_password',      // Below properties are optional
          caption: "..", geo_location: "..", title: "..", license: ".."}
      ],
      videos: [
        { loc: '/m', },      // Only loc is required
        { loc: '/my',    // Below properties are optional
          thumbnail_loc: "..", title: "..", description: "..", etc: '..' }
      ]
    },
    // https://support.google.com/webmasters/answer/2620865?hl=en
    { page: 'themmonan', xhtmlLinks: [
      { rel: 'suamonan', hreflang: 'de', href: '/lang/deutsch' },
      { rel: 'xoamonan', hreflang: 'de-ch', href: '/lang/schweiz-deutsch' },
      { rel: 'taomoimonan', hreflang: 'en', href: '/lang/english' }
    ]}
  ];
});

  sitemaps.add('/sitemapDB.xml', function() {
    var out = [], pages = Pages.find().fetch();
    _.each(pages, function(page) {
      out.push({
        page: page.page,
        lastmod: page.lastmod
      });
    });
    return out;
  });

