<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import BaseDashboardCard from '../components/practices/assignment/component/BaseDashboardCard.vue'
import SearchBar from '../components/practices/assignment/component/SearchBar.vue'
import WeatherCard from '../components/practices/assignment/component/WeatherCard.vue'

const router = useRouter()
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

// 도시 id ↔ 영문 도시명 매핑 (OpenWeather는 영문 도시명으로 조회함)
const cityMap = [
  { id: 'city_01', name: '제주', engName: 'Jeju' },
  { id: 'city_02', name: '강릉', engName: 'Gangneung' },
  { id: 'city_03', name: '대전', engName: 'Daejeon' },
  { id: 'city_04', name: '서울', engName: 'Seoul' },
  { id: 'city_05', name: '부산', engName: 'Busan' },
  { id: 'city_06', name: '인천', engName: 'Incheon' },
  { id: 'city_07', name: '광주', engName: 'Gwangju' },
  { id: 'city_08', name: '전주', engName: 'Jeonju' },
]

const weatherList = ref([])
const isLoading = ref(false)
const searchQuery = ref('')
const selectedCityInfo = ref('카드를 클릭하거나 검색해 보세요.')

const isAscending = ref(true)
const toggleSort = () => {
  isAscending.value = !isAscending.value
}

// 도시 8개를 동시에 API 호출 (Promise.all로 병렬 처리)
const fetchAllWeather = async () => {
  isLoading.value = true
  try {
    const requests = cityMap.map((city) =>
      axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: { q: city.engName, appid: API_KEY, units: 'metric', lang: 'kr' },
      }),
    )
    const responses = await Promise.all(requests)

    weatherList.value = responses.map((res, index) => ({
      id: cityMap[index].id,
      name: cityMap[index].name,
      temp: Math.round(res.data.main.temp),
      status: res.data.weather[0].description,
    }))
  } catch (error) {
    console.error('날씨 API 호출 실패:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchAllWeather)

const filteredWeatherList = computed(() => {
  const base = weatherList.value.filter((city) => city.name.includes(searchQuery.value))
  return [...base].sort((a, b) => (isAscending.value ? a.temp - b.temp : b.temp - a.temp))
})

const handleUpdateQuery = (newQuery) => {
  searchQuery.value = newQuery
}

const handleSelectCard = (cityName) => {
  selectedCityInfo.value = `[${cityName}] 이(가) 선택되었습니다.`
}

const handleClickDetail = (city) => {
  router.push('/weather/' + city.id)
}
</script>

<template>
  <div class="weather-parent">
    <h2>💜 오늘의 날씨 대시보드</h2>

    <BaseDashboardCard icon="🔍" title="도시 검색">
      <SearchBar :search-query="searchQuery" @update-query="handleUpdateQuery" />
    </BaseDashboardCard>

    <div class="sort-toggle">
      <button @click="toggleSort">
        🌡️ 온도 {{ isAscending ? '낮은순' : '높은순' }} 정렬 중 (클릭해서 전환)
      </button>
    </div>

    <BaseDashboardCard icon="📍" title="지역별 날씨 현황">
      <p v-if="isLoading" class="loading">날씨 정보를 불러오는 중...</p>
      <template v-else-if="filteredWeatherList.length > 0">
        <WeatherCard
          v-for="city in filteredWeatherList"
          :key="city.id"
          :city="city"
          @select-card="handleSelectCard"
          @click-detail="handleClickDetail"
        />
      </template>
      <p v-else class="no-result">🔍 일치하는 도시가 없습니다.</p>
    </BaseDashboardCard>

    <div class="status-bar">{{ selectedCityInfo }}</div>
  </div>
</template>

<style scoped>
.weather-parent {
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
.sort-toggle {
  text-align: center;
  margin-bottom: 14px;
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
.loading,
.no-result {
  text-align: center;
  padding: 24px;
  color: #a38fc7;
  font-weight: bold;
}
.status-bar {
  margin-top: 8px;
  padding: 14px;
  background: #e4d9f7;
  color: #4b2e83;
  border-radius: 16px;
  text-align: center;
  font-weight: bold;
}
</style>
