<template>
    <div>
        <hand-stick ref="hand" :stick="is_hand" :top="60" :left="40" :rotate="0"></hand-stick>
        <div class="move-count">Gerakkan: {{move}}</div> <button @click="reset" class="retry-btn"><img width="20" height="20" src="../assets/images/retry.svg"></button>
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
</template>

<script>
import Swal from 'sweetalert2'
import HandStick from './HandStick.vue'
import MatchStick from './MatchStick.vue'

export default {
    name: 'first-board', 
    components: {
        HandStick,
        MatchStick
    },
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
                Swal.fire({
                    title: "BETUL",
                    text: "Tahniah!  Jawapan anda betul.",
                    icon: "success",
                    buttons: ["Tutup", "Seterusnya"],
                })
                    .then((ok) => {
                        if (ok) {
                            this.$emit('set-level', {complete: 1, board: 2});
                        }
                    });
            } else {
                if (this.move >= this.max_move) {
                    this.can_move = false;
                    Swal.fire({
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
    }
}
</script>
