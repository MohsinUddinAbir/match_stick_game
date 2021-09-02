Vue.component('match-stick', {
    props: ['top', 'left', 'rotate', 'is_hand', 'can_move'],
    template: `
        <div class="stick" @click="pick_drop_stick" :style="'top:'+top+'px;left:'+left+'px; transform: rotate('+rotate+'deg)'">
            <!-- <transition name="bounce"> -->
                <img v-if="has_stick" class="stick-img" src="images/matchstick.png">
            <!-- </transition> -->
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
            if (this.can_move) {
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

Vue.component('board-2', {
    template: `
        <div>
            <hand-stick ref="hand" :stick="is_hand" :top="60" :left="40" :rotate="0"></hand-stick>
            <div class="move-count">Gerakkan: {{move}}</div> <button @click="reset" class="retry-btn"><img width="20" height="20" src="images/retry.svg"></button>
            <div class="box2">
                <match-stick ref="stick_0" @picked="picked" :is_hand="is_hand" :can_move="can_move" :top="125" :left="425" :rotate="45"></match-stick>
                <match-stick ref="stick_1" @picked="picked" :is_hand="is_hand" :can_move="can_move" :top="175" :left="365" :rotate="-45"></match-stick>
                
                <match-stick ref="stick_2" @picked="picked" :is_hand="is_hand" :can_move="can_move" :top="300" :left="70" :rotate="90"></match-stick>
                <match-stick ref="stick_3" @picked="picked" :is_hand="is_hand" :can_move="can_move" :top="300" :left="195" :rotate="90"></match-stick>
                <match-stick ref="stick_4" @picked="picked" :is_hand="is_hand" :can_move="can_move" :top="300" :left="325" :rotate="90"></match-stick>
                <match-stick ref="stick_5" @picked="picked" :is_hand="is_hand" :can_move="can_move" :top="300" :left="460" :rotate="90"></match-stick>

                <match-stick ref="stick_6" @picked="picked" :is_hand="is_hand" :can_move="can_move" :top="230" :left="130" :rotate="0"></match-stick>
                <match-stick ref="stick_7" @picked="picked" :is_hand="is_hand" :can_move="can_move" :top="230" :left="260" :rotate="0"></match-stick>
                <match-stick ref="stick_8" @picked="picked" :is_hand="is_hand" :can_move="can_move" :top="230" :left="390" :rotate="0"></match-stick>
                <match-stick ref="stick_9" @picked="picked" :is_hand="is_hand" :can_move="can_move" :top="370" :left="130" :rotate="0"></match-stick>
                <match-stick ref="stick_10" @picked="picked" :is_hand="is_hand" :can_move="can_move" :top="370" :left="260" :rotate="0"></match-stick>
                <match-stick ref="stick_11" @picked="picked" :is_hand="is_hand" :can_move="can_move" :top="370" :left="390" :rotate="0"></match-stick>
            </div>
            <div class="guide_text">Gerakkan <b>1 batang</b> mancis <br/> untuk menukar arah</div>
        </div>
    `,
    data() {
        return {
            is_hand: false,
            move: 0,
            max_move: 1,
            can_move: true,
            correct_condition: [true, true, false, false, true, false, false, true, false, false, true, false],
            primary_condition: [true, true, false, true, true, false, false, true, false, false, false, false],
        }
    },
    mounted() {
        this.reset();
    },
    methods: {
        picked(val) {
            if (this.can_move) {
                this.is_hand = val;
                this.$refs.hand.has_stick = val;
                if (val == false) {
                    this.move += 1;
                    this.check_answer();
                }
            }
        },
        check_answer() {
            let vals = [];
            for (let i = 0; i < 12; i++) {
                vals.push(this.$refs['stick_' + i].has_stick);
            }
            if (JSON.stringify(this.correct_condition) == JSON.stringify(vals)) {
                this.can_move = false;
                swal({
                    title: "BETUL",
                    text: "Tahniah!  Jawapan anda betul.",
                    icon: "success",
                    buttons: ["Tutup", "Selesai"],
                })
                .then((ok) => {
                    if (ok) {
                        swal({
                            title: "TAHNIAH",
                            text: "Anda berjaya!",
                            icon: "success",
                            buttons: ["Tutup", "Semula"],
                        })
                        .then((ok) => {
                            app.$data.complete = 0;
                            app.$data.board = 1;
                        });
                        this.reset();
                    }
                });
            } else {
                if (this.move >= this.max_move) {
                    this.can_move = false;
                    swal({
                            title: "SALAH",
                            text: "Jawapan anda salah, Sila cuba lagi.",
                            icon: "error",
                            buttons: ["Tutup", "Semula"],
                        })
                        .then((ok) => {
                            if (ok) {
                                this.reset();
                            }
                    });
                }
            }
        },
        reset() {
            for (let i = 0; i < 12; i++) {
                this.$refs['stick_' + i].has_stick = this.primary_condition[i];
            }
            this.move = 0;
            this.can_move = true;
        }
    },
});

Vue.component('board-1', {
    template: `
        <div>
            <hand-stick ref="hand" :stick="is_hand" :top="60" :left="40" :rotate="0"></hand-stick>
            <div class="move-count">Gerakkan: {{move}}</div> <button @click="reset" class="retry-btn"><img width="20" height="20" src="images/retry.svg"></button>
            
            <div class="box">
                <match-stick ref="stick_0"  @picked="picked" :can_move="can_move" :is_hand="is_hand" :top="540" :left="220" :rotate="45"></match-stick>
                <match-stick ref="stick_1"  @picked="picked" :can_move="can_move" :is_hand="is_hand" :top="450" :left="130" :rotate="45"></match-stick>
                <match-stick ref="stick_2"  @picked="picked" :can_move="can_move" :is_hand="is_hand" :top="360" :left="40" :rotate="45"></match-stick>
                
                <match-stick ref="stick_3"  @picked="picked" :can_move="can_move" :is_hand="is_hand" :top="450" :left="310" :rotate="45"></match-stick>
                <match-stick ref="stick_4"  @picked="picked" :can_move="can_move" :is_hand="is_hand" :top="360" :left="220" :rotate="45"></match-stick>
                <match-stick ref="stick_5"  @picked="picked" :can_move="can_move" :is_hand="is_hand" :top="270" :left="130" :rotate="45"></match-stick>

                <match-stick ref="stick_6"  @picked="picked" :can_move="can_move" :is_hand="is_hand" :top="360" :left="400" :rotate="45"></match-stick>
                <match-stick ref="stick_7"  @picked="picked" :can_move="can_move" :is_hand="is_hand" :top="270" :left="310" :rotate="45"></match-stick>
                <match-stick ref="stick_8"  @picked="picked" :can_move="can_move" :is_hand="is_hand" :top="180" :left="220" :rotate="45"></match-stick>

                <match-stick ref="stick_9"  @picked="picked" :can_move="can_move" :is_hand="is_hand" :top="270" :left="490" :rotate="45"></match-stick>
                <match-stick ref="stick_10"  @picked="picked" :can_move="can_move" :is_hand="is_hand" :top="180" :left="400" :rotate="45"></match-stick>
                <match-stick ref="stick_11"  @picked="picked" :can_move="can_move" :is_hand="is_hand" :top="90" :left="310" :rotate="45"></match-stick>

            
                <match-stick ref="stick_12"  @picked="picked" :can_move="can_move" :is_hand="is_hand" :top="540" :left="310" :rotate="-45"></match-stick>
                <match-stick ref="stick_13"  @picked="picked" :can_move="can_move" :is_hand="is_hand" :top="450" :left="220" :rotate="-45"></match-stick>
                <match-stick ref="stick_14"  @picked="picked" :can_move="can_move" :is_hand="is_hand" :top="360" :left="130" :rotate="-45"></match-stick>
                <match-stick ref="stick_15"  @picked="picked" :can_move="can_move" :is_hand="is_hand" :top="270" :left="40" :rotate="-45"></match-stick>
                
                <match-stick ref="stick_16"  @picked="picked" :can_move="can_move" :is_hand="is_hand" :top="450" :left="400" :rotate="-45"></match-stick>
                <match-stick ref="stick_17"  @picked="picked" :can_move="can_move" :is_hand="is_hand" :top="360" :left="310" :rotate="-45"></match-stick>
                <match-stick ref="stick_18"  @picked="picked" :can_move="can_move" :is_hand="is_hand" :top="270" :left="220" :rotate="-45"></match-stick>
                <match-stick ref="stick_19"  @picked="picked" :can_move="can_move" :is_hand="is_hand" :top="180" :left="130" :rotate="-45"></match-stick>

                <match-stick ref="stick_20"  @picked="picked" :can_move="can_move" :is_hand="is_hand" :top="360" :left="490" :rotate="-45"></match-stick>
                <match-stick ref="stick_21"  @picked="picked" :can_move="can_move" :is_hand="is_hand" :top="270" :left="400" :rotate="-45"></match-stick>
                <match-stick ref="stick_22"  @picked="picked" :can_move="can_move" :is_hand="is_hand" :top="180" :left="310" :rotate="-45"></match-stick>
                <match-stick ref="stick_23"  @picked="picked" :can_move="can_move" :is_hand="is_hand" :top="90" :left="220" :rotate="-45"></match-stick>
            </div>
            <div class="guide_text">Gerakkan <b>3 batang</b> mancis <br/> untuk menukar arah</div>
        </div>
    `,
    data() {
        return {
            is_hand: false,
            move: 0,
            max_move: 3,
            can_move: true,
            correct_condition: [false, false, false, true, true, false, true, true, false, false, false, false, false, false, false, false, false, true, true, false, false, true, true, false],
            primary_condition: [false, false, false, false, false, false, false, true, true, false, true, true, false, false, false, false, false, true, true, false, false, true, true, false],
        }
    },
    mounted() {
        this.reset();
    },
    methods: {
        picked(val) {
            if (this.can_move) {
                this.is_hand = val;
                this.$refs.hand.has_stick = val;
                if (val == false) {
                    this.move += 1;
                    this.check_answer();
                }
            }
        },
        check_answer() {
            let vals = [];
            for (let i = 0; i < 24; i++) {
                vals.push(this.$refs['stick_' + i].has_stick);
            }
            if (JSON.stringify(this.correct_condition) == JSON.stringify(vals)) {
                this.can_move = false;
                swal({
                        title: "BETUL",
                        text: "Tahniah!  Jawapan anda betul.",
                        icon: "success",
                        buttons: ["Tutup", "Seterusnya"],
                    })
                    .then((ok) => {
                        if (ok) {
                            app.$data.complete = 1;
                            app.$data.board = 2;
                        }
                });
            } else {
                if (this.move >= this.max_move) {
                    this.can_move = false;
                    swal({
                            title: "SALAH",
                            text: "Jawapan anda salah, Sila cuba lagi.",
                            icon: "error",
                            buttons: ["Tutup", "Semula"],
                        })
                        .then((ok) => {
                            if (ok) {
                                this.reset();
                            }
                    });
                }
            }
        },
        reset() {
            for (let i = 0; i < 24; i++) {
                this.$refs['stick_' + i].has_stick = this.primary_condition[i];
            }
            this.move = 0;
            this.can_move = true;
        }
    },
});

var app = new Vue({
    el: '#app',
    data: {
        board: 1,
        complete: 0
    }
})
