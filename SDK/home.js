(function(root) {
  // var doc = root.document;
  var doc = root ? document : root.document;
  console.log("doc", doc);
  var Home = function() {
    var homeHTML =
      '<div class="main">' +
      '<div class="title"></div>' +
      '<div class="list">' +
      "</div>" +
      "</div>";

    appendHTML(homeHTML);

    function appendHTML(html) {
      var parent = document.querySelector(".tips");
      var divTemp = doc.createElement("div"),
        nodes = null,
        fragment = doc.createDocumentFragment();
      divTemp.innerHTML = html;
      nodes = divTemp.childNodes;
      for (var i = 0, len = nodes.length; i < len; i += 1) {
        fragment.appendChild(nodes[i].cloneNode(true));
      }
      parent.appendChild(fragment);
      nodes = null;
      fragment = null;
    }

    this.$node = doc.querySelector(".main");
    this.$title = this.$node.querySelector(".title");
    this.$content = this.$node.querySelector(".list");
    this.$footer = this.$node.querySelector(".footer");
  };

  Home.prototype.show = function(options) {
    let imgCDN = options.imgCDN;
    let metas = options.res.data.metas;
    let coverImage = [];
    metas.forEach(item => {
      if (item.key === "coverImage") {
        try {
          coverImage = JSON.parse(item.value);
        } catch (e) {
          // 解析失败
        }
      }
    });
    try {
      let actualName = coverImage[0].actualName;
      var div = document.querySelector(".tips");
      div.style.backgroundImage = `url(${imgCDN}${actualName})`;
    } catch (e) {
      console.log("没有配置背景图片");
    }
    var title = (options && options.res.data.title) || "活动标题";

    this.$title.innerHTML = title;
    console.log(this.$node, "组件");
  };

  root.home = new Home();
})(this);
