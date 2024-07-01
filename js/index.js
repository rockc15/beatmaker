$(document).ready(function () {
  $('#submit-btn').on('click', function (e) {
    e.preventDefault()
    const email = $('#email-input').val()
    const password = $('#password-input').val()
    $('#liveAlertPlaceholder').empty()
    $.ajax({
      url: '/login',
      type: 'POST',
      data: { email: email, password: password },
      statusCode: {
        200: function (userID) {
          sessionStorage.setItem('uid', userID)
          window.location.href = '/beatmaker.html'
        },
        203: function (result) {
          display_alert(result.replace('Firebase: ', ''), 'danger')
        }
      }
    })
    return false
  })
})

function display_alert (message, type) {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = '<div id="alertDiv" class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '</div>'
  $('#liveAlertPlaceholder').append(wrapper)
}
