<script setup>
const props = defineProps({
  status: { type: String, default: '' },
  temp: { type: Number, default: 20 },
})

const mascotData = {
  rain: { emoji: '🐸', message: '비 오는 날엔 저처럼 신나게!' },
  snow: { emoji: '⛄', message: '눈사람이 되고 싶어요!' },
  cloud: { emoji: '🐑', message: '구름처럼 몽실몽실~' },
  hot: { emoji: '🦥', message: '더워서 늘어져요...' },
  cold: { emoji: '🐧', message: '펭귄은 이 정도는 거뜬해요' },
  default: { emoji: '🐥', message: '오늘도 좋은 하루 보내세요!' },
}

const current = (() => {
  if (props.status.includes('비')) return mascotData.rain
  if (props.status.includes('눈')) return mascotData.snow
  if (props.status.includes('구름') || props.status.includes('흐림')) return mascotData.cloud
  if (props.temp >= 28) return mascotData.hot
  if (props.temp <= 5) return mascotData.cold
  return mascotData.default
})()
</script>

<template>
  <div class="mascot-box">
    <div class="mascot-emoji">{{ current.emoji }}</div>
    <p class="mascot-message">{{ current.message }}</p>
  </div>
</template>

<style scoped>
.mascot-box {
  background: white;
  border-radius: 24px;
  padding: 24px;
  text-align: center;
  box-shadow: 0 4px 14px rgba(108, 74, 182, 0.08);
}
.mascot-emoji {
  font-size: 64px;
  animation: bounce 2s ease-in-out infinite;
}
.mascot-message {
  margin-top: 8px;
  color: #6c4ab6;
  font-weight: 600;
  font-size: 14px;
}
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
</style>