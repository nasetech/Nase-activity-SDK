# Nase 活动页面SDK

## 关于本SDK
实际上是对API进行了一次封装，方便需要时直接调用，简化了业务代码，如果有需要使用而没有添加进来的API，也希望补充进来，创建分支并提交合并请求。  

## 使用方法  

1. 将整个文件夹或者需要用的文件复制到需要用到的活动页面项目中。
2. 确定 activitySDK.js 文件中的私有化配置 __CONFIG__ 中的host，改成需要使用的host
3. 在活动 HTML 页面中引入SDK文件以及其他需要用的文件，引入方法如下：  
```
  <script src="./xxx/activitySDK.js"></script>
  <script src="./xxx/ajax.js"></script>  
  ...
```
4. 在需要使用的地方按照 `window.nase.xxx()` 调用即可。

## 注意
使用SDK时请先查看各个 API 注释，其中包含某些必要引入的文件


