<script setup>
import { ref } from 'vue'

// 1. 배열 렌더링용 날씨 데이터
const weatherList = ref([
  { id: 'city_01', name: '제주', temp: 27, status: '맑음' },
  { id: 'city_02', name: '강릉', temp: 22, status: '흐림' },
  { id: 'city_03', name: '대전', temp: 29, status: '맑음' },
  { id: 'city_04', name: '서울', temp: 24, status: '비' },
  { id: 'city_05', name: '부산', temp: 26, status: '구름' },
])

// 3. 도시 검색용 입력값
const searchKeyword = ref('')

// 4. 카드 클릭 시 표시할 상태 메시지
const selectedCityMessage = ref('궁금한 지역 카드를 눌러보세요 🙂')

// 카드 클릭 시 실행 (버블링 됨)
const selectCity = (cityName) => {
  selectedCityMessage.value = `[${cityName}] 카드를 선택했습니다.`
}

// 상세보기 버튼 클릭 시 실행 (버블링 방지)
const showDetail = (cityName, status, e) => {
  e.stopPropagation()
  window.alert(`${cityName} 지역 현재 날씨 상태: ${status}`)
}
</script>

<template>
  <div class="weather-container">
    <h2>🌿 오늘의 날씨 미리보기</h2>

    <!-- 3. 도시 검색 (양방향 바인딩) -->
    <div class="search-box">
      <label>지역 검색</label>
      <input
        :value="searchKeyword"
        @input="(e) => (searchKeyword = e.target.value)"
        placeholder="지역명을 입력해보세요"
      />
      <p v-if="searchKeyword">'{{ searchKeyword }}' 검색 중...</p>
    </div>

    <!-- 1. 배열 렌더링 (v-for) -->
    <div class="weather-grid">
      <div
        class="weather-card"
        v-for="city in weatherList"
        :key="city.id"
        @click="selectCity(city.name)"
      >
        <!-- 2. 조건부 렌더링: 뱃지를 카드 상단에 배치 -->
        <span v-if="city.temp >= 25" class="badge hot">더움</span>
        <span v-else class="badge cool">선선</span>

        <p class="city-name">{{ city.name }}</p>
        <p class="city-status">{{ city.status }}</p>
        <p class="city-temp">{{ city.temp }}°C</p>

        <!-- 4. 이벤트 + 버블링 방지: 버튼을 하단 전체 너비로 -->
        <button class="detail-btn" @click="showDetail(city.name, city.status, $event)">
          자세히 보기
        </button>
      </div>
    </div>

    <!-- 상태바 -->
    <div class="status-bar">{{ selectedCityMessage }}</div>
  </div>
</template>

<style scoped>
.weather-container {
  max-width: 560px;
  margin: 0 auto;
  padding: 24px;
  background: #f0faf5;
  border-radius: 16px;
  font-family: sans-serif;
}
.search-box {
  margin-bottom: 20px;
}
.search-box label {
  display: block;
  font-size: 14px;
  color: #2f7a5c;
  margin-bottom: 6px;
  font-weight: bold;
}
.search-box input {
  width: 100%;
  padding: 10px;
  border: 1px solid #b7e4c7;
  border-radius: 8px;
  box-sizing: border-box;
}
.search-box p {
  margin-top: 6px;
  font-size: 13px;
  color: #52b788;
}

.weather-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.weather-card {
  position: relative;
  background: white;
  border: 1px solid #d8f3dc;
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: box-shadow 0.15s;
}
.weather-card:hover {
  box-shadow: 0 2px 10px rgba(45, 130, 90, 0.15);
}
.city-name {
  font-size: 18px;
  font-weight: bold;
  color: #1b4332;
  margin: 4px 0 0;
}
.city-status {
  color: #40916c;
  margin: 2px 0;
}
.city-temp {
  font-size: 22px;
  font-weight: bold;
  color: #2d6a4f;
  margin: 4px 0 12px;
}
.badge {
  position: absolute;
  top: 14px;
  right: 14px;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
}
.badge.hot {
  background: #ffedd5;
  color: #c2410c;
}
.badge.cool {
  background: #d0f4de;
  color: #2d6a4f;
}
.detail-btn {
  width: 100%;
  padding: 8px;
  border: none;
  border-radius: 8px;
  background: #40916c;
  color: white;
  font-weight: bold;
  cursor: pointer;
}
.detail-btn:hover {
  background: #2d6a4f;
}

.status-bar {
  margin-top: 20px;
  padding: 12px;
  background: #d8f3dc;
  color: #1b4332;
  border-radius: 10px;
  text-align: center;
  font-weight: bold;
}
</style>s