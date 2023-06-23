'use strict'

const mesher = {

  stages : [],
  first_strings : [],
  next_strings : [],
  mutations : [],
  amplitude : undefined,
  stages : [],
  diffs  : [],

  multi_string_enmesh : function (
    first_strings,
    next_strings,
    amplitude
  ) {
    if (!amplitude) {
      this.amplitude = 0.33
    } else {
      this.amplitude = amplitude
    }

    this.first_strings = first_strings
    this.next_strings = first_strings
    this.mutations = first_strings

    for (var i = 0; i < first_strings.length; i++) {
      this.get_line_stages(first_strings[i],next_strings[i],i)
    }
    console.log('rows')
    console.log(this.first_strings.length)
    for (var row_index = 0; row_index < this.first_strings.length; row_index++) {
      console.log('row index')
      console.log(row_index)
      //for (var stage_index = 0; stage_index < this.stages[row_index].scramble.length; stage_index++ ) {
      var scramble_stage_index = 0
      var this_row_index = row_index
      var scramble_interval = setInterval( function () {
        console.log('row index')
        console.log(this_row_index)
        for (var char_swap_index = 0; char_swap_index < mesher.stages[this_row_index].scramble[scramble_stage_index].next_chars.length; char_swap_index++) {
          var swap_char = mesher.stages[this_row_index].scramble[scramble_stage_index].next_chars[char_swap_index]
          var swap_index = mesher.stages[this_row_index].scramble[scramble_stage_index].str_indices[char_swap_index]
          mesher.mutations[this_row_index] = mesher.mutations[this_row_index].substring(0,swap_index) + swap_char + mesher.mutations[this_row_index].substring(swap_index+1)
        //  if (document.querySelectorAll('.line-span')[this_row_index].querySelectorAll('.char-span')[swap_index].innerText!=swap_char) {
            mesher.swap_chars( this_row_index, swap_index, swap_char, true, 0, 0)
        //  }
        }
        console.log(mesher.mutations[this_row_index])
        scramble_stage_index++
        if (scramble_stage_index >= mesher.stages[this_row_index].scramble.length) {
          clearInterval(scramble_interval)
          var unscramble_stage_index = 0
          var unscramble_interval = setInterval( function () {
            for (var char_swap_index = 0; char_swap_index < mesher.stages[this_row_index].unscramble[unscramble_stage_index].next_chars.length; char_swap_index++) {
              var swap_char = mesher.stages[this_row_index].unscramble[unscramble_stage_index].next_chars[char_swap_index]
              var swap_index = mesher.stages[this_row_index].unscramble[unscramble_stage_index].str_indices[char_swap_index]
              mesher.mutations[this_row_index] = (mesher.mutations[this_row_index].substring(0,swap_index) + swap_char + mesher.mutations[this_row_index].substring(swap_index+1) ).slice(0, mesher.next_strings[this_row_index].length)
              //if (document.querySelectorAll('.line-span')[this_row_index].querySelectorAll('.char-span')[swap_index].innerText!=swap_char) {
                mesher.swap_chars( this_row_index, swap_index, swap_char, true, 0, 0)
              //}
            }
            console.log(mesher.mutations[this_row_index])
            unscramble_stage_index++
            if (unscramble_stage_index >= mesher.stages[this_row_index].unscramble.length) {
              clearInterval(unscramble_interval)
            }
          },600)
        }
      },600)
      //}
      //for (var stage_index = 0; stage_index < this.stages[row_index].unscramble.length;stage_index++) {

      //}
    }
  },

  get_line_stages : function (first_string,next_string,row_index) {

    this.stages[row_index] = { scramble: [], unscramble: [] }

    for (var char_index = 0; char_index < first_string.length; char_index++) {
      var stage = { next_chars: [], str_indices: [] }
      for (var stage_index = 0; stage_index < char_index; stage_index++) {
        if (char_index%2) {
          var this_index = Math.floor(Math.random()*next_string.length)
          stage.next_chars.push(next_string[this_index])
          stage.str_indices.push(this_index)
        } else {
          var char = next_string[ Math.floor(Math.random()*next_string.length) ]
          var index = Math.floor(Math.random()*first_string.length)
          stage.next_chars.push(char)
          stage.str_indices.push(index)
        }
      }
      this.stages[row_index].scramble.push(stage)
    }
    for (var char_index = 0; char_index < next_string.length; char_index++) {
      var stage = { next_chars: [], str_indices: [] }
      var randoms = []
      for (var rand_index = 0; rand_index < char_index; rand_index++) {
        var this_rand = Math.floor(Math.random() * next_string.length)
        randoms[this_rand] = this_rand
      }
      for (var stage_index = 0; stage_index < next_string.length; stage_index++) {
        if (randoms[stage_index]>-1) {
          if (char_index%2) {
            var this_index = Math.floor(Math.random()*first_string.length)
            stage.next_chars.push(first_string[this_index])
            stage.str_indices.push(this_index)
          } else {
            var char = first_string[ Math.floor(Math.random()*first_string.length) ]
            var index = Math.floor(Math.random()*next_string.length)
            stage.next_chars.push(char)
            stage.str_indices.push(index)
          }
        } else {
          stage.next_chars.push(next_string[stage_index])
          stage.str_indices.push(stage_index)
        }
      }
      if ((first_string.length - next_string.length)>0) {
        for (var diff_index = 0; diff_index < first_string.length - next_string.length; diff_index++) {
          stage.next_chars.push('')
          stage.str_indices.push(diff_index + next_string.length)
        }
      }
      this.stages[row_index].unscramble.push(stage)
    }
    this.stages[row_index].unscramble.reverse()
  },

  swap_chars : function ( line_index, span_index, replacement_char, fade_effect, increment, interval) {

    if ( document.querySelectorAll('.line-span')[line_index] &&
      document.querySelectorAll('.line-span')[line_index].querySelectorAll('.char-span')[span_index] ) {

      var el = document.querySelectorAll('.line-span')[line_index].querySelectorAll('.char-span')[span_index]

      if (fade_effect) {
        var fadeout
        var fadein
        var i = 1
        increment = increment ? increment: 0.0125
        interval = interval ? interval : 5
        fadeout = setInterval( function () {
          el.style.opacity = i
          i -= increment
          if (i <= 0) {
            i = 0
            clearInterval(fadeout)
            el.innerText = replacement_char
            fadein = setInterval( function () {
              el.style.opacity = i
              i += increment
              if (i >= 1) {
                i = 1
                clearInterval(fadein)
              }
            }, interval)
          }
        }, interval)

      } else {
        el.innerText = replacement_char
      }

    } else {
      console.log('invalid element indices')
      console.log(line_index)
      console.log(span_index)
      console.log()
    }
  }
}
