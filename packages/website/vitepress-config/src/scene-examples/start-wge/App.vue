<script setup>
import { EP01 } from "@itancc/wge";
import { onMounted, useTemplateRef } from "vue";

const sceneRef = useTemplateRef("sceneRef");
onMounted(async () => {
  const ep01 = await EP01(sceneRef.value);
});
</script>

<template>
  <canvas ref="sceneRef"  class="w-full h-full"></canvas>
</template>
