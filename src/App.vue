<template>
	<div id="app">
		<div class="board" v-if="board==1">
			<first-board @set-level="setLevel"></first-board>

			<div class="board-select">
				<input type="radio" id="board-1" name="board" v-model="board" value="1"> <label for="board-1"> Kuiz
					1</label>
				<input type="radio" id="board-2" name="board" v-model="board" value="2" :disabled="!complete"> <label
					for="board-2"> Kuiz 2</label>
			</div>
		</div>

		<div class="board2" v-else-if="board==2">
			<second-board @set-level="setLevel"></second-board>

			<div class="board-select">
				<input type="radio" id="board-1" name="board" v-model="board" value="1"> <label for="board-1"> Kuiz
					1</label>
				<input type="radio" id="board-2" name="board" v-model="board" value="2" :disabled="!complete"> <label
					for="board-2"> Kuiz 2</label>
			</div>
		</div>
	</div>
</template>

<script>
import FirstBoard from './components/FirstBoard.vue'
import SecondBoard from './components/SecondBoard.vue'

export default {
	name: 'App',
	components: {
		FirstBoard,
		SecondBoard
	},
    data() {
		return {
			board: 1,
			complete: 0
		}
    },
	methods: {
		setLevel(data) {
			this.board = data.board
			this.complete = data.complete
		}
	}
}
</script>

<style src="./assets/game.css"></style>
