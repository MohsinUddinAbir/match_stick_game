Vue.component('match-stick', {
    props: ['top', 'left', 'rotate', 'is_hand'],
    template: `
        <div class="stick" @click="pick_drop_stick" :style="'top:'+top+'px;left:'+left+'px; transform: rotate('+rotate+'deg)'">
            <img v-if="has_stick" class="stick-img" src="images/matchstick.png">
            <div class="stick-slot"></div>
        </div>
    `,
    data() {
        return {
            has_stick: false
        }
    },
    methods: {
        pick_drop_stick() {
            if (!this.is_hand) {
                if (this.has_stick) {
                    this.has_stick = false;
                    this.$emit('picked', true);
                } 
            }else {
                if (!this.has_stick) {
                    this.has_stick = true;
                    this.$emit('picked', false);
                }
            }
        }
    }
});

Vue.component('hand-stick', {
    props: ['top', 'left', 'rotate', 'stick'],
    template: `
        <div class="stick" :style="'top:'+top+'px;left:'+left+'px; transform: rotate('+rotate+'deg)'">
            <img v-if="has_stick" class="stick-img" src="images/matchstick.png">
            <div class="stick-slot"></div>
        </div>
    `,
    data() {
        return {
            has_stick: this.stick
        }
    },
});

Vue.component('board-1', {
    template: `
        <div>
            <hand-stick ref="hand" :stick="is_hand" :top="40" :left="20" :rotate="0"></hand-stick>
            <div class="move-count">Move: {{move}}</div> <button @click="reset" class="retry-btn"><img width="20" height="20" src="images/retry.svg"></button>

            <match-stick ref="stick_1" @picked="picked" :is_hand="is_hand" :top="360" :left="190" :rotate="90"></match-stick>
            <match-stick ref="stick_2" @picked="picked" :is_hand="is_hand" :top="450" :left="100" :rotate="180"></match-stick>
            <match-stick ref="stick_3" @picked="picked" :is_hand="is_hand" :top="360" :left="10" :rotate="-90"></match-stick>
            <match-stick ref="stick_4" @picked="picked" :is_hand="is_hand" :top="270" :left="100" :rotate="0"></match-stick>
            <match-stick ref="stick_5" @picked="picked" :is_hand="is_hand" :top="215" :left="245" :rotate="-45"></match-stick>
            <match-stick ref="stick_6" @picked="picked" :is_hand="is_hand" :top="150" :left="320" :rotate="45"></match-stick>
        </div>
    `,
    data() {
        return {
            is_hand: false,
            move: 0,
            max_move: 1,
            is_correct: false,
            correct_condition: [true, false, true, true, true, true],
            primary_condition: [true, true, false, true, true, true],
        }
    },
    mounted() {
        this.reset();
    },
    methods: {
        picked(val) {
            this.is_hand = val;
            this.$refs.hand.has_stick = val;
            if (val == false) {
                this.move += 1;
                this.check_answer();
            }
        },
        check_answer() {
            let vals = [
                this.$refs.stick_1.has_stick, this.$refs.stick_2.has_stick, this.$refs.stick_3.has_stick,
                this.$refs.stick_4.has_stick, this.$refs.stick_5.has_stick, this.$refs.stick_6.has_stick,
            ];
            if (JSON.stringify(this.correct_condition)==JSON.stringify(vals)) {
                this.is_correct = true;
                swal({
                        title: "You win",
                        text: "Your answer is correct!",
                        icon: "success",
                        buttons: ["Cancel", "Reset"],
                    })
                    .then((ok) => {
                        if (ok) {
                            this.reset();
                        }
                });
            } else {
                this.is_correct = false;
            }
        },
        reset() {
            this.$refs.stick_1.has_stick = this.primary_condition[0];
            this.$refs.stick_2.has_stick = this.primary_condition[1];
            this.$refs.stick_3.has_stick = this.primary_condition[2];
            this.$refs.stick_4.has_stick = this.primary_condition[3];
            this.$refs.stick_5.has_stick = this.primary_condition[4];
            this.$refs.stick_6.has_stick = this.primary_condition[5];
            this.move = 0;
        }
    },
});

