// Api for a card game

let deckId = "";

fetch(`https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
  .then((res) => res.json())
  .then((data) => {
    // console.log(data);
    deckId = data.deck_id;
  })
  .catch((err) => {
    console.log(`error ${err}`);
  });

document.querySelector("button").addEventListener("click", drawTwo);

function drawTwo() {
  const url = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      // console.log(data.cards[1].value);
      document.querySelector("#player1").src = data.cards[0].image;
      document.querySelector("#player2").src = data.cards[1].image;

      let playerOneCardVal = convertToNum(data.cards[0].value);
      let playerTwoCardVal = convertToNum(data.cards[1].value);

      if (playerOneCardVal > playerTwoCardVal) {
        document.querySelector("h3").innerText = "Player One wins!";
      } else if (playerOneCardVal < playerTwoCardVal) {
        document.querySelector("h3").innerText = "Player Two wins!";
      } else {
        document.querySelector("h3").innerText = `Time for War!`;
      }
    })

    .catch((err) => {
      console.log(`error ${err}`);
    });

  // helper function
  function convertToNum(val) {
    if (val === "ACE") {
      return 14;
    } else if (val === "KING") {
      return 13;
    } else if (val === "QUEEN") {
      return 12;
    } else if (val === "JACK") {
      return 11;
    } else {
      return Number(val);
    }
  }
}
