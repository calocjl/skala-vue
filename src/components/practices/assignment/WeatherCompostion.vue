<script setup>
import { ref, computed, watch, watchEffect } from 'vue'

// 1. 반응형 상태 관리
const weatherList = ref([
  { id: 'city_01', name: '제주', temp: 27, status: '맑음' },
  { id: 'city_02', name: '강릉', temp: 22, status: '흐림' },
  { id: 'city_03', name: '대전', temp: 29, status: '맑음' },
  { id: 'city_04', name: '서울', temp: 24, status: '비' },
  { id: 'city_05', name: '부산', temp: 26, status: '구름' },
])
const searchQuery = ref('')
const selectedCityInfo = ref('궁금한 지역 카드를 눌러보세요 🙂')

// 추가 기능: 온도 정렬 토글 (오름차순 / 내림차순)
const isAscending = ref(true)
const toggleSort = () => {
  isAscending.value = !isAscending.value
}

// 2. 검색 도시 (computed 활용)
// - searchQuery가 비어있으면 원본 전체를 반환
// - 값이 있으면 도시 이름에 포함된 항목만 필터링
// - 정렬 토글 상태에 따라 온도 오름차순/내림차순으로도 재배열
const filteredWeatherList = computed(() => {
  const base = weatherList.value.filter((city) =>
    city.name.includes(searchQuery.value),
  )
  return [...base].sort((a, b) =>
    isAscending.value ? a.temp - b.temp : b.temp - a.temp,
  )
})

// 3-1. selectedCityInfo 감시 (watch 이용)
// 상태바 문구가 바뀔 때마다 콘솔로그 작성
watch(selectedCityInfo, (newMessage, oldMessage) => {
  console.log(
    `👁️ [watch 감지] 상태 바 문구가 업데이트되었습니다 -> "${oldMessage}" ➡️ "${newMessage}"`,
  )
})

// 3-2. searchQuery 감시 (watchEffect 이용)
// 도시 검색어를 타이핑할 때마다 변하는 searchQuery를 추적하여 콘솔로그로 작성
watchEffect(() => {
  console.log(
    `🤖 [watchEffect 자동 호출] 현재 검색어 '${searchQuery.value}'에 매칭되는 데이터를 필터링 중...`,
  )
})

const selectCity = (cityName) => {
  selectedCityInfo.value = `[${cityName}] 이(가) 선택되었습니다.`
}

const showDetail = (city, e) => {
  e.stopPropagation()
  window.alert(`${city.name} 지역 현재 날씨: ${city.status}, ${city.temp}°C`)
}
</script>

<template>
  <div class="weather-container">
    <h2>💜 오늘의 날씨 대시보드 (Composition)</h2>

    <!-- 도시 검색 -->
    <div class="search-box">
      <label>지역 검색</label>
      <input v-model="searchQuery" placeholder="검색할 도시 이름을 입력해보세요" />
    </div>

    <!-- 정렬 토글 버튼 (추가 기능) -->
    <div class="sort-toggle">
      <button @click="toggleSort">
        🌡️ 온도 {{ isAscending ? '낮은순' : '높은순' }} 정렬 중 (클릭해서 전환)
      </button>
    </div>

    <!-- 검색 결과 표시 -->
    <div class="weather-grid">
      <template v-if="filteredWeatherList.length > 0">
        <div
          class="weather-card"
          v-for="city in filteredWeatherList"
          :key="city.id"
          @click="selectCity(city.name)"
        >
          <span v-if="city.temp >= 25" class="badge hot">🔥 더움</span>
          <span v-else class="badge cool">❄️ 선선</span>

          <p class="city-name">{{ city.name }}</p>
          <p class="city-status">{{ city.status }}</p>
          <p class="city-temp">{{ city.temp }}°C</p>

          <button class="detail-btn" @click="showDetail(city, $event)">
            자세히 보기
          </button>
        </div>
      </template>

      <!-- 검색어와 일치하는 데이터가 없을 때 -->
      <p v-else class="no-result">🔍 '{{ searchQuery }}'와 일치하는 도시가 없습니다.</p>
    </div>

    <div class="status-bar">{{ selectedCityInfo }}</div>
  </div>
</template>

<style scoped>
.weather-container {
  max-width: 580px;
  margin: 0 auto;
  padding: 28px;
  background: linear-gradient(160deg, #f3eefc 0%, #eaf7f3 100%);
  border-radius: 28px;
  font-family: 'Pretendard', sans-serif;
}
h2 {
  text-align: center;
  color: #6c4ab6;
  margin-bottom: 20px;
}
.search-box {
  background: white;
  padding: 14px 18px;
  border-radius: 20px;
  margin-bottom: 12px;
  box-shadow: 0 4px 14px rgba(108, 74, 182, 0.08);
}
.search-box label {
  display: block;
  font-size: 13px;
  color: #6c4ab6;
  font-weight: bold;
  margin-bottom: 6px;
}
.search-box input {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #e2d6f7;
  border-radius: 14px;
  box-sizing: border-box;
  outline: none;
}
.search-box input:focus {
  border-color: #a78bda;
}

.sort-toggle {
  text-align: center;
  margin-bottom: 18px;
}
.sort-toggle button {
  border: none;
  background: #ede4fb;
  color: #6c4ab6;
  padding: 8px 16px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
}
.sort-toggle button:hover {
  background: #ddc9f7;
}

.weather-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.weather-card {
  position: relative;
  background: white;
  border-radius: 20px;
  padding: 18px;
  cursor: pointer;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.15s, box-shadow 0.15s;
}
.weather-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(108, 74, 182, 0.15);
}
.city-name {
  font-size: 19px;
  font-weight: bold;
  color: #4b2e83;
  margin: 6px 0 0;
}
.city-status {
  color: #8a6fc7;
  margin: 2px 0;
}
.city-temp {
  font-size: 24px;
  font-weight: bold;
  color: #6c4ab6;
  margin: 4px 0 12px;
}
.badge {
  position: absolute;
  top: 16px;
  right: 16px;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: bold;
}
.badge.hot {
  background: #ffe4d6;
  color: #d2691e;
}
.badge.cool {
  background: #dff3ee;
  color: #2f8f7a;
}
.detail-btn {
  width: 100%;
  padding: 9px;
  border: none;
  border-radius: 14px;
  background: #6c4ab6;
  color: white;
  font-weight: bold;
  cursor: pointer;
}
.detail-btn:hover {
  background: #573b96;
}

.no-result {
  text-align: center;
  padding: 24px;
  background: white;
  border-radius: 20px;
  color: #a38fc7;
  font-weight: bold;
}

.status-bar {
  margin-top: 20px;
  padding: 14px;
  background: #e4d9f7;
  color: #4b2e83;
  border-radius: 16px;
  text-align: center;
  font-weight: bold;
}
</style>