<template>
	<div>
		<hand-stick ref="hand" :stick="is_hand" :top="60" :left="40" :rotate="0"></hand-stick>
		<div class="move-count">Gerakkan: {{move}}</div> <button @click="reset" class="retry-btn"><img width="20" height="20" src="../assets/images/retry.svg"></button>
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
</template>

<script>
import Swal from 'sweetalert2'
import HandStick from './HandStick.vue'
import MatchStick from './MatchStick.vue'

export default {
    name: 'second-board',
	components: {
		HandStick,
		MatchStick
	},
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
                Swal.fire({
                    title: "BETUL",
                    text: "Tahniah!  Jawapan anda betul.",
                    icon: "success",
                    buttons: ["Tutup", "Selesai"],
                })
                    .then((ok) => {
                        if (ok) {
                            Swal.fire({
                                title: "TAHNIAH",
                                text: "Anda berjaya!",
                                icon: "success",
                                buttons: ["Tutup", "Semula"],
                            })
                                .then(() => {
                        			this.$emit('set-level', {complete: 0, board: 1});
									setTimeout(() => {
										const event = new Event('game-win');
										document.dispatchEvent(event);
									}, 500)
                                });
                            this.reset();
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
            for (let i = 0; i < 12; i++) {
                this.$refs['stick_' + i].has_stick = this.primary_condition[i];
            }
            this.move = 0;
            this.can_move = true;
        }
    },
}
</script>

