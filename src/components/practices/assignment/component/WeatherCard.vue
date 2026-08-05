<script setup>
import { computed } from 'vue'
import { useConfigStore } from '@/stores/configStore'
import { getWeatherTheme } from '@/utils/weatherTheme'

const props = defineProps({
  city: { type: Object, required: true },
})

const emit = defineEmits(['select-card', 'click-detail', 'remove-city'])

const configStore = useConfigStore()

const displayTemp = computed(() => {
  const rawTemp = props.city.temp
  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32)
  }
  return rawTemp
})

const weatherTheme = computed(() => getWeatherTheme(props.city.status, props.city.temp))
</script>

<template>
  <div
    class="weather-card"
    :style="{ background: weatherTheme.gradient }"
    @click="emit('select-card', city.name)"
  >
    <el-tooltip content="즐겨찾기에서 삭제" placement="top">
      <button class="remove-btn" @click.stop="emit('remove-city', city.id)">✕</button>
    </el-tooltip>

    <div class="card-icon">{{ weatherTheme.icon }}</div>
    <p class="city-name">{{ city.name }}</p>
    <p class="city-temp">{{ displayTemp }}°{{ configStore.unit === 'celsius' ? 'C' : 'F' }}</p>
    <span class="status-badge">{{ city.status }}</span>

    <button class="detail-btn" @click.stop="emit('click-detail', city)">자세히 보기</button>
  </div>
</template>

<style scoped>
.weather-card {
  position: relative;
  border-radius: 24px;
  padding: 22px;
  margin-bottom: 14px;
  cursor: pointer;
  color: white;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}
.weather-card:hover {
  transform: translateY(-3px) scale(1.01);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.22);
}
.remove-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.25);
  color: white;
  cursor: pointer;
  font-size: 12px;
  line-height: 1;
}
.remove-btn:hover {
  background: rgba(255, 255, 255, 0.45);
}
.card-icon {
  font-size: 40px;
  margin-bottom: 4px;
}
.city-name {
  font-size: 20px;
  font-weight: 700;
  margin: 4px 0 0;
}
.city-temp {
  font-size: 36px;
  font-weight: 800;
  margin: 2px 0;
  letter-spacing: -1px;
}
.status-badge {
  display: inline-block;
  padding: 4px 12px;
  background: rgba(255, 255, 255, 0.25);
  border-radius: 999px;
  font-size: 13px;
  margin-bottom: 16px;
}
.detail-btn {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(4px);
  color: white;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;
}
.detail-btn:hover {
  background: rgba(255, 255, 255, 0.35);
}
</style>