<template>
  <div class="header">
    <ul class="header-button-left">
      <li>Cancel</li>
    </ul>
    <ul class="header-button-right">
      <li v-if="tab == 1" @click="tab++">Next</li>
      <li v-if="tab == 2" @click="publish">Post</li>
    </ul>
    <img src="./assets/logo.png" class="logo" />
  </div>

  <!-- <h4>안녕 {{ $store.state.name }}</h4>
  <button @click="$store.state.name = '박'">변경</button> -->
  <Container
    :datas="datas"
    :tab="tab"
    :image="image"
    @write="content = $event"
  />

  <button @click="tab = 0">게시물보기</button>
  <button @click="tab = 1">필터보기</button>
  <button @click="tab = 2">글작성</button>
  <button @click="more">더보기</button>

  <div class="footer">
    <ul class="footer-button-plus">
      <input @change="upload" type="file" id="file" class="inputfile" />
      <label for="file" class="input-plus">+</label>
    </ul>
  </div>

  <!-- 탭만들기
    <div v-if="step == 0">내용0</div>
  <div v-if="step == 1">내용1</div>
  <div v-if="step == 2">내용2</div>
  <button @click="step = 0">버튼0</button>
  <button @click="step = 1">버튼1</button>
  <button @click="step = 2">버튼2</button> -->
</template>

<script>
import datas from "./assets/data.js";
import Container from "./components/Container";
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      content: "",
      datas: datas,
      moreCnt: 0,
      step: 0,
      tab: 0,
      image: "",
      selected_filter: "",
    };
  },
  mounted() {
    this.emitter.on("작명", (a) => {
      console.log(a);
    });
    this.emitter.on("selected_box", (a) => {
      this.selected_filter = a;
    });
  },
  components: {
    Container: Container,
  },
  methods: {
    publish() {
      var myPost = {
        name: "Eunkk",
        userImage: this.image,
        postImage: this.image,
        likes: 2,
        date: "May 15",
        liked: false,
        content: this.content,
        filter: this.selected_filter,
      };
      this.datas.unshift(myPost);
      this.tab = 0;
    },
    more() {
      axios
        .get(`https://codingapple1.github.io/vue/more${this.moreCnt}.json`)
        .then((result) => {
          //요청 성공 시 실행할 코드
          console.log(result.data);
          this.datas.push(result.data);
          this.moreCnt++;
        });
    },
    upload(e) {
      let file = e.target.files;
      console.log(file[0]);
      let url = URL.createObjectURL(file[0]);
      console.log(url);
      this.image = url;
      this.tab++;
    },
  },
};
</script>

<style>
@import "style.css";
</style>
