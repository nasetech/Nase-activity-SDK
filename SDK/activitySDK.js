(function(global, factory) {
  return factory.call(global);
})(window, function() {
  var __MODULES__ = {};
  var __CONFIG__ = {
    host: "https://hzdjy.nase.tech",
    sid: "",
    token: ""
  };
  var __CORE__ = {
    // 初始化
    init: function(options) {
      if (__CONFIG__.host !== options.host) {
        __CONFIG__.host = options.host;
      }
      __CONFIG__.token = options.token;
      __CONFIG__.sid = options.sid;
      sid === "" ? toast.show("未获取到 sid!") : null;
      token === "" ? toast.show("未获取到 token!") : null;
    },
    /**
     * 设置网页的 title
     * @param {string}  title  活动标题
     */
    setPageTitle: function(title) {
      document.title = title;
    },
    /**
     * #########################
     * #### 领券活动相关API ######
     * #########################
     */
    /**
     * 领券需要获取到活动信息
     * @param {string} postId
     */
    getCouponInfo: function(postId, callback) {
      ajax({
        url: __CONFIG__.host + "/post/" + postId,
        method: "GET"
      })
        .then(function(res) {
          console.log("返回结果res", res);
          // 返回优惠券的 id
          // callback && callback(res.data.metas.find(item => item.key === "discountId").value);
          callback &&
            callback(
              res.data.metas.find(function(item) {
                return item.key === "discountId";
              }).value
            );
        })
        .catch(function(err) {
          console.log("返回错误结果err", err);
        });
    },
    /**
     * 用户领取优惠券
     * @param  {int}       discountId  优惠券的id，需要通过获取post详情中的meta获取
     * @param  {int}       postId      活动的id
     */
    userGetCoupon: function(discountId, postId) {
      console.log("领取ID", discountId);
      if (!discountId) {
        return toast.show("优惠券id不存在");
      }
      ajax({
        url: __CONFIG__.host + "/discount/coupon/claim",
        method: "POST",
        headers: {
          Authorization: "TOKEN " + __CONFIG__.token,
          sid: __CONFIG__.sid
        },
        data: { discountId: discountId }
      })
        .then(function(res) {
          console.log("返回结果res", res);
          window.nase.joinActivity(postId);
          return toast.show("成功领取优惠券");
        })
        .catch(function(err) {
          console.log("返回错误结果err", err);
        });
    },
    /**
     * #########################
     * #### 用户签到相关API ######
     * #########################
     */
    /**
     * 用户签到
     * @param  {int}       postId  当前签到活动的id
     * @param   {function}  signinSuccess    自定义签到成功后的回调
     * @param   {function}  signinRepeat     签到重复后的回调
     */
    signinActive: function(postId, signinSuccess, signinRepeat) {
      if (!postId) {
        return toast.show("id不存在");
      }
      ajax({
        url: __CONFIG__.host + "/post/" + postId + "/signin",
        method: "PUT",
        headers: {
          Authorization: "TOKEN " + __CONFIG__.token,
          sid: __CONFIG__.sid
        }
      })
        .then(function(res) {
          console.log("返回结果res", res);
          window.nase.joinActivity(postId);
          window.nase.handleResponse(res, signinSuccess, signinRepeat, "签到");
        })
        .catch(function(err) {
          console.log("返回结果err", err);
          toast.show(err.msg, 1500);
        });
    },
    /**
     * 用户操作后返回的回调
     * @param   {obj}       res                调用操作API返回的结果
     * @param   {function}  activitySuccess    自定义操作成功后的回调
     * @param   {function}  activityRepeat     操作重复后的回调
     * @param   {string}    activity           用户的操作
     */
    handleResponse: function(res, activitySuccess, activityRepeat, activity) {
      var resCode = res.code;
      if (resCode === 0) {
        modal.open({
          title: activity + "成功",
          content: "您已" + activity + "成功",
          onOk: function() {
            activitySuccess();
          }
        });
      } else if (resCode === 400) {
        modal.open({
          title: "温馨提示",
          content: "您已" + activity + "，请勿重复" + activity,
          onOk: function() {
            activityRepeat();
          }
        });
      } else if (resCode === 401) {
        toast.show("登录失败");
      } else {
        toast.show(activity + "失败");
      }
    },
    /**
     * 获取活动页面背景图片
     * @param   {int}       postId    活动的postId
     * @param   {function}  callback  获取图片成功后的自定义回调
     */
    fetchBgImg(postId, callback) {
      if (!postId) {
        return toast.show("id不存在");
      }
      ajax({
        url: __CONFIG__.host + "/post/" + postId + "?needEditor=true",
        method: "GET",
        headers: {
          Authorization: "TOKEN " + __CONFIG__.token,
          sid: __CONFIG__.sid
        }
      })
        .then(function(res) {
          console.log("初始化返回结果res", res);
          window.nase.setPageTitle(res.data.title);
          home.show({
            imgCDN: imgCDN,
            res: res
          });
        })
        .catch(function(err) {
          console.log("初始化返回结果err", err);
        });
    },
    /**
     * #########################
     * #### 抽奖活动相关API ######
     * #########################
     */
    /**
     * 用户抽奖
     * @param  {int}       postId  当前抽奖活动的id
     * @param   {function}  callback    自定义抽奖成功后的回调
     */
    userLottery: function(postId, token, callback) {
      if (!postId) {
        return toast.show("id不存在");
      }
      ajax({
        url: host + "/post/" + postId + "/lottery?joinCode=5",
        method: "GET",
        headers: {
          Authorization: "TOKEN " + __CONFIG__.token,
          sid: __CONFIG__.sid
        }
      })
        .then(function(res) {
          console.log("返回结果res", res);
          callback(res);
        })
        .catch(function(err) {
          console.log("返回结果err", err);
        });
    },
    /**
     * #########################
     * #### 投票活动相关API ######
     * #########################
     */
    /**
     * 根据活动编号获取voteId
     * @param  {int}       postId  当前抽奖活动的id
     * @param   {function}  callback    获取成功后的回调
     */
    getVotePostInfo: function(postId, callback) {
      ajax({
        url: __CONFIG__.host + "/api/v0/post/" + postId,
        method: "GET",
        headers: {
          Authorization: "TOKEN " + __CONFIG__.token,
          sid: __CONFIG__.sid
        }
      })
        .then(function(res) {
          console.log("返回结果res", res);
          window.nase.setPageTitle(res.data.title);
          home.show({
            imgCDN: imgCDN,
            res: res
          });
          // 返回投票活动的活动 id
          // callback && callback(res.data.metas.find(item=>item.key==="activityId").value)
          callback(
            res.data.metas.find(function(item) {
              return item.key === "activityId";
            }).value
          );
        })
        .catch(function(err) {
          console.log("返回错误结果err", err);
        });
    },
    /**
     * 获取投票活动的详细信息
     * @param  {int}        id          投票活动的 id （非postId)
     * @param  {string}     token
     * @param   {function}  callback    获取成功后的回调
     */
    getVoteInfo: function(id, callback) {
      ajax({
        url: __CONFIG__.host + "/tp/api/v0/vote/" + id,
        method: "GET",
        headers: {
          Authorization: "TOKEN " + __CONFIG__.token,
          sid: __CONFIG__.sid
        }
      })
        .then(function(res) {
          console.log("返回结果res", res);
          callback &&
            callback(res.data.data.options, res.data.data.optionLimitation);
        })
        .catch(function(err) {
          console.log("返回错误结果err", err);
        });
    },
    /**
     * 投票
     * @param   {int}       id        需要的ID是 meta.voteId
     * @param   {function}  callback
     */
    vote: function(postId, options, voteId, voteSuccess, voteRepeat) {
      ajax({
        url: __CONFIG__.host + "/tp/api/v0/vote/to",
        method: "POST",
        headers: {
          Authorization: "TOKEN " + __CONFIG__.token,
          sid: __CONFIG__.sid
        },
        data: {
          voteId: voteId,
          optionId: options
        }
      })
        .then(function(res) {
          console.log("返回结果res", res);
          window.name.joinActivity(postId);
          window.nase.handleResponse(res, voteSuccess, voteRepeat, "投票");
        })
        .catch(function(err) {
          console.log("返回错误结果err", err);
        });
    },
    /**
     * #########################
     * #### 用户参与活动相关API ######
     * #########################
     */
    joinActivity: function(postId) {
      ajax({
        url: __CONFIG__.host + "/post/" + postId + "/join",
        method: "PUT",
        headers: {
          Authorization: "TOKEN " + __CONFIG__.token,
          sid: __CONFIG__.sid
        },
        data: { join: true }
      })
        .then(function(res) {
          console.log("join 返回结果res", res);
        })
        .catch(function(err) {
          console.log("返回错误结果err", err);
        });
    }
  };
  this.nase = __CORE__;
});
