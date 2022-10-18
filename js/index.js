'use strict'

window.addEventListener('load', function (event) {

  function enmesh(content_data) {
    const text_elements_arr = []

    if (content_data.first_strings_arr.length===content_data.next_strings_arr.length) {

      for (let n = 0; n < content_data.first_strings_arr.length; n++) {

        let first_strings = content_data.first_strings_arr[n]
        let next_strings = content_data.next_strings_arr[n]

        if (first_strings.length===next_strings.length) {

          if (!text_elements_arr.length) {

            text_dom.innerHTML = ''

            for (let i = 0; i < first_strings.length; i++) {
              let el = document.createElement('h3')
              let longest_string = first_strings[i].length > next_strings[i].length ? first_strings[i] : next_strings[i]
              for (let ii = 0; ii < longest_string.split('').length; ii++) {
                let span = document.createElement('span')
                let char = first_strings[i][ii] ? document.createTextNode(first_strings[i][ii]) : document.createTextNode('')
                span.appendChild(char)
                span.className = 'char-span'
                el.appendChild(span)
              }
              el.className = 'line-span'
              text_elements_arr.push(el)
              text_dom.appendChild(el)
            }
          }

          mesher.multi_string_enmesh(
            first_strings,
            next_strings,
            config_data.intervals,
            config_data.variance,
            text_elements_arr
          )
        }
      }
    } else {
      console.log('unequal array lengths')
    }
  }

  function add_field() {
    const row = document.createElement('div')
    const field_1 = document.createElement('input')
    const field_2 = document.createElement('input')
    row.className = 'flex-row flex-center enmesh-fields'
    field_1.className = 'enmesh-field'
    field_2.className = 'enmesh-field'
    row.appendChild(field_1)
    row.appendChild(field_2)
    if (document.querySelector('#enmesh-form')) {
      document.querySelector('#enmesh-form').appendChild(row)
    }
  }

  function get_user_data() {
    const data = {"first_strings_arr" : [[]], "next_strings_arr" : [[]]}
    const field_rows = document.querySelectorAll('.enmesh-fields')
    for (let i = 0; i < field_rows.length; i++) {
      if (field_rows[i].querySelectorAll('input')[0].value &&
        field_rows[i].querySelectorAll('input')[1].value) {
        data['first_strings_arr'][0].push( field_rows[i].querySelectorAll('input')[0].value )
        data['next_strings_arr'][0].push( field_rows[i].querySelectorAll('input')[1].value )
      }
    }
    return data["first_strings_arr"].length && data["next_strings_arr"].length ? data : null
  }

  const app_dom = document.querySelector('#app')
  const text_dom = document.querySelector('#text-display')
  let user_data = null
  document.querySelector('#add-field').addEventListener('click', function (event) {
    add_field()
  })
  document.querySelector('#enmesh').addEventListener('click', function (event) {
    user_data = get_user_data()
    if (user_data) {
      enmesh(user_data)
    } else {
      enmesh(content_data)
    }
  })
})