Vue.component('board-2', {
    template: `
        <div>
            <hand-stick ref="hand" :stick="is_hand" :top="40" :left="20" :rotate="0"></hand-stick>
            <div class="move-count">Move: {{move}}</div> <button @click="reset" class="retry-btn"><img width="20" height="20" src="images/retry.svg"></button>
            
            <match-stick ref="stick_1"  @picked="picked" :is_hand="is_hand" :top="540" :left="170" :rotate="45"></match-stick>
            <match-stick ref="stick_2"  @picked="picked" :is_hand="is_hand" :top="420" :left="50" :rotate="45"></match-stick>
            <match-stick ref="stick_3"  @picked="picked" :is_hand="is_hand" :top="425" :left="295" :rotate="45"></match-stick>
            <match-stick ref="stick_4"  @picked="picked" :is_hand="is_hand" :top="300" :left="170" :rotate="45"></match-stick>
            <match-stick ref="stick_5"  @picked="picked" :is_hand="is_hand" :top="180" :left="50" :rotate="45"></match-stick>
            <match-stick ref="stick_6"  @picked="picked" :is_hand="is_hand" :top="175" :left="295" :rotate="45"></match-stick>
            <match-stick ref="stick_7"  @picked="picked" :is_hand="is_hand" :top="55" :left="175" :rotate="45"></match-stick>
            <match-stick ref="stick_8"  @picked="picked" :is_hand="is_hand" :top="420" :left="170" :rotate="-45"></match-stick>
            <match-stick ref="stick_9"  @picked="picked" :is_hand="is_hand" :top="300" :left="50" :rotate="-45"></match-stick>
            <match-stick ref="stick_10" @picked="picked" :is_hand="is_hand" :top="300" :left="290" :rotate="-45"></match-stick>
            <match-stick ref="stick_11" @picked="picked" :is_hand="is_hand" :top="180" :left="170" :rotate="-45"></match-stick>
        </div>
    `,
    data() {
        return {
            is_hand: false,
            move: 0,
            max_move: 1,
            is_correct: false,
            correct_condition: [true, true, true, true, false, false, false, true, true, true, true],
            primary_condition: [false, false, false, true, true, true, true, true, true, true, true],
        }
    },
    mounted() {
        this.reset();
    },
    methods: {
        picked(val) {
            this.is_hand = val;
            this.$refs.hand.has_stick = val;
            if (val == false) {
                this.move += 1;
                this.check_answer();
            }
        },
        check_answer() {
            let vals = [
                this.$refs.stick_1.has_stick, this.$refs.stick_2.has_stick, this.$refs.stick_3.has_stick,
                this.$refs.stick_4.has_stick, this.$refs.stick_5.has_stick, this.$refs.stick_6.has_stick,
                this.$refs.stick_7.has_stick, this.$refs.stick_8.has_stick, this.$refs.stick_9.has_stick,
                this.$refs.stick_10.has_stick, this.$refs.stick_11.has_stick,
            ];
            if (JSON.stringify(this.correct_condition)==JSON.stringify(vals)) {
                this.is_correct = true;
                swal({
                        title: "You win",
                        text: "Your answer is correct!",
                        icon: "success",
                        buttons: ["Cancel", "Reset"],
                    })
                    .then((ok) => {
                        if (ok) {
                            this.reset();
                        }
                });
            } else {
                this.is_correct = false;
            }
        },
        reset() {
            this.$refs.stick_1.has_stick = this.primary_condition[0];
            this.$refs.stick_2.has_stick = this.primary_condition[1];
            this.$refs.stick_3.has_stick = this.primary_condition[2];
            this.$refs.stick_4.has_stick = this.primary_condition[3];
            this.$refs.stick_5.has_stick = this.primary_condition[4];
            this.$refs.stick_6.has_stick = this.primary_condition[5];
            this.$refs.stick_7.has_stick = this.primary_condition[6];
            this.$refs.stick_8.has_stick = this.primary_condition[7];
            this.$refs.stick_9.has_stick = this.primary_condition[8];
            this.$refs.stick_10.has_stick = this.primary_condition[9];
            this.$refs.stick_11.has_stick = this.primary_condition[10];
            this.move = 0;
        }
    },
});

var app = new Vue({
    el: '#app',
    data: {
        board: 1
    },
})
