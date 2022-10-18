'use strict'

const mesher = {

  multi_string_enmesh : function (
    first_strings,
    next_strings,
    intervals,
    variance,
    text_elements_arr
  ) {
    var scramble_matrix = []
    var second_stage
    this.first_strings = first_strings
    this.next_strings = next_strings
    for (var i = 0; i < first_strings.length; i++) {
       this.enmesh_line(first_strings[i],next_strings[i],i)
    }
  },
  swap_chars : function ( line_index, span_index, replacement_char, fade_effect, increment, interval) {

    if ( document.querySelectorAll('.line-span')[line_index] &&
      document.querySelectorAll('.line-span')[line_index].querySelectorAll('.char-span')[span_index] ) {

      var el = document.querySelectorAll('.line-span')[line_index].querySelectorAll('.char-span')[span_index]

      if (fade_effect) {
        var fadeout
        var fadein
        var i = 1
        increment = increment ? increment: 0.025
        interval = interval ? interval : 66
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
  },

  replace_line : function (first_string,next_string,row_index) {
    var char_index = 0;
    var stage_length = first_string.length > next_string.length ? first_string.length : next_string.length
    var char_interval = setInterval(function() {

      var fallback_char = next_string[char_index] ? next_string[char_index] : ''

      mesher.swap_chars(
        row_index,
        char_index,
        fallback_char,
        true,
        0,
        0
      )
      char_index++
      if (char_index>=stage_length) {
        clearInterval(char_interval)
      }
    },500)
  },

  enmesh_line : function (first_string, next_string, row_index) {
    var line_matrix = []
    var stage_index = 0
    var stage_interval = setInterval(function() {
      var stage_matrix = { next_chars: [], first_indices: [] }
      var char_index = 0
      var char_interval = setInterval(function() {
        var mesher_stage

        var fallback_char = first_string[char_index] ? first_string[char_index] : next_string[char_index]
        stage_matrix.next_chars.push( next_string[ Math.floor(Math.random()*next_string.length) ])
        stage_matrix.first_indices.push( Math.floor(Math.random()*first_string.length) )

        mesher.swap_chars(
          row_index,
          Math.floor(Math.random()*first_string.length),
          next_string[ Math.floor(Math.random()*next_string.length) ],
          true,
          0,
          0
        )

        mesher_stage = setTimeout( function() {

          mesher.swap_chars(
            row_index,
            char_index,
            fallback_char,
            true,
            0,
            0
          )

        },750)

        char_index++
        if (char_index>=stage_index) {
          clearInterval(char_interval)
        }

      },500)
      line_matrix.push(stage_matrix)
      stage_index++
      if (stage_index>=first_string.length) {
        clearInterval(stage_interval)
        var cleanup_stage = setTimeout(function(){
          for (var i = 0; i < mesher.next_strings.length; i++) {
            mesher.replace_line(mesher.first_strings[i],mesher.next_strings[i],i)
          }
        },5000)
      }
    },500)
    return line_matrix
  }

}
