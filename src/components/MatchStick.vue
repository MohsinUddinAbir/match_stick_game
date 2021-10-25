<template>
    <div class="stick" @click="pick_drop_stick" :style="'top:'+top+'px;left:'+left+'px; transform: rotate('+rotate+'deg)'">
                <img v-if="has_stick" class="stick-img" src="../assets/images/matchstick.png">
            <div class="stick-slot"></div>
        </div>
</template>

<script>
export default {
	name: 'match-stick',
    props: ['top', 'left', 'rotate', 'is_hand', 'can_move'],
    data() {
        return {
            has_stick: false
        }
    },
    methods: {
        pick_drop_stick() {
            if (this.can_move) {
                if (!this.is_hand) {
                    if (this.has_stick) {
                        this.has_stick = false;
                        this.$emit('picked', true);
                    }
                } else {
                    if (!this.has_stick) {
                        this.has_stick = true;
                        this.$emit('picked', false);
                    }
                }
            }

        }
    }
}
</script>