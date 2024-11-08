<template><div><h3 id="适配不同屏幕" tabindex="-1"><a class="header-anchor" href="#适配不同屏幕"><span>适配不同屏幕</span></a></h3>
<blockquote>
<p>需要注意设置<code v-pre>device-width</code>时的单位为<code v-pre>PX</code></p>
</blockquote>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">@media only</span>
<span class="line">screen and (device-width: 375PX) and (device-height: 667PX) and (-webkit-device-pixel-ratio: 2),</span>
<span class="line">screen and (device-width: 414PX) and (device-height: 736PX) and (-webkit-device-pixel-ratio: 3){</span>
<span class="line">  .bavbar-padtop {</span>
<span class="line">    padding-top: 40px;</span>
<span class="line">  }</span>
<span class="line">}</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="兼容性适配" tabindex="-1"><a class="header-anchor" href="#兼容性适配"><span>兼容性适配</span></a></h3>
<blockquote>
<p>当低版本设备白屏时，大概率就是使用的某个工具没有转成cmj，需要<code v-pre>vue.config.js</code>中针对报错的js再使用babel转义一下：</p>
</blockquote>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">transpileDependencies: [</span>
<span class="line">    '@vue/devtools-api',</span>
<span class="line">    'dom7',</span>
<span class="line">    'pinia'</span>
<span class="line">  ]</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>设备调试方案</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">https://blog.csdn.net/weixin_43883776/article/details/86232157</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="使用阿里oss图片时-需要注意" tabindex="-1"><a class="header-anchor" href="#使用阿里oss图片时-需要注意"><span>使用阿里oss图片时，需要注意</span></a></h3>
<ul>
<li>iOS14、14+系统支持webp格式，可以使用</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">'https://images.daojia.com/jz/pic/92d148536992a9ab6af56e26c3da5699.png?x-oss-process=image/format,webp'</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ul>
<li>不支持webp时，需要考虑兼容处理</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">export function supportsWebP () {</span>
<span class="line">  // 如果浏览器支持 canvas 和 2D 上下文</span>
<span class="line">  if (!document.createElement('canvas').getContext) {</span>
<span class="line">    return false</span>
<span class="line">  }</span>
<span class="line"></span>
<span class="line">  // 检查是否支持基本的 WebP</span>
<span class="line">  const isWebp = document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0</span>
<span class="line">  return isWebp</span>
<span class="line">}</span>
<span class="line">export function getDealImgUrl (imgUrl: string, useMasterMap = false) {</span>
<span class="line">  let isSupport = false</span>
<span class="line">  if (mainStore.strSupportWebp === '') {</span>
<span class="line">    isSupport = supportsWebP()</span>
<span class="line">    mainStore.updateSupportValue(isSupport ? '1' : '0')</span>
<span class="line">  } else {</span>
<span class="line">    isSupport = mainStore.strSupportWebp === '1'</span>
<span class="line">  }</span>
<span class="line">  return isSupport ? `${imgUrl}?x-oss-process=image/format,webp` : (useMasterMap ? `${imgUrl}` : `${imgUrl}?x-oss-process=image/format,jpg/quality,q_70`)</span>
<span class="line">}</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>当设置<code v-pre>background-image</code>时，需要判断当前设备是否支持webp格式，通过动态绑定方案实现</li>
</ul>
<h3 id="使用gif图-不同移动设备展示样式不一致" tabindex="-1"><a class="header-anchor" href="#使用gif图-不同移动设备展示样式不一致"><span>使用gif图，不同移动设备展示样式不一致</span></a></h3>
<blockquote>
<p>gif图制作的播放一次，在低版本的安卓设备（安卓8）和iOS14以下的设备，会偶发的播放2次，分析原因：<code v-pre>vue中使用gif，可能是由于组件刷新，导致gif图片重新播放</code></p>
</blockquote>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">// 处理方案</span>
<span class="line">&lt;img ref="sucImgRef" alt="" class="suc-img"></span>
<span class="line"></span>
<span class="line">onMounted(() => {</span>
<span class="line">  if (sucImgRef &amp;&amp; !sucImgRef.value.src) {</span>
<span class="line">    sucImgRef.value.src = getSucGifImg()</span>
<span class="line">  }</span>
<span class="line">})</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


