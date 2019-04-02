# lazzzy
Lightweight js library for implementing lazy loading images
# Inlcude files
The only file you need is [lazzzy.js](https://dimazzta.github.io/lazzzy/lazzzy.js).
```html
<script src="./lazzzy.js"></script>
```
# Prepare markup
For images you are going to make lazy add a class (e.g. "lazy") and a data-src attribute and specify path to the full-size image. You can optionally add a src attribute and specify path to the low-resolution image to make cool transition effect. Note that you are in charge of making low-res image to be the same width and height as main image. This can be done by hardcoding actual width and height attributes or using wrapper (check [example](https://dimazzta.github.io/lazzzy/demo1.html).) If you won`t use low-res image you can just add a wrapper with some background color as a stab.
```html
<div class="img-wrapper">
    <img src="path/to/low-res/image.jpg" class="lazy" data-src="path/to/full/image.jpg" alt="">
</div>
```
# Initialize lazzzy
```javascript
lazzzy.init({
    selector: '.lazy',
    allowLoadingOutsideViewport: false,
    classAfterLoading: 'loaded',
    dataLoadedForNotComputable: -1,
    classBeforeLoading: ''
});
```
Name | Type | Description
------------ | ------------- | -------------
__selector__ | Optional | What elements are going to be lazy. If not specified, selects all images
__allowLoadingOutsideViewport__ | Optional | If false, only those images that are in user viewport will be loaded, the rest won`t until user scrolls the page. False by default
__classAfterLoading__ | Optional | A class that will be added to the image when it completely loaded. No class will be added by default
__dataLoadedForNotComputable__ | Optional | Lazzzy adds a "data-loaded" attribute while image loading is in progress. This attribute contains current progress of loading (in percents) so you can display it somewhere using javascript. If specified, then in case when lazzzy can not compute this value, the specified value will be used (could be -1). If not specified, the "data-loaded" attribute won`t be added at all in case of non-computable value
__classBeforeLoading__ | Optional | 	A class that will be added to the image before loading and will disappear when loading ends. No class will be added by default
