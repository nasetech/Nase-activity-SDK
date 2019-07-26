;(function(root) {
  var doc = root.document;

  var Toast = function() {
    var toastDOMList = doc.body.querySelectorAll('.toast');
    var toastHTML = '<div class="toast hide">' +
        '<div class="mask"></div>' +
        '<div class="content"></div>' +
        '<div class="loading hide"><div class="loading-icon lds-spinner">' +
        '<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>' +
        '</div></div>' +
      '</div>';

    if (!toastDOMList.length) {
      appendHTML(doc.body, toastHTML);
    }

    function appendHTML(box, html) {
      var divTemp = doc.createElement('div'),
          nodes = null,
          fragment = doc.createDocumentFragment();
      divTemp.innerHTML = html;
      nodes = divTemp.childNodes;
      for (var i = 0, len = nodes.length; i < len; i+=1) {
        fragment.appendChild(nodes[i].cloneNode(true));
      }
      box.appendChild(fragment);
      nodes = null;
      fragment = null;
    }

    this.$node = doc.querySelector('.toast');
    this.$content = this.$node.querySelector('.content');
    this.$mask = this.$node.querySelector('.mask');
    this.$loading = this.$node.querySelector('.loading');

    this.$mask.addEventListener('touchstart', function(e) {
      e.preventdefault();
    });
  }

  Toast.prototype.show = function(text, timeout, hasMask) {
    var me = this;
    this.$content.innerText = text;
    this.$node.className = this.$node.className.replace(/hide/g, '');
    if (!hasMask) {
      this.$mask.className = this.$mask.className + ' hide';
    } else {
      if (this.$mask.className && this.$mask.className.indexOf('hide') > -1) {
        this.$mask.className = this.$mask.className.replace(/hide/g, '');
      }
    }

    this.$content.className = this.$content.className.replace(/hide/g, '');

    if (this.time) clearTimeout(this.time);
    this.time = setTimeout(function() {
      me.hide();
    }, timeout ? timeout: 1000);
  }

  Toast.prototype.hide = function() {
    this.$node.className = this.$node.className + ' hide';
  }

  Toast.prototype.showLoading = function(title) {
    this.$content.className = this.$content.className + ' hide';
    this.$node.className = this.$node.className.replace(/hide/g, '');
    
    this.$loading.className = 'loading';
  }

  Toast.prototype.hideLoading = function() {
    this.$loading.className = 'hide';
    this.hide();
  }

  root.toast = new Toast();
})(this);