<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useConfigStore } from '@/stores/configStore'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const configStore = useConfigStore()
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

const cityEngNameMap = {
  city_01: 'Jeju',
  city_02: 'Gangneung',
  city_03: 'Daejeon',
  city_04: 'Seoul',
  city_05: 'Busan',
  city_06: 'Incheon',
  city_07: 'Gwangju',
  city_08: 'Jeonju',
}
const cityKoreanNameMap = {
  city_01: '제주',
  city_02: '강릉',
  city_03: '대전',
  city_04: '서울',
  city_05: '부산',
  city_06: '인천',
  city_07: '광주',
  city_08: '전주',
}

const cityDetail = ref(null)
const isLoading = ref(true)

onMounted(async () => {
  const cityId = route.params.cityId
  const engName = cityEngNameMap[cityId]

  if (!engName) {
    isLoading.value = false
    return
  }

  try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: { q: engName, appid: API_KEY, units: 'metric', lang: 'kr' },
    })

    cityDetail.value = {
      name: cityKoreanNameMap[cityId],
      temp: Math.round(response.data.main.temp),
      status: response.data.weather[0].description,
    }
  } catch (error) {
    console.error('상세 날씨 API 호출 실패:', error)
  } finally {
    isLoading.value = false
  }
})

const displayTemp = computed(() => {
  if (!cityDetail.value) return null
  const rawTemp = cityDetail.value.temp
  return configStore.unit === 'fahrenheit' ? Math.round((rawTemp * 9) / 5 + 32) : rawTemp
})
</script>

<template>
  <div class="detail-wrapper">
    <p v-if="isLoading">불러오는 중...</p>
    <div v-else-if="cityDetail" class="detail-card">
      <h2>{{ cityDetail.name }} 상세 날씨</h2>
      <p class="temp">{{ displayTemp }}{{ configStore.unitSymbol }}</p>
      <p>날씨 상태: {{ cityDetail.status }}</p>
    </div>
    <p v-else>해당 도시 정보를 찾을 수 없습니다. (cityId: {{ route.params.cityId }})</p>

    <button @click="router.push('/')">메인으로 돌아가기</button>
  </div>
</template>

<style scoped>
.detail-wrapper {
  max-width: 400px;
  margin: 40px auto;
  padding: 24px;
  background: white;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 4px 14px rgba(108, 74, 182, 0.1);
}
.detail-card h2 {
  color: #6c4ab6;
}
.temp {
  font-size: 32px;
  font-weight: bold;
  color: #4b2e83;
}
button {
  margin-top: 16px;
  padding: 8px 16px;
  border: none;
  border-radius: 999px;
  background: #6c4ab6;
  color: white;
  font-weight: bold;
  cursor: pointer;
}
</style>
