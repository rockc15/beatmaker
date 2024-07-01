$(document).ready(initialize)

/**
 * Called once on page load. This is where all of the initialization logic goes
 */
function initialize() {
  const sessionId = sessionStorage.getItem('uid')
  $.ajax({
    url: '/authenticateRoute',
    type: 'POST',
    headers: {
      uid: sessionId
    },
    statusCode: {
      200: function (result) {
        if (result) {
          GetBeatsArray()
        }
      },
      203: function (result) {
        window.location.href = '/index.html'
      }
    }
  })
}

function GetBeatsArray() {
  $.ajax({
    url: '/getAllBeats',
    type: 'GET',
    statusCode: {
      200: function (result) {
        if (result) {

          const allBeatCards = $('#allBeatCards')
          for (beat of result) {
            let title = beat.Title
            let author = beat.Author
            let beatMatrix = beat.beat
            let description = beat.description
            let genre = beat.genre
            let beatId = beat.beatId

            let imageNumber = Math.floor(Math.random() * 20) % 4
            let imagePath = `./Assets/${imageNumber}.jpg`
            if (description == undefined) {
              description = ""
            }

            const colDiv = $(`<div class="col" style="margin:2%">`)
            allBeatCards.append(colDiv)

            const card = $(`<div class="card" style="width: 12rem;">`)
            colDiv.append(card)

            const image = $(`<img class="card-img-top" src="${imagePath}" alt="Card image cap">`)
            card.append(image)

            const cardBody = $(`<div class="card-body">`)
            card.append(cardBody)

            const cardTitle = $(`<h5 class="card-title">${title}</h5>`)
            cardBody.append(cardTitle)

            const cardAuthor = $(` <p class="card-text">${author}</p>`)
            cardBody.append(cardAuthor)

            const cardGoToBeat = $(`<a href="/beatmaker.html?id=${beatId}" class="btn btn-primary">View Beat</a>`)
            cardBody.append(cardGoToBeat)
          }

        }
      },
      203: function (result) {
        console.log(result)
      }
    }
  })
}