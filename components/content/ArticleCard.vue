<script setup lang="ts">
import type {
  PageArticleDocument,
  PageThematiqueDocument,
} from "~/prismicio-types";
import type { ImageField } from "@prismicio/client";
const { isMobile } = useDevice();

export interface Props {
  item: PageArticleDocument;
}

const props = defineProps<Props>();
const { item } = toRefs(props);

const imageVignette = computed<ImageField>(() =>
  isMobile
    ? item.value.data.image_vignette.mobile
    : item.value.data.image_vignette.vignette,
);
</script>

<template>
  <div
    v-if="item"
    class="transition duration-300 ease-in-out hover:shadow-lg hover:scale-105 rounded-md h-64 overflow-hidden"
  >
    <prismic-link :field="item" :aria-label="item.data.title">
      <div class="relative">
        <prismic-image
          v-if="imageVignette"
          :field="imageVignette"
          class="object-cover object-center h-full w-full"
          :width="imageVignette.dimensions?.width"
          :height="imageVignette.dimensions?.height"
          :aria-placeholder="[
            imageVignette.dimensions?.width,
            imageVignette.dimensions?.height,
          ]"
          loading="lazy"
        />
        <h3
          class="mt-1 absolute inset-0 z-10 flex justify-center items-center text-xl text-white bg-gradient-to-t from-gray-900"
        >
          {{ item.data.title }}
        </h3>
      </div>
    </prismic-link>
  </div>
</template>
