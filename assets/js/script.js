var quoteHistory = [];
var sixPack = [];
let liquorArr = [];
var localHistory;
var page = 1; 
var historyPage = 1;
var limit = 6;
var numPages;
var historyNumPages;
document.getElementById("quote-recipe-box").style.display = "none";
document.getElementById("drinkCards").style.display = "none";
document.getElementById("hdrinkCards").style.display = "none";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "34bfbcce05msh118f7d7c2830c51p14f9d6jsna024c8daa8cb",
    "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
  },
};
function selectDrink(liquor) {
  fetch(
    "https://the-cocktail-db.p.rapidapi.com/filter.php?i=" + liquor,
    options
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      for (var i = 0; i < data.drinks.length; i++) {
        liquorArr.push(data.drinks[i]);
      }
      liquorArr = liquorArr.slice(0, 24);
      console.log(liquorArr);
      document.getElementById("prevSix").disabled = true;
      numPages = liquorArr.length / limit
      displayDrinks(liquorArr);
    });
}
function displayDrinks(liquorArr) {
  document.getElementById("name1").textContent = liquorArr[0].strDrink;
  document.getElementById("pic1").src = liquorArr[0].strDrinkThumb;
  document
    .getElementById("card1")
    .setAttribute("data-id", liquorArr[0].idDrink);
  document.getElementById("name2").textContent = liquorArr[1].strDrink;
  document.getElementById("pic2").src = liquorArr[1].strDrinkThumb;
  document
    .getElementById("card2")
    .setAttribute("data-id", liquorArr[1].idDrink);
  document.getElementById("name3").textContent = liquorArr[2].strDrink;
  document.getElementById("pic3").src = liquorArr[2].strDrinkThumb;
  document
    .getElementById("card3")
    .setAttribute("data-id", liquorArr[2].idDrink);
  document.getElementById("name4").textContent = liquorArr[3].strDrink;
  document.getElementById("pic4").src = liquorArr[3].strDrinkThumb;
  document
    .getElementById("card4")
    .setAttribute("data-id", liquorArr[3].idDrink);
  document.getElementById("name5").textContent = liquorArr[4].strDrink;
  document.getElementById("pic5").src = liquorArr[4].strDrinkThumb;
  document
    .getElementById("card5")
    .setAttribute("data-id", liquorArr[4].idDrink);
  document.getElementById("name6").textContent = liquorArr[5].strDrink;
  document.getElementById("pic6").src = liquorArr[5].strDrinkThumb;
  document
    .getElementById("card6")
    .setAttribute("data-id", liquorArr[5].idDrink);
}
document.getElementById("nextSix").addEventListener("click", function () {
  if (page <= numPages) {
    page++;
    document.getElementById("prevSix").disabled = false;
    displayDrinks(paginate(liquorArr, 6, page));
    if (page === numPages) {
      document.getElementById("nextSix").disabled = true;
    }
  }
});
document.getElementById("prevSix").addEventListener("click", function () {
  if (page <= numPages) {
    page--;
    document.getElementById("nextSix").disabled = false;
    displayDrinks(paginate(liquorArr, 6, page));
    if (page === 1) {
      document.getElementById("prevSix").disabled = true;
    }
  }
});
function paginate(array, pageSize, pageNum) {
  return array.slice((pageNum - 1) * pageSize, pageNum * pageSize);
}
function getDrink(drinkSet) {
  console.log("drinkSet", drinkSet);
  fetch(
    "https://the-cocktail-db.p.rapidapi.com/lookup.php?i=" + drinkSet,
    options
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var drinkData = data.drinks[0];
      var drinkPic = data.drinks[0].strDrinkThumb;
      var drinkName = data.drinks[0].strDrink;
      var drinkInstruc = data.drinks[0].strInstructions;
      var ingredients = [];
      var measures = [];
      var ulEl = document.getElementById("drinkIngre");
      for (var prop in drinkData) {
        if (drinkData[prop]) {
          if (prop.includes("strIngredient")) {
            ingredients.push(drinkData[prop]);
          } else if (prop.includes("strMeasure")) {
            measures.push(drinkData[prop]);
          }
        }
      }
      for (var i = 0; i < ingredients.length; i++) {
        var liEl = document.createElement("li");
        liEl.textContent = measures[i]
          ? ingredients[i] + ": " + measures[i]
          : ingredients[i];
        ulEl.appendChild(liEl);
      }
      document.getElementById("drinkName").textContent = drinkName;
      document.getElementById("drinkInstr").textContent = drinkInstruc;
      document.getElementById("drinkImg").src = drinkPic;
      let drinkHistory = JSON.parse(localStorage.getItem("drinkObjects")) || [];
      let drinkObj = {
        idDrink: data.drinks[0].idDrink,
        strDrink: data.drinks[0].strDrink,
        strDrinkThumb: data.drinks[0].strDrinkThumb,
      };
      drinkHistory.push(drinkObj);
      localStorage.setItem("drinkObjects", JSON.stringify(drinkHistory));
    });
  fetch("https://api.kanye.rest")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var quote = Object.values(data);
      document.getElementById("quote").textContent = quote;
    });
}
//////FUNCTION FOR RANDOM DRINK---------------------------------------------
function randomDrink() {
  fetch("https://the-cocktail-db.p.rapidapi.com/random.php", options)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
      var drinkData = data.drinks[0];
      var drinkPic = data.drinks[0].strDrinkThumb;
      var drinkName = data.drinks[0].strDrink;
      var drinkInstruc = data.drinks[0].strInstructions;
      var ingredients = [];
      var measures = [];
      var ulEl = document.getElementById("drinkIngre");
      for (var prop in drinkData) {
        if (drinkData[prop]) {
          if (prop.includes("strIngredient")) {
            ingredients.push(drinkData[prop]);
          } else if (prop.includes("strMeasure")) {
            measures.push(drinkData[prop]);
          }
        }
      }
      ulEl.innerHTML = "";
      for (var i = 0; i < ingredients.length; i++) {
        var liEl = document.createElement("li");
        liEl.textContent = measures[i]
          ? ingredients[i] + ": " + measures[i]
          : ingredients[i];
        ulEl.appendChild(liEl);
      }
      document.getElementById("drinkName").textContent = drinkName;
      document.getElementById("drinkInstr").textContent = drinkInstruc;
      document.getElementById("drinkImg").src = drinkPic;
      let drinkHistory = JSON.parse(localStorage.getItem("drinkObjects")) || [];
      let drinkObj = {
        idDrink: data.drinks[0].idDrink,
        strDrink: data.drinks[0].strDrink,
        strDrinkThumb: data.drinks[0].strDrinkThumb,
      };
      drinkHistory.push(drinkObj);
      localStorage.setItem("drinkObjects", JSON.stringify(drinkHistory));
      fetch("https://api.kanye.rest")
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          var quote = Object.values(data);
          document.getElementById("quote").textContent = quote;
          console.log(data);
        });
    });
}
// // WILLL RUN SELECT DRINK FUNCTION------------------------------
$("#barBtn").on("click", function (event) {
  event.preventDefault();
  document.getElementById("greeting").style.display = "none";
  document.getElementById("quote-recipe-box").style.display = "block";
  document.getElementById("drinkCards").style.display = "none";
  document.getElementById("hdrinkCards").style.display = "none";
  randomDrink();
});
// RETREIVE FROM LOCAL STORAGE?????????????????????????????????
$("#prevBtn").on("click", function (event) {
  event.preventDefault();
  document.getElementById("greeting").style.display = "none";
  document.getElementById("quote-recipe-box").style.display = "block";
  document.getElementById("drinkCards").style.display = "none";
  document.getElementById("hdrinkCards").style.display = "none";
  prevItem();
});
// RETREIVE FROM LOCAL STORAGE???????????????????????????????
$("#nextBtn").on("click", function (event) {
  event.preventDefault();
  document.getElementById("greeting").style.display = "none";
  document.getElementById("quote-recipe-box").style.display = "block";
  document.getElementById("drinkCards").style.display = "none";
  document.getElementById("hdrinkCards").style.display = "none";
  nextItem();
});
// WILL RETURN USER TO INTRO PAGE---------------------------------
$("#newBtn").on("click", function (event) {
  event.preventDefault();
  document.getElementById("greeting").style.display = "block";
  document.getElementById("quote-recipe-box").style.display = "none";
  document.getElementById("drinkCards").style.display = "none";
  document.getElementById("hdrinkCards").style.display = "none";
});
// WILLL RUN RANDOM DRINK FUNCTION------------------------------
$("#barBtn").on("click", function (event) {
  event.preventDefault();
  document.getElementById("greeting").style.display = "none";
  document.getElementById("quote-recipe-box").style.display = "block";
  document.getElementById("drinkCards").style.display = "none";
  // document.getElementById("drinkBtns").style.display = "none";
  document.getElementById("hdrinkCards").style.display = "none";
  randomDrink();
});
$("#newRandomDrink").on("click", function (event) {
  event.preventDefault();
  document.getElementById("greeting").style.display = "none";
  document.getElementById("quote-recipe-box").style.display = "block";
  document.getElementById("drinkCards").style.display = "none";
  // document.getElementById("drinkBtns").style.display = "none";
  document.getElementById("hdrinkCards").style.display = "none";
  randomDrink();
});
// WILL RUN SELECT DRINK FUNCTION---------------------------------
$("#dropdown-menu").on("click", function (event) {
  event.preventDefault();
  document.getElementById("greeting").style.display = "none";
  document.getElementById("quote-recipe-box").style.display = "none";
  document.getElementById("drinkCards").style.display = "block";
  var liquor = event.target.getAttribute("value");
  document.getElementById("hdrinkCards").style.display = "none";
  selectDrink(liquor);
});
// EVENT LISTENERS ON CARDS----------------
$("#card1").on("click", function (event) {
  event.preventDefault();
  var id = document.getElementById("card1");
  var drinkSet = id.getAttribute("data-id");
  console.log(drinkSet);
  console.log(typeof drinkSet);
  getDrink(drinkSet);
  document.getElementById("quote-recipe-box").style.display = "block";
  document.getElementById("drinkCards").style.display = "none";
  document.getElementById("greeting").style.display = "none";
  document.getElementById("hdrinkCards").style.display = "none";
});
$("#card2").on("click", function (event) {
  event.preventDefault();
  var id = document.getElementById("card2");
  var drinkSet = id.getAttribute("data-id");
  console.log(drinkSet);
  console.log(typeof drinkSet);
  getDrink(drinkSet);
  document.getElementById("quote-recipe-box").style.display = "block";
  document.getElementById("drinkCards").style.display = "none";
  document.getElementById("greeting").style.display = "none";
  document.getElementById("hdrinkCards").style.display = "none";
});
$("#card3").on("click", function (event) {
  event.preventDefault();
  var id = document.getElementById("card3");
  var drinkSet = id.getAttribute("data-id");
  console.log(drinkSet);
  console.log(typeof drinkSet);
  getDrink(drinkSet);
  document.getElementById("quote-recipe-box").style.display = "block";
  document.getElementById("drinkCards").style.display = "none";
  document.getElementById("greeting").style.display = "none";
  document.getElementById("hdrinkCards").style.display = "none";
});
$("#card4").on("click", function (event) {
  event.preventDefault();
  var id = document.getElementById("card4");
  var drinkSet = id.getAttribute("data-id");
  console.log(drinkSet);
  console.log(typeof drinkSet);
  getDrink(drinkSet);
  document.getElementById("quote-recipe-box").style.display = "block";
  document.getElementById("drinkCards").style.display = "none";
  document.getElementById("greeting").style.display = "none";
  document.getElementById("hdrinkCards").style.display = "none";
});
$("#card5").on("click", function (event) {
  event.preventDefault();
  var id = document.getElementById("card5");
  var drinkSet = id.getAttribute("data-id");
  console.log(drinkSet);
  console.log(typeof drinkSet);
  getDrink(drinkSet);
  document.getElementById("quote-recipe-box").style.display = "block";
  document.getElementById("drinkCards").style.display = "none";
  document.getElementById("greeting").style.display = "none";
  document.getElementById("hdrinkCards").style.display = "none";
});
$("#card6").on("click", function (event) {
  event.preventDefault();
  var id = document.getElementById("card6");
  var drinkSet = id.getAttribute("data-id");
  console.log(drinkSet);
  console.log(typeof drinkSet);
  getDrink(drinkSet);
  document.getElementById("quote-recipe-box").style.display = "block";
  document.getElementById("drinkCards").style.display = "none";
  document.getElementById("greeting").style.display = "none";
  document.getElementById("hdrinkCards").style.display = "none";
});
$("#yeezy").on("click", function (event) {
  event.preventDefault();
  document.getElementById("greeting").style.display = "none";
  document.getElementById("quote-recipe-box").style.display = "block";
  document.getElementById("drinkCards").style.display = "none";
  document.getElementById("hdrinkCards").style.display = "none";
  randomDrink();
});
/////////////////////////////////   DRINK HISTORY CODE  ////////////////////////////////////////////////////
$("#history").on("click", function (event) {
  event.preventDefault();
  document.getElementById("greeting").style.display = "none";
  document.getElementById("quote-recipe-box").style.display = "none";
  document.getElementById("drinkCards").style.display = "none";
  document.getElementById("hdrinkCards").style.display = "block";
  getHistory();
});
function getHistory() {
  localHistory = JSON.parse(localStorage.getItem("drinkObjects")) || [];
  historyNumPages = Math.ceil(localHistory.length / limit);
  if (historyPage === 1) {
    document.getElementById("hprevSix").disabled = true;
  }
 displayHistory(localHistory);
}
// function renderDrinkHistory(historyArr){
//  for (let i = 0; i < historyArr.length; i++) {
//      let drinkDiv = document.createElement("div");
//      let name = document.createElement("p");
//      let thumbnail = document.createElement("img");
//      name.textContent = historyArr[i].strDrink;
//      thumbnail.src = historyArr[i].strDrinkThumb;
//      drinkDiv.setAttribute("data-id", historyArr[i].idDrink)
//      drinkDiv.append(name, thumbnail)
//      document.getElementById("drinkCards").append(drinkDiv)
//      console.log(historyArr[i])
//  }
// }
function displayHistory(historyArr) {
    // Loop fixes the issue of next button not disabling if less than 6 drinks available for render
  for (let i = 0; i < (historyArr.length); i++){
    
    document.getElementById("hname"+ (i+1)).textContent = historyArr[i].strDrink;
    document.getElementById("hpic"+(i+1)).src = historyArr[i].strDrinkThumb;
    document.getElementById("hcard"+(i+1)).setAttribute("data-id", historyArr[i].idDrink)
    
  }
//   document.getElementById("hname1").textContent = historyArr[0].strDrink;
//   document.getElementById("hpic1").src = historyArr[0].strDrinkThumb;
//   document
//     .getElementById("hcard1")
//     .setAttribute("data-id", historyArr[0].idDrink);
//   document.getElementById("hname2").textContent = historyArr[1].strDrink;
//   document.getElementById("hpic2").src = historyArr[1].strDrinkThumb;
//   document
//     .getElementById("hcard2")
//     .setAttribute("data-id", historyArr[1].idDrink);
//   document.getElementById("hname3").textContent = historyArr[2].strDrink;
//   document.getElementById("hpic3").src = historyArr[2].strDrinkThumb;
//   document
//     .getElementById("hcard3")
//     .setAttribute("data-id", historyArr[2].idDrink);
//   document.getElementById("hname4").textContent = historyArr[3].strDrink;
//   document.getElementById("hpic4").src = historyArr[3].strDrinkThumb;
//   document
//     .getElementById("hcard4")
//     .setAttribute("data-id", historyArr[3].idDrink);
//   document.getElementById("hname5").textContent = historyArr[4].strDrink;
//   document.getElementById("hpic5").src = historyArr[4].strDrinkThumb;
//   document
//     .getElementById("hcard5")
//     .setAttribute("data-id", historyArr[4].idDrink);
//   document.getElementById("hname6").textContent = historyArr[5].strDrink;
//   document.getElementById("hpic6").src = historyArr[5].strDrinkThumb;
//   document
//     .getElementById("hcard6")
//     .setAttribute("data-id", historyArr[5].idDrink);
}
document.getElementById("hnextSix").addEventListener("click", function () {
  if (historyPage <= historyNumPages) {
    historyPage++;
    document.getElementById("hprevSix").disabled = false;
    displayHistory(paginate(localHistory, 6, historyPage));
    if (historyPage === historyNumPages) {
      document.getElementById("hnextSix").disabled = true;
    }
  }
});
document.getElementById("hprevSix").addEventListener("click", function () {
  if (historyPage <= historyNumPages) {
    historyPage--;
    document.getElementById("hnextSix").disabled = false;
    displayHistory(paginate(localHistory, 6, historyPage));
    if (historyPage === 1) {
      document.getElementById("hprevSix").disabled = true;
    }
  }
});

// a;lksdjf;laksdjf;lkkasdjflkjasdlkfjlkjaklsdjfkkjkjlkj;lkjkljkj