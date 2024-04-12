import { createStore } from "vuex";
import datas from "./assets/data.js";
import axios from "axios";

const store = createStore({
  state() {
    return {
      name: "kim",
      age: 20,
      datas: datas,
      likes: datas.map((datas) => datas.likes),
      liked: datas.map((datas) => datas.liked),
      more: {}, // 더보기 게시물을 가져와 여기 저장해보자
    };
  },
  mutations: {
    // 이름변경(state) {
    //   state.name = "park";
    // },
    // 나이변경(state, payload) {
    //   state.age += payload;
    // },
    // 나이변경(state) {
    //   state.age++;
    // },
    좋아요(state, idx) {
      if (state.liked[idx] === false) {
        //좋아요 기능
        state.likes[idx]++;
        state.liked[idx] = true;
      } else if (state.liked[idx] === true) {
        // 좋아요 취소 기능
        state.likes[idx]--;
        state.liked[idx] = false;
      }
    },
    setMore(state, data) {
      state.more = data; // ajax로 가져온거
    },
    게시물_변경(state, datas) {
      // 더보기 버튼을 눌렀을 때, 기존의 posts를 업데이트된 post로 교체
      state.datas = datas;
      state.likes = datas.map((datas) => datas.likes);
      state.liked = datas.map((datas) => datas.liked);
    },
  },
  actions: {
    getData(context) {
      axios.get(`https://codingapple1.github.io/vue/more0.json`).then((a) => {
        console.log(a.data);
        context.commit("setMore", a.data);
      });
    },
  },
});

export default store;
