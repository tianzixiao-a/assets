

  "use strict";
  var tzx_musicPlaying = !1,
  tzx_musicStretch = !1,
  tzx_musicFirst = !1,
  tzx = {
      scrollTo: function(e) {
          e = document.querySelector(e).offsetTop;
          window.scrollTo(0, e - 80)
      },
      showLoading: function() {
          document.querySelector("#loading-box").classList.remove("loaded")
      },
      hideLoading: function() {
          document.querySelector("#loading-box").classList.add("loaded")
      },
      switchCommentBarrage: function() {
          document.querySelector(".comment-barrage") && ($(".comment-barrage").is(":visible") ? ($(".comment-barrage").hide(), $(".menu-commentBarrage-text").text("显示热评"), btf.snackbarShow("✨ 已关闭评论弹幕"), localStorage.setItem("commentBarrageSwitch", "false")) : $(".comment-barrage").is(":hidden") && ($(".comment-barrage").show(), $(".menu-commentBarrage-text").text("关闭热评"), btf.snackbarShow("✨ 已开启评论弹幕"), localStorage.removeItem("commentBarrageSwitch")))
      },
      initIndexEssay: function() {
          setTimeout(function() {
              var e = new Swiper(".essay_bar_swiper_container", {
                  passiveListeners: !0,
                  direction: "vertical",
                  loop: !0,
                  autoplay: {
                      disableOnInteraction: !0,
                      delay: 3e3
                  },
                  mousewheel: !0
              }),
              t = document.getElementById("bbtalk");
              null !== t && (t.onmouseenter = function() {
                  e.autoplay.stop()
              },
              t.onmouseleave = function() {
                  e.autoplay.start()
              })
          },
          100)
      },
      diffDate: function(e) {
          var t, n, a = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
          i = new Date,
          e = new Date(e),
          i = i.getTime() - e.getTime(),
          o = 864e5;
          return a ? (a = i / o, t = i / 36e5, n = i / 6e4, 1 <= i / 2592e6 ? e.toLocaleDateString().replace(/\//g, "-") : 1 <= a ? parseInt(a) + " " + GLOBAL_CONFIG.date_suffix.day: 1 <= t ? parseInt(t) + " " + GLOBAL_CONFIG.date_suffix.hour: 1 <= n ? parseInt(n) + " " + GLOBAL_CONFIG.date_suffix.min: GLOBAL_CONFIG.date_suffix.just) : parseInt(i / o)
      },
      changeTimeInEssay: function() {
          document.querySelector("#bber") && document.querySelectorAll("#bber time").forEach(function(e) {
              var t = e.getAttribute("datetime");
              e.innerText = tzx.diffDate(t, !0),
              e.style.display = "inline"
          })
      },
      changeTimeInAlbumDetail: function() {
          document.querySelector("#album_detail") && document.querySelectorAll("#album_detail time").forEach(function(e) {
              var t = e.getAttribute("datetime");
              e.innerText = tzx.diffDate(t, !0),
              e.style.display = "inline"
          })
      },
      reflashEssayWaterFall: function() {
          document.querySelector("#waterfall") && setTimeout(function() {
              waterfall("#waterfall"),
              document.getElementById("waterfall").classList.add("show")
          },
          500)
      },
      commentText: function(e) {
          "undefined" != e && "null" != e || (e = "好棒！");
          var t = document.getElementsByClassName("el-textarea__inner")[0],
          n = document.createEvent("HTMLEvents");
          t && (n.initEvent("input", !0, !0), e = replaceAll(e, "\n", "\n> "), t.value = "> " + e + "\n\n", t.dispatchEvent(n), e = document.querySelector("#post-comment").offsetTop, window.scrollTo(0, e - 80), t.focus(), t.setSelectionRange( - 1, -1), document.getElementById("comment-tips") && document.getElementById("comment-tips").classList.add("show"))
      },
      sayhi: function() {
          document.querySelector("#author-info__sayhi") && (document.getElementById("author-info__sayhi").innerHTML = getTimeState() + "！我是")
      },
      addFriendLink: function() {
          var e, t = document.getElementsByClassName("el-textarea__inner")[0];
          t && ((e = document.createEvent("HTMLEvents")).initEvent("input", !0, !0), t.value = "昵称（请勿包含博客等字样）：\n网站地址（要求博客地址，请勿提交个人主页）：\n头像图片url（请提供尽可能清晰的图片，我会上传到我自己的图床）：\n描述：\n站点截图（可选）：\n", t.dispatchEvent(e), t.focus(), t.setSelectionRange( - 1, -1))
      },
      musicToggle: function() {
          tzx_musicFirst || (musicBindEvent(), tzx_musicFirst = !0);
          tzx_musicStretch = tzx_musicPlaying ? (document.querySelector("#nav-music").classList.remove("playing"), document.getElementById("menu-music-toggle").innerHTML = '<i class="fa-solid fa-play"></i><span>播放音乐</span>', document.getElementById("nav-music-hoverTips").innerHTML = "音乐已暂停", tzx_musicPlaying = !1, document.querySelector("#nav-music").classList.remove("stretch"), !1) : (document.querySelector("#nav-music").classList.add("playing"), document.getElementById("menu-music-toggle").innerHTML = '<i class="fa-solid fa-pause"></i><span>暂停音乐</span>', tzx_musicPlaying = !0, document.querySelector("#nav-music").classList.add("stretch"), !0),
          document.querySelector("meting-js").aplayer.toggle()
      },
      musicTelescopic: function() {
          tzx_musicStretch = tzx_musicStretch ? (document.querySelector("#nav-music").classList.remove("stretch"), !1) : (document.querySelector("#nav-music").classList.add("stretch"), !0)
      },
      musicSkipBack: function() {
          document.querySelector("meting-js").aplayer.skipBack()
      },
      musicSkipForward: function() {
          document.querySelector("meting-js").aplayer.skipForward()
      },
      musicGetName: function() {
          for (var e = $(".aplayer-title"), t = [], n = e.length - 1; 0 <= n; n--) t[n] = e[n].innerText;
          return t[0]
      },
      darkModeStatus: function() {
          "light" == ("dark" === document.documentElement.getAttribute("data-theme") ? "dark": "light") ? $(".menu-darkmode-text").text("深色模式") : $(".menu-darkmode-text").text("浅色模式")
      }
  },
  getTimeState = function() {
      var e = (new Date).getHours(),
      t = "";
      return 0 <= e && e <= 5 ? t = "晚安😴": 5 < e && e <= 10 ? t = "早上好👋": 10 < e && e <= 14 ? t = "中午好👋": 14 < e && e <= 18 ? t = "下午好👋": 18 < e && e <= 24 && (t = "晚上好👋"),
      t
  };
  document.addEventListener("pjax:send",
  function() {
      tzx.showLoading
  }),
  document.getElementById("page-name").innerText = document.title.split(" | 天子笑")[0],
  tzx.initIndexEssay(),
  tzx.changeTimeInEssay(),
  tzx.changeTimeInAlbumDetail(),
  tzx.reflashEssayWaterFall(),
  tzx.sayhi(),
  addRightMenuClickEvent();

  "use strict";
function _typeof(t) {
    return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
    function(t) {
        return typeof t
    }: function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol": typeof t
    })(t)
}
function owoBig() {
    var e = 1,
    o = "",
    i = document.createElement("div"),
    l = (i.id = "owo-big", document.querySelector("body"));
    l.appendChild(i),
    document.getElementById("post-comment").addEventListener("DOMNodeInserted",
    function(t) {
        t.target.classList && "OwO-body" == t.target.classList.value && ((t = t.target).addEventListener("contextmenu",
        function(t) {
            return t.preventDefault()
        }), t.addEventListener("mouseover",
        function(c) {
            "IMG" == c.target.tagName && e && (e = 0, o = setTimeout(function() {
                var t = 3 * c.path[0].clientHeight,
                e = 3 * c.path[0].clientWidth,
                o = c.x - c.offsetX - (e - c.path[0].clientWidth) / 2,
                n = (o + e > l.clientWidth && (o -= o + e - l.clientWidth + 10), o < 0 && (o = 10), c.y - c.offsetY);
                i.style.height = t + "px",
                i.style.width = e + "px",
                i.style.left = o + "px",
                i.style.top = n + "px",
                i.style.display = "flex",
                i.innerHTML = '<img src="'.concat(c.target.src, '">')
            },
            300))
        }), t.addEventListener("mouseout",
        function(t) {
            i.style.display = "none",
            e = 1,
            clearTimeout(o)
        }))
    })
}
document.getElementById("post-comment") && owoBig(),
window.onscroll = btf.throttle(percent, 50);
var percentFlag = !1;
function percent() {
    var t = document.documentElement.scrollTop || window.pageYOffset,
    e = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight) - document.documentElement.clientHeight,
    e = Math.round(t / e * 100),
    o = document.querySelector("#percent"),
    t = t % document.documentElement.clientHeight,
    t = (e <= 99 || (e = 99), !percentFlag && 100 + t >= document.documentElement.clientHeight && document.querySelector("#waterfall") ? (console.info(t, document.documentElement.clientHeight), setTimeout(function() {
        waterfall("#waterfall")
    },
    500)) : setTimeout(function() {
        document.querySelector("#waterfall") && waterfall("#waterfall")
    },
    500), window.scrollY + document.documentElement.clientHeight),
    n = document.getElementById("post-comment") || document.getElementById("footer");
    n.offsetTop + n.offsetHeight / 2 < t || 90 < e ? (document.querySelector("#nav-totop").classList.add("long"), o.innerHTML = "返回顶部", percentFlag = !0) : (document.querySelector("#nav-totop").classList.remove("long"), o.innerHTML = e)
}
function ScrollBarElongation() {
    var t = document.documentElement.scrollTop || window.pageYOffset,
    e = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight) - document.documentElement.clientHeight,
    o = t / e,
    n = document.querySelector(".as-indicator");.1 <= o && (n.style.transform = "scale3d(1, ".concat(t / e, ", 1)"))
}
function toRandomPage() {
    btf.snackbarShow("即将跳转到「开往」项目的成员博客，不保证跳转网站的安全性和可用性", !1, 5e3),
    setTimeout(function() {
        window.open("https://travellings.link/")
    },
    "5000")
}
function replaceAll(t, e, o) {
    return t.split(e).join(o)
}
/Mobi|Android|iPhone/i.test(navigator.userAgent) || document.addEventListener("scroll", ScrollBarElongation),
window.onkeydown = function(t) {
    123 === t.keyCode && btf.snackbarShow("开发者模式已打开,请遵循GPL协议", !1)
};
var navFn = {
    switchDarkMode: function() {
        "light" == ("dark" === document.documentElement.getAttribute("data-theme") ? "dark": "light") ? (activateDarkMode(), saveToLocal.set("theme", "dark", 2), void 0 !== GLOBAL_CONFIG.Snackbar && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night, !1, 2e3)) : (activateLightMode(), saveToLocal.set("theme", "light", 2), void 0 !== GLOBAL_CONFIG.Snackbar && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day, !1, 2e3)),
        "function" == typeof utterancesTheme && utterancesTheme(),
        "object" === ("undefined" == typeof FB ? "undefined": _typeof(FB)) && window.loadFBComment(),
        window.DISQUS && document.getElementById("disqus_thread").children.length && setTimeout(function() {
            return window.disqusReset()
        },
        200);
        var t, e = "light" === document.documentElement.getAttribute("data-theme") ? "#363636": "#F7F7FA";
        document.getElementById("posts-chart") && ((t = postsOption).textStyle.color = e, t.title.textStyle.color = e, t.xAxis.axisLine.lineStyle.color = e, t.yAxis.axisLine.lineStyle.color = e, postsChart.setOption(t)),
        document.getElementById("tags-chart") && ((t = tagsOption).textStyle.color = e, t.title.textStyle.color = e, t.xAxis.axisLine.lineStyle.color = e, t.yAxis.axisLine.lineStyle.color = e, tagsChart.setOption(t)),
        document.getElementById("categories-chart") && ((t = categoriesOption).textStyle.color = e, t.title.textStyle.color = e, t.legend.textStyle.color = e, categoriesChart.setOption(t))
    }
};
function musicBindEvent() {
    $("#nav-music .aplayer-music").on("click",
    function(t) {
        tzx.musicTelescopic(),
        t.stopPropagation()
    })
}