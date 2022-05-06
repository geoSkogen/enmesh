'use strict'

const mesher = {

  multi_string_enmesh : function (
    first_strings,
    next_strings,
    intervals,
    variance,
    text_elements_arr
  ) {

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
        fadein = setInterval( function () {
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
    }
  },

  enmesh_line : function (first_string, next_string) {
    var line_matrix = []
    for (var i = 0; i < first_string.length; i++) {
      var stage_matrix = { next_chars: [], first_indices: [] }
      for (var ii = 0; ii < i; ii++ ) {
        stage_matrix.next_chars.push( next_string[ Math.floor(Math.random()*next_string.length) ])
        stage_matrix.first_indices.push( Math.floor(Math.random()*first_string.length) )
      }
      line_matrix.push(stage_matrix)
    }

    return line_matrix
  },

  enmesh_line_text : function (line_matrix, line_index) {
    var n = 0
    line_matrix.forEach( (stage_matrix) => {

      var interval = setInterval( function () {
        for (var i = 0; i < stage_matrix.next_chars.length; i++) {
          console.log('')
          console.log('iteration of line matrix')
          console.log(i)
          if (stage_matrix.first_indices[i] && stage_matrix.next_chars[i]) {
            console.log('')
            console.log('stage matrix first index:')
            console.log(stage_matrix.first_indices[i])
            console.log('stage matrix next char:')
            console.log(stage_matrix.next_chars[i])
            var timeout = setTimeout( function () {
              mesher.swap_chars(line_index, stage_matrix.first_indices[i], stage_matrix.next_chars[i], true, 0, 0)
            },66)
          }

        }
        if (n===line_matrix.length-1) {
          clearInterval(interval)
        }
        n++
      },2500)
    })

  }

}
