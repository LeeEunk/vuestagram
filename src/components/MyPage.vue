<template>
  <div style="padding: 10px">
    <h4>팔로워</h4>
    <input
      class="search"
      @input="search($event.target.value)"
      placeholder="🔍"
    />
    <div class="post-header" v-for="(follower, i) in follower" :key="i">
      <div
        class="profile"
        :style="`background-image: url(${follower.image}) `"
      ></div>
      <span class="profile-name">{{ follower.name }}</span>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, reactive, toRefs, computed } from "vue";
import axios from "axios";
// import { useStore } from "vuex";

export default {
  name: "MyPage",
  props: {
    one: Number,
    two: Number,
  },
  // 컴포넌트 만들기 전에 이거부터 실행해주세요와 동일
  setup(props) {
    let follower = ref([]); // 실시간 데이터 렌더링 -> reference data 덕분임
    let followerOriginal = ref([]); //원본을 저장해둘 state 생성

    let test = reactive({ name: "kim" });
    test;
    props; //실시간 반영이 안될 수 있음
    let prop = ref(props); // ref에 감싸야 실시간 반영 o
    let { one, two } = toRefs(props); // 여러개의 항목들을 감싸안고 싶으면 toRefs 사용
    console.log(one.value);
    console.log(prop.value);
    console.log(two.value);

    let result = computed(() => {
      return follower.value.length;
    });
    console.log(result.value);

    // let store = useStore();
    // console.log(store.state.name);
    // console.log(store.commit());

    onMounted(() => {
      //Lifecycle hook으로 사용하던 함수명 앞에 on을 붙여줘야 함
      //mount 이후에 실행할 코드
      axios.get("/follower.json").then((a) => {
        followerOriginal.value = a.data;
        follower.value = [...a.data];
      });
    });

    function search(input) {
      let filtered = followerOriginal.value.filter((a) => {
        // return a.name.indexOf(input) != -1;
        return a.name.match(new RegExp(input, "g"));
      });
      follower.value = [...filtered];
    }

    return { follower, search };
  },
};
</script>

<style></style>
