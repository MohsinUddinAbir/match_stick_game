<template>
	<div class="stick" :style="'top:'+top+'px;left:'+left+'px; transform: rotate('+rotate+'deg)'">
		<img v-if="has_stick" class="stick-img" src="../assets/images/matchstick.png">
		<div class="stick-slot"></div>
	</div>
</template>

<script>
export default {
    name: 'hand-stick',
    props: ['top', 'left', 'rotate', 'stick'],
    data() {
        return {
		has_stick: this.stick
	}
    },
}
</script>
