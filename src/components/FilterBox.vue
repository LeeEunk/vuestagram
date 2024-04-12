<template>
  <div
    :class="filter + ' filter-item'"
    :style="{ backgroundImage: `url(${image})` }"
    @click="set_filter"
  >
    <div class="slot">
      <slot></slot>
    </div>
    <!-- <button @click="fire">버튼</button> -->
  </div>
</template>

<script>
export default {
  name: "FilterBox",
  methods: {
    // fire() {
    //   this.emitter.emit("작명", "데이터");
    // },
    set_filter() {
      this.emitter.emit("selected_box", this.filter);
    },
  },
  props: {
    image: String,
    filter: String,
  },
};
</script>

<style>
.filter-item {
  width: 100px;
  height: 100px;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color: white;
  background-size: cover;
  background-position: center;
}
</style>
