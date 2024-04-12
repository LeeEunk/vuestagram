<template>
  <div style="padding: 10px">
    <h4>팔로워</h4>
    <input placeholder="?" />
    <div class="post-header">
      <div class="profile" style="background-image: url()"></div>
      <span class="profile-name">{{ follower }}</span>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import axios from "axios";

export default {
  name: "MyPage",
  // 컴포넌트 만들기 전에 이거부터 실행해주세요와 동일
  setup() {
    let follower = ref([]); // 실시간 데이터 렌더링 -> reference data 덕분임

    onMounted(() => {
      axios.get("/follower.json").then((a) => {
        follower.value = a.data;
      });
    });

    return { follower };
  },
};
</script>

<style></style>
