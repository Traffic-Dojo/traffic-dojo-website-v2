<script setup lang="ts">
useHead({
  meta: [
    {
      name: "facebook-domain-verification",
      content: "qomyi6ggyl9d5biwa6e94m4kv5hupu",
    },
  ],
  script: [
    {
      tagPosition: "head",
      textContent: `!(function (f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod
            ? n.callMethod.apply(n, arguments)
            : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = "2.0";
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(
        window,
        document,
        "script",
        "https://connect.facebook.net/en_US/fbevents.js",
      );
      fbq("init", "1984102532090910");
      fbq("track", "PageView");`,
    },
  ],
  noscript: [
    {
      tagPosition: "head",
      innerHTML: `<img
        height="1"
        width="1"
        style="display: none"
        src="https://www.facebook.com/tr?id=1984102532090910&ev=PageView&noscript=1"
    />`,
    },
  ],
});
</script>

<template>
  <div class="bg-background min-h-screen text-white">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
