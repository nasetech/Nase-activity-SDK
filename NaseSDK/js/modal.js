;(function(root) {
	// var doc = root.document;
	var doc = root ? document : root.document;
	console.log('doc',doc);
	var modal = function() {
	  var box = doc.body.querySelector('.page');
	  var html = '<div class="modal-cpt">' +
		'<div class="modal-cpt_mask"></div>' +
		'<div class="modal-cpt_container">' +
		  '<div class="modal-cpt_main">' +
			'<div class="modal-cpt_title">温馨提示</div>' +
			'<div class="modal-cpt_content">是否确定</div>' +
		  '</div>' +
		  '<div class="modal-cpt_btn__group">' +
			'<div class="modal-cpt_cancel__btn">取消</div>' +
			'<div class="modal-cpt_sure__btn">确定</div>' +
		  '</div>' +
		'</div>' +
	  '</div>';
	  
		appendHTML(doc.body, html);
		function appendHTML(box, html) {
			// var doc = root.document,
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
	  var $modal = document.querySelector('.modal-cpt');
  
	  this.$modal = $modal;
	  this.$title = $modal.querySelector('.modal-cpt_title');
	  this.$content = $modal.querySelector('.modal-cpt_content');
	  this.$cancelBtn = $modal.querySelector('.modal-cpt_cancel__btn');
	  this.$sureBtn = $modal.querySelector('.modal-cpt_sure__btn');
  
	  this.onBtnClick();
	}
	
	modal.prototype.open = function(options) {
	  var title = options && options.title || '温馨提示';
	  var content = options && options.content || '';
	  this.onCancel = options.onCancel || function(){};
	  this.onOk = options.onOk || function(){}; 
  
	  this.$title.innerHTML = title;
	  this.$content.innerHTML = content;
	  console.log(this.$modal, '组件')
	  this.$modal.style.display = 'block';
	}
  
	modal.prototype.close = function() {
	  this.$modal.style.display = 'none';
	}
  
	modal.prototype.cancel = function() {
	  this.close();
	  this.onCancel();
	}
  
	modal.prototype.sure = function() {
	  this.close();
	  this.onOk();
	}
  
	modal.prototype.onBtnClick = function() {
	  var _this = this;
	  this.$cancelBtn.addEventListener('touchstart', function(e) {
		e.preventDefault();
		_this.cancel();
	  });
	  this.$sureBtn.addEventListener('touchstart', function(e) {
		e.preventDefault();
		_this.sure();
	  });
	}
  
	root.modal = new modal();
  })(this);