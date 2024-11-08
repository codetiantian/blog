export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/tiantian/Desktop/my-blog/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":"Hello VuePress"} }],
  ["/vue/compatibility.html", { loader: () => import(/* webpackChunkName: "vue_compatibility.html" */"/Users/tiantian/Desktop/my-blog/docs/.vuepress/.temp/pages/vue/compatibility.html.js"), meta: {"title":""} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"/Users/tiantian/Desktop/my-blog/docs/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
]);
