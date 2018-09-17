/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/404/index.html","231e8248956bdb42c2be8cf72f6abe79"],["/Chapter-1/index.html","9accf228b45f7428d437abb216247925"],["/about/index.html","075da5c6e08e988f4466215f3818ff15"],["/assets/css/main.css","533a935e31418fedf0d0f03d2e1eb398"],["/assets/img/favicon.jpg","ffb9f5c8afdda7fa4f3fd697e5147182"],["/assets/img/icons/android-chrome-192x192.png","4df4c8779d47bcaa69516050281773b9"],["/assets/img/icons/android-chrome-256x256.png","939ec88a61f407945a27d867fca1651d"],["/assets/img/icons/apple-touch-icon.png","366666899d15cf8f6811cc73ee0d63de"],["/assets/img/icons/favicon-16x16.png","f625044491b20a5df78571ba266cbcf6"],["/assets/img/icons/favicon-32x32.png","67502381e45848a4ab76123364675ffe"],["/assets/img/icons/icon-github.svg","4e06335104a29f91e08d4ef420da7679"],["/assets/img/icons/icon-instagram.svg","1e1119e2628235ee4c8771bff15eb2ca"],["/assets/img/icons/icon-twitter.svg","30551913d5399d6520e8a74b6f1e23f0"],["/assets/img/icons/mstile-150x150.png","1cea2ceb806d1a018330a51a1d8b73b6"],["/assets/img/icons/safari-pinned-tab.svg","398ef6b25c0f7f3f6e54c112a8facc5f"],["/assets/img/posts/B3C-sans-logos.jpg","d4d7cf48251d857f2c6fca126d79e198"],["/assets/img/posts/B3C-sans-logos_lg.jpg","d4d7cf48251d857f2c6fca126d79e198"],["/assets/img/posts/B3C-sans-logos_md.jpg","d4d7cf48251d857f2c6fca126d79e198"],["/assets/img/posts/B3C-sans-logos_placehold.jpg","bd8a1de043805afccc4dff30f44791ea"],["/assets/img/posts/B3C-sans-logos_sm.jpg","11a4a1399929bbb26c0faf8839c75b96"],["/assets/img/posts/B3C-sans-logos_thumb.jpg","048622afb4acc4975fb5b9b0a242d3a3"],["/assets/img/posts/B3C-sans-logos_thumb@2x.jpg","d4d7cf48251d857f2c6fca126d79e198"],["/assets/img/posts/B3C-sans-logos_xs.jpg","c97db14f99e1efb152e77b6dce5c7c93"],["/assets/img/posts/BJDTest3.jpg","97b56663515a3aacf54f20ed5135698f"],["/assets/img/posts/BJDTest3_lg.jpg","97b56663515a3aacf54f20ed5135698f"],["/assets/img/posts/BJDTest3_md.jpg","6740328a6d184641d7941c9e329d2441"],["/assets/img/posts/BJDTest3_placehold.jpg","91db7e01e1eec36a8fb5cc529485ced0"],["/assets/img/posts/BJDTest3_sm.jpg","ec923896e2316d2ac85b902991ef9a9d"],["/assets/img/posts/BJDTest3_thumb.jpg","110b18cbbac9624151e3795e994f394d"],["/assets/img/posts/BJDTest3_thumb@2x.jpg","3c8db184edee376f425ccc5946dd13a0"],["/assets/img/posts/BJDTest3_xs.jpg","9af1b5e8112e71ca0d18938bd210278b"],["/assets/img/posts/BJDTest4.jpg","15141d5eac0da55ab6ac59f39fbae0c3"],["/assets/img/posts/BJDTest4_lg.jpg","15141d5eac0da55ab6ac59f39fbae0c3"],["/assets/img/posts/BJDTest4_md.jpg","2025462c9a0a8fa45a7ee29a5f91fe29"],["/assets/img/posts/BJDTest4_placehold.jpg","229057cef545107823599bba37989e83"],["/assets/img/posts/BJDTest4_sm.jpg","66b754bda0c816db424a18041b5809cd"],["/assets/img/posts/BJDTest4_thumb.jpg","1fa6509e02f92239d47b3730a1abf582"],["/assets/img/posts/BJDTest4_thumb@2x.jpg","15141d5eac0da55ab6ac59f39fbae0c3"],["/assets/img/posts/BJDTest4_xs.jpg","eaa2ce090efb7b2040b8e3126f4a98c8"],["/assets/img/posts/BJDtest1.jpg","df95603dc96be0cbd3d6f73123fe6433"],["/assets/img/posts/BJDtest1_lg.jpg","df95603dc96be0cbd3d6f73123fe6433"],["/assets/img/posts/BJDtest1_md.jpg","e5d529195aac38e2ce0836419a99481a"],["/assets/img/posts/BJDtest1_placehold.jpg","d78e4870ab008d43aa1ec44ff827d794"],["/assets/img/posts/BJDtest1_sm.jpg","1c4acb1f92d80fe2b2654eb955af251e"],["/assets/img/posts/BJDtest1_thumb.jpg","e5361799c91dc23a5b0c65b1618460e2"],["/assets/img/posts/BJDtest1_thumb@2x.jpg","c1a13b6a55468d641deeaf171d4f30d7"],["/assets/img/posts/BJDtest1_xs.jpg","35a4fe10a0cf520b571ebef743bc9c7a"],["/assets/img/posts/beer.jpg","4096a23308f51f040023ad2e3cea8676"],["/assets/img/posts/beer_lg.jpg","108d8e9152bc198304c1d7545fbb6aa6"],["/assets/img/posts/beer_md.jpg","dbeb0ae5e175c76a47315acdf22f422b"],["/assets/img/posts/beer_placehold.jpg","e06be22c4175c88c3271b2b5776a2b33"],["/assets/img/posts/beer_sm.jpg","f10b1d94385d00c0d25ac95ea0338fa6"],["/assets/img/posts/beer_thumb.jpg","ff7ad5afcbf3ff8f94d2fe227947d483"],["/assets/img/posts/beer_thumb@2x.jpg","9158aff66ff969b44830716f1b46a358"],["/assets/img/posts/beer_xs.jpg","1008f1f843256a6ef43f045cceebedd0"],["/assets/img/posts/book.jpg","9b90245e0b0d47ec9ade13d7ea27172d"],["/assets/img/posts/book_lg.jpg","3a65df3b58a1b9989bbda72df5b2a852"],["/assets/img/posts/book_md.jpg","e122facb34e3eaf82ce581880f8450e2"],["/assets/img/posts/book_placehold.jpg","357de3c05353caadcc8ef7e4279c88af"],["/assets/img/posts/book_sm.jpg","be8be4c308bde7e4adaabbac91dea5f8"],["/assets/img/posts/book_thumb.jpg","0292618a4ceb89ed2aae0235d609e434"],["/assets/img/posts/book_thumb@2x.jpg","0ebaeaf2d2282591685e11678d5efa16"],["/assets/img/posts/book_xs.jpg","12bf5d56d07d04b6457913d405b9603a"],["/assets/img/posts/cocktail.jpg","2dd4b3b8269c37ec5a5d5b6b18b2a193"],["/assets/img/posts/cocktail_lg.jpg","e3fea64fce0ea00c6192d2c1afb24a49"],["/assets/img/posts/cocktail_md.jpg","a52ba22d457e7dfd2d4679b23e965b0f"],["/assets/img/posts/cocktail_placehold.jpg","244681e063096f2105a18386531adf3b"],["/assets/img/posts/cocktail_sm.jpg","79317e76c396413dc925b3333e78b3af"],["/assets/img/posts/cocktail_thumb.jpg","b217cf046b52fd156fc193de940b113a"],["/assets/img/posts/cocktail_thumb@2x.jpg","e0e5ab766cc0e1c150bc4e3a03f2adc7"],["/assets/img/posts/cocktail_xs.jpg","00fcdfaba7009018daf132404e2d3d91"],["/assets/img/posts/read.jpg","d0963d03b390688c415769726ed4516b"],["/assets/img/posts/read_lg.jpg","d8cfa68f5619cbfa25957b8fe0593f3b"],["/assets/img/posts/read_md.jpg","1f59e2f1b2666ac4128239d69d8c9d3b"],["/assets/img/posts/read_placehold.jpg","6b79e56049b81a9d63bc8e27dd65280d"],["/assets/img/posts/read_sm.jpg","5b11e310d33044a9d486ac7d5720c0a6"],["/assets/img/posts/read_thumb.jpg","450d582e446195375ff97dc5ad7133f4"],["/assets/img/posts/read_thumb@2x.jpg","203043f3140223b16c883557e6aab733"],["/assets/img/posts/read_xs.jpg","a27e18488c867d6e8e2f152c67a13574"],["/assets/img/posts/wine.jpg","9a3b2152e89653f093dac8cb42a63abe"],["/assets/img/posts/wine_lg.jpg","f3efd4fff3e92b0f8833d0fac11a7483"],["/assets/img/posts/wine_md.jpg","668be71d335d6e0559fed4ad0bcbc7ca"],["/assets/img/posts/wine_placehold.jpg","7e9adca9abde952b1c156b40919510b9"],["/assets/img/posts/wine_sm.jpg","f7f6d7aab64b2ae276bc45d8f26bcdb3"],["/assets/img/posts/wine_thumb.jpg","1ec9e657400310240a2604d48583b62f"],["/assets/img/posts/wine_thumb@2x.jpg","44c88a292ddf53da1f152d267da67e4d"],["/assets/img/posts/wine_xs.jpg","19e28b2464089a3540cdcef2459586dc"],["/assets/js/bundle.js","e9d0ecd41a08efbea28a2bb02bde763e"],["/assets/source_image/read.jpg","8595f432053fd2fe4ba76c8d81300275"],["/categories/index.html","3cb4afb8c88dd1c5c07729cb2db11e98"],["/contact/index.html","b11af38010ec2972953fae5e6d22275b"],["/index.html","02096543d9d3b7f821cf3fc317d4267b"],["/sw.js","b0291b8a1873f2d4a280b02371779c33"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







