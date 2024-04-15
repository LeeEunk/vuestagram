<template>
  <div class="header">
    <ul class="header-button-left">
      <li @click="goHome">Cancel</li>
    </ul>
    <ul class="header-button-right">
      <li v-if="tab == 1" @click="tab++">Next</li>
      <li v-if="tab == 2" @click="publish">Post</li>
      <li v-if="tab == 0" @click="tab = 3">My Page</li>
    </ul>
    <img src="./assets/logo.png" class="logo" />
  </div>

  <!-- <h4>안녕 {{ $store.state.name }}</h4>
  <button @click="$store.commit('이름변경')">변경</button>

  <h4>안녕 {{ $store.state.age }}</h4>
  <button @click="$store.commit('나이변경', 10)">증가</button> -->

  <!-- <p>{{ $store.state.more }}</p>
  <button @click="$store.dispatch('getData')">더보기</button> -->

  <Container
    :like="like"
    :datas="datas"
    :tab="tab"
    :image="image"
    @write="content = $event"
  />

  <!-- <p>mapState : {{ name }} {{ age }} {{ likes }} {{ 내이름 }}</p>
  <p>mapMutations : {{ name }} {{ age }} {{ likes }} {{ 내이름 }}</p>
  <h4>안녕 {{ $store.state.age }}</h4>
  <button @click="나이변경(10)">증가</button> -->

  <!-- <p>method : {{ now() }} {{ 카운터 }}</p>
  <p>computed : {{ now2 }} {{ 카운터 }}</p>
  <button @click="카운터++">++</button> -->

  <!-- <button @click="tab = 0">게시물보기</button>
  <button @click="tab = 1">필터보기</button>
  <button @click="tab = 2">글작성</button> -->

  <button v-if="tab == 0" type="button" class="btn btn-light" @click="more">
    더보기
  </button>

  <div class="footer" v-if="tab == 0">
    <ul class="footer-button-plus">
      <input @change="upload" type="file" id="file" class="inputfile" />
      <label for="file" class="input-plus">+</label>
    </ul>
  </div>
  <!-- 
  탭만들기
  <div v-if="step == 0">내용0</div>
  <div v-if="step == 1">내용1</div>
  <div v-if="step == 2">내용2</div>
  <button @click="step = 0">버튼0</button>
  <button @click="step = 1">버튼1</button>
  <button @click="step = 2">버튼2</button>
  <button @click="step = 3">버튼3</button> -->
</template>

<script>
import datas from "./assets/data.js";
import Container from "./components/Container";
import axios from "axios";
import { mapMutations, mapState } from "vuex";

export default {
  name: "App",
  data() {
    return {
      like: false,
      content: "",
      datas: datas,
      moreCnt: 0,
      step: 0,
      tab: 0,
      image: "",
      selected_filter: "",
      카운터: 0,
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
  computed: {
    name() {
      return this.$store.state.name;
    },
    ...mapState(["name", "age", "likes"]),
    ...mapState({ 내이름: "name" }),
    now2() {
      return new Date();
    },
  },
  methods: {
    ...mapMutations(["setMore", "좋아요", "나이변경"]),
    now() {
      return new Date();
    },
    goHome() {
      this.$router.go(-1);
    },
    publish() {
      let myPost = {
        name: "Eunkk",
        userImage: this.image,
        postImage: this.image,
        likes: 0,
        date: "May 15",
        content: this.content,
        filter: this.selected_filter,
      };
      this.datas.unshift(myPost);
      this.$store.commit("게시물_변경", this.datas);
      this.tab = 0;
      this.filter = "";
    },
    more() {
      axios
        .get(`https://codingapple1.github.io/vue/more${this.moreCnt}.json`)
        .then((result) => {
          //요청 성공 시 실행할 코드
          console.log(result.data);
          this.datas.push(result.data);
          this.$store.commit("게시물_변경", this.datas);
          this.moreCnt++;
        })
        .catch(() => {
          console.log("GET 요청을 실패했습니다.");
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
