<template>
  <div>
    <!-- 포스트 페이지 -->
    <div v-if="tab == 0">
      <Post
        :filter="filter"
        :datas="datas[i]"
        v-for="(a, i) in datas"
        :key="i"
      />
      <!-- <Post :datas="a" v-for="(a, i) in datas" :key="i" /> -->
    </div>

    <!-- 필터 선택 페이지 -->
    <div v-if="tab == 1">
      <div
        :class="selected_filter"
        class="upload-image"
        :style="{ backgroundImage: `url(${image})` }"
      ></div>
      <div class="filters">
        <!-- 필터 박스 -->
        <FilterBox
          :image="image"
          :filter="filter"
          v-for="filter in filter_name"
          :key="filter"
          ><span>{{ filter }}</span></FilterBox
        >
      </div>
    </div>

    <!-- 글작성페이지 -->
    <div v-if="tab == 2">
      <div
        :class="selected_filter"
        class="upload-image"
        :style="`background-image:url(${image})`"
      ></div>
      <div class="write">
        <textarea
          @input="$emit('write', $event.target.value)"
          class="write-box"
        >
write!</textarea
        >
      </div>
    </div>
  </div>

  <!-- 
    <Post :datas="datas[0]" />
    <Post :datas="datas[1]" />
    <Post :datas="datas[2]" /> -->
</template>

<script>
import Post from "./Post";
import FilterBox from "./FilterBox";

export default {
  name: "ContainerView",
  data() {
    return {
      filter_name: [
        "aden",
        "_1977",
        "brannan",
        "brooklyn",
        "clarendon",
        "earlybird",
        "gingham",
        "hudson",
        "inkwell",
        "kelvin",
        "lark",
        "lofi",
        "maven",
        "mayfair",
        "moon",
        "nashville",
        "perpetua",
        "reyes",
        "rise",
        "slumber",
        "stinson",
        "toaster",
        "valencia",
        "walden",
        "willow",
        "xpro2",
      ],
      selected_filter: "",
    };
  },
  mounted() {
    this.emitter.on("selected_box", (a) => {
      this.selected_filter = a;
    });
  },
  components: {
    Post,
    FilterBox,
  },
  props: {
    datas: Array,
    tab: Number,
    image: String,
  },
};
</script>

<style>
.upload-image {
  width: 100%;
  height: 450px;
  background: cornflowerblue;
  background-size: cover;
}
.filters {
  overflow-x: scroll;
  white-space: nowrap;
}
.filter-1 {
  width: 100px;
  height: 100px;
  background-color: cornflowerblue;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color: white;
  background-size: cover;
}
.filters::-webkit-scrollbar {
  height: 5px;
}
.filters::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.filters::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}
.filters::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.write-box {
  border: none;
  width: 90%;
  height: 100px;
  padding: 15px;
  margin: auto;
  display: block;
  outline: none;
}
</style>
