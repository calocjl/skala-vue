<script setup>
import { computed } from 'vue'
import { useConfigStore } from '@/stores/configStore'

// 선택된 도시 객체를 전달받아 표시 (props)
const props = defineProps({
  city: { type: Object, required: true },
})

// 카드를 선택하는 것(select-card 이벤트)과 상세보기(click-detail 이벤트)를 부모에게 전달 (emits)
const emit = defineEmits(['select-card', 'click-detail'])

const configStore = useConfigStore()

const displayTemp = computed(() => {
  const rawTemp = props.city.temp
  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32)
  }
  return rawTemp
})
</script>

<template>
  <div class="weather-card" @click="emit('select-card', city.name)">
    <span v-if="city.temp >= 25" class="badge hot">🔥 더움</span>
    <span v-else class="badge cool">❄️ 선선</span>

    <p class="city-name">{{ city.name }}</p>
    <p class="city-status">{{ city.status }}</p>
    <p class="city-temp">{{ displayTemp }}{{ configStore.unitSymbol }}</p>

    <button class="detail-btn" @click.stop="emit('click-detail', city)">자세히 보기</button>
  </div>
</template>

<style scoped>
.weather-card {
  position: relative;
  background: #faf7ff;
  border: 1px solid #ece2fa;
  border-radius: 20px;
  padding: 18px;
  margin-bottom: 12px;
  cursor: pointer;
  transition:
    transform 0.15s,
    box-shadow 0.15s;
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
</style>
