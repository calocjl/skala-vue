<script setup>
import { ref, watch } from 'vue'
import axios from 'axios'

const props = defineProps({
  lat: { type: Number, default: null },
  lon: { type: Number, default: null },
})

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const hourlyList = ref([])
const isLoading = ref(false)

const fetchHourly = async () => {
  if (props.lat === null) return
  isLoading.value = true
  try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
      params: { lat: props.lat, lon: props.lon, appid: API_KEY, units: 'metric', lang: 'kr' },
    })
    hourlyList.value = response.data.list.slice(0, 6).map((item) => ({
      time: item.dt_txt.slice(11, 16),
      temp: Math.round(item.main.temp),
    }))
  } catch (error) {
    console.error('시간별예보 조회 실패:', error)
  } finally {
    isLoading.value = false
  }
}

watch(() => [props.lat, props.lon], fetchHourly, { immediate: true })
</script>

<template>
  <div class="forecast-box">
    <p class="forecast-title">⏰ 오늘 시간별 예보</p>
    <el-skeleton v-if="isLoading" :rows="3" animated />
    <el-scrollbar v-else height="80px">
      <div class="hourly-row">
        <div v-for="hour in hourlyList" :key="hour.time" class="hourly-item">
          <span class="hour-label">{{ hour.time }}</span>
          <span class="hour-temp">{{ hour.temp }}°</span>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<style scoped>
.forecast-box {
  background: white;
  border-radius: 24px;
  padding: 20px;
  margin-bottom: 14px;
  box-shadow: 0 4px 14px rgba(108, 74, 182, 0.08);
}
.forecast-title {
  color: #6c4ab6;
  font-weight: 700;
  margin: 0 0 12px;
}
.hourly-row {
  display: flex;
  gap: 16px;
}
.hourly-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: #4b2e83;
  flex-shrink: 0;
}
.hour-label {
  color: #8a6fc7;
}
.hour-temp {
  font-weight: bold;
}
</style>