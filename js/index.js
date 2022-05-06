'use strict'

window.addEventListener('load', function (event) {

  const app_dom = document.querySelector('#app')
  const text_elements_arr = []

  if (content_data.first_strings_arr.length===content_data.next_strings_arr.length) {

    for (let n = 0; n < content_data.first_strings_arr.length; n++) {

      let first_strings = content_data.first_strings_arr[n]
      let next_strings = content_data.next_strings_arr[n]

      if (first_strings.length===next_strings.length) {

        if (!text_elements_arr.length) {

          for (let i = 0; i < first_strings.length; i++) {
            let el = document.createElement('h3')
            for (let ii = 0; ii < first_strings[i].split('').length; ii++) {
              let span = document.createElement('span')
              let char = document.createTextNode(first_strings[i][ii])
              span.appendChild(char)
              span.className = 'char-span'
              el.appendChild(span)
            }
            el.className = 'line-span'
            text_elements_arr.push(el)
            app_dom.appendChild(el)
          }
        }
        /*
        multi_string_enmesh(
          first_strings,
          next_strings,
          config_data.intervals,
          config_data.variance,
          text_elements_arr
        )
        */
      }
    }
  } else {
    console.log('unequal array lengths')
  }
})
