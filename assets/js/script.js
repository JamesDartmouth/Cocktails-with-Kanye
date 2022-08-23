// var slideEl = document.getElementById("slide")
var quoteHistory = []
var drinkHistory = []
var sixPack = []
let liquorArr = []


document.getElementById("quote-recipe-box").style.display = "none";
document.getElementById("drinkCards").style.display = "none";

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '34bfbcce05msh118f7d7c2830c51p14f9d6jsna024c8daa8cb',
		'X-RapidAPI-Host': 'the-cocktail-db.p.rapidapi.com'
	}
};

function selectDrink(liquor) {

	fetch("https://the-cocktail-db.p.rapidapi.com/filter.php?i=" + liquor, options)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {

			console.log(data);
			for (var i = 0; i < data.drinks.length; i++) {
				liquorArr.push(data.drinks[i]);
			}

			// var sixLiquor = []
			// for (var i = 0; i < 18; i++) {
			// var randomLiquor = Math.floor(Math.random() * liquorArr.length)
			// var selectLiquor = liquorArr[randomLiquor]
			// 	sixLiquor.push(selectLiquor)
			// }
			// console.log(liquorArr)
			// for (var prop in data.drinks) {
			// 	if (data.drinks[prop]) {
			// 		liquorArr.push(data.drinks[prop]);
			// 	}
			// }
			// console.log(liquorArr)

			liquorArr = liquorArr.slice(0, 18);
			console.log(liquorArr);
			displayDrinks(liquorArr)
		})
}


var page = 1;
var limit = 6;
var numPages = 3;

function displayDrinks(liquorArr) {

	document.getElementById("name1").textContent = liquorArr[0].strDrink;
	document.getElementById("pic1").src = liquorArr[0].strDrinkThumb;
	document.getElementById("card1").setAttribute("data-id", liquorArr[0].idDrink)

	document.getElementById("name2").textContent = liquorArr[1].strDrink;
	document.getElementById("pic2").src = liquorArr[1].strDrinkThumb;
	document.getElementById("card2").setAttribute("data-id", liquorArr[1].idDrink)

	document.getElementById("name3").textContent = liquorArr[2].strDrink;
	document.getElementById("pic3").src = liquorArr[2].strDrinkThumb;
	document.getElementById("card3").setAttribute("data-id", liquorArr[2].idDrink)

	document.getElementById("name4").textContent = liquorArr[3].strDrink;
	document.getElementById("pic4").src = liquorArr[3].strDrinkThumb;
	document.getElementById("card4").setAttribute("data-id", liquorArr[3].idDrink)

	document.getElementById("name5").textContent = liquorArr[4].strDrink;
	document.getElementById("pic5").src = liquorArr[4].strDrinkThumb;
	document.getElementById("card5").setAttribute("data-id", liquorArr[4].idDrink)

	document.getElementById("name6").textContent = liquorArr[5].strDrink;
	document.getElementById("pic6").src = liquorArr[5].strDrinkThumb;
	document.getElementById("card6").setAttribute("data-id", liquorArr[5].idDrink)
}

document.getElementById("nextSix").addEventListener("click", function () {
	if (page <= numPages) {
		page++
		displayDrinks(paginate(liquorArr, 6, page));
		if (page === numPages) {
			document.getElementById("nextSix").disabled = true;
			document.getElementById("prevSix").disabled = false;
		}
	}
});

document.getElementById("prevSix").addEventListener("click", function () {
	if (page <= numPages) {
		page--
		displayDrinks(paginate(liquorArr, 6, page));
		if (page === 1) {
			document.getElementById("prevSix").disabled = true;
			document.getElementById("nextSix").disabled = false;
		}
	}
});

function paginate(array, pageSize, pageNum) {
	return array.slice((pageNum - 1) * pageSize, pageNum * pageSize);
}


function getDrink() {

	fetch('https://the-cocktail-db.p.rapidapi.com/lookup.php?i=' + drinkSet, options)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {

			var drinkData = data.drinks[0]
			var drinkPic = data.drinks[0].strDrinkThumb
			var drinkName = data.drinks[0].strDrink
			var drinkInstruc = data.drinks[0].strInstructions
			var ingredients = [];
			var measures = [];
			var ulEl = document.getElementById("drinkIngre")

			for (var prop in drinkData) {
				if (drinkData[prop]) {
					if (prop.includes('strIngredient')) {
						ingredients.push(drinkData[prop]);
					} else if (prop.includes('strMeasure')) {
						measures.push(drinkData[prop]);
					}
				}
			}

			for (var i = 0; i < ingredients.length; i++) {
				var liEl = document.createElement('li');
				liEl.textContent = measures[i] ? ingredients[i] + ': ' + measures[i] : ingredients[i];
				ulEl.appendChild(liEl);
			}

			document.getElementById("drinkName").textContent = drinkName
			document.getElementById("drinkInstr").textContent = drinkInstruc
			document.getElementById("drinkImg").src = drinkPic

			drinkHistory.push(data.drinks[0].idDrink)
			localStorage.setItem("drinkId", drinkHistory)
		})
	fetch('https://api.kanye.rest')
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			var quote = Object.values(data)
			document.getElementById("quote").textContent = quote
		})
		
}

//////FUNCTION FOR RANDOM DRINK---------------------------------------------
function randomDrink() {

	fetch('https://the-cocktail-db.p.rapidapi.com/random.php', options)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			// console.log(data);

			var drinkData = data.drinks[0]
			var drinkPic = data.drinks[0].strDrinkThumb
			var drinkName = data.drinks[0].strDrink
			var drinkInstruc = data.drinks[0].strInstructions
			var ingredients = [];
			var measures = [];
			var ulEl = document.getElementById("drinkIngre")

			for (var prop in drinkData) {
				if (drinkData[prop]) {
					if (prop.includes('strIngredient')) {
						ingredients.push(drinkData[prop]);
					} else if (prop.includes('strMeasure')) {
						measures.push(drinkData[prop]);
					}
				}
			}

			for (var i = 0; i < ingredients.length; i++) {
				var liEl = document.createElement('li');
				liEl.textContent = measures[i] ? ingredients[i] + ': ' + measures[i] : ingredients[i];
				ulEl.appendChild(liEl);
			}

			document.getElementById("drinkName").textContent = drinkName
			document.getElementById("drinkInstr").textContent = drinkInstruc
			document.getElementById("drinkImg").src = drinkPic

			drinkHistory.push(data.drinks[0].idDrink)
			localStorage.setItem("drinkId", drinkHistory)
		})
	fetch('https://api.kanye.rest')
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			var quote = Object.values(data)
			document.getElementById("quote").textContent = quote
			console.log(data)
		})

}	

function prevItem() {
	if (i === 0) {
		i = arr.length;
	}
	i = i - 1

	console.log(quoteHistory[i]);
	console.log(drinkHistory[i]);

	document.getElementById("quote").textContent = Object.values(quoteHistory[i])
	document.getElementById("drinkName").textContent = drinkHistory[i].strDrink
	document.getElementById("drinkInstr").textContent = drinkHistory[i].strInstructions
	document.getElementById("drinkImg").src = drinkHistory[i].strDrinkThumb
}
function nextItem() {
	i = i + 1
	i = i % arr.length;

	console.log(quoteHistory[i]);
	console.log(drinkHistory[i]);

	document.getElementById("quote").textContent = Object.values(quoteHistory[i])
	document.getElementById("drinkName").textContent = drinkHistory[i].strDrink
	document.getElementById("drinkInstr").textContent = drinkHistory[i].strInstructions
	document.getElementById("drinkImg").src = drinkHistory[i].strDrinkThumb
}
// // WILLL RUN SELECT DRINK FUNCTION------------------------------
$("#barBtn").on('click', function (event) {
	event.preventDefault();
	document.getElementById("greeting").style.display = "none";
	document.getElementById("quote-recipe-box").style.display = "block";
	document.getElementById("drinkCards").style.display = "none";
	randomDrink();
})

// // RETREIVE FROM LOCAL STORAGE?????????????????????????????????
// $("#prevBtn").on('click', function (event) {
// 	event.preventDefault();
// 	document.getElementById("greeting").style.display = "none";
// 	document.getElementById("quote-recipe-box").style.display = "content";
// 	document.getElementById("drinkCards").style.display = "none";

// 	prevItem();
// })


// RETREIVE FROM LOCAL STORAGE???????????????????????????????
// $("#nextBtn").on('click', function (event) {
// 	event.preventDefault();
// 	document.getElementById("greeting").style.display = "none";
// 	document.getElementById("quote-recipe-box").style.display = "content";
// 	document.getElementById("drinkCards").style.display = "none";
// }
// // 	nextItem();

// // })

// WILL RETURN USER TO INTRO PAGE---------------------------------
$("#NewBtn").on('click', function (event) {
	event.preventDefault();
	document.getElementById("greeting").style.display = "block";
	document.getElementById("quote-recipe-box").style.display = "none";
	document.getElementById("drinkCards").style.display = "none";
});


	// WILLL RUN RANDOM DRINK FUNCTION------------------------------
	$("#barBtn").on('click', function (event) {
		event.preventDefault();

		document.getElementById("greeting").style.display = "none";
		document.getElementById("quote-recipe-box").style.display = "block";
		document.getElementById("drinkCards").style.display = "none";
		document.getElementById("drinkBtns").style.display = "none";

		randomDrink();
	})

	$("#newRandomDrink").on('click', function (event) {
		event.preventDefault();

		document.getElementById("greeting").style.display = "none";
		document.getElementById("quote-recipe-box").style.display = "block";
		document.getElementById("drinkCards").style.display = "none";
		document.getElementById("drinkBtns").style.display = "none";

		randomDrink();
	})


// WILL RUN SELECT DRINK FUNCTION---------------------------------
$("#dropdown-menu").on('click', function (event) {
	event.preventDefault();
	document.getElementById("greeting").style.display = "none";	
	document.getElementById("quote-recipe-box").style.display = "none";
	document.getElementById("drinkCards").style.display = "block";
	var liquor = event.target.getAttribute("value")
	selectDrink(liquor);
})


// // RETREIVE FROM LOCAL STORAGE?????????????????????????????????
// $("#prevBtn").on('click', function (event) {
// 	event.preventDefault();
// 	document.getElementById("greeting").style.display = "none";
// 	document.getElementById("quote-recipe-box").style.display = "content";
// 	document.getElementById("drinkCards").style.display = "none";

// 	prevItem();
// })


// RETREIVE FROM LOCAL STORAGE???????????????????????????????
// $("#nextBtn").on('click', function (event) {
// 	event.preventDefault();
// 	document.getElementById("greeting").style.display = "none";
// 	document.getElementById("quote-recipe-box").style.display = "content";
// 	document.getElementById("drinkCards").style.display = "none";
// }
// // 	nextItem();

// // })

// // WILL RETURN USER TO INTRO PAGE---------------------------------
// $("#newBtn").on('click', function (event) {
// 	event.preventDefault();
// 	document.getElementById("greeting").style.display = "content";
// 	document.getElementById("quote-recipe-box").style.display = "none";
// 	document.getElementById("drinkCards").style.display = "none";
// })

// EVENT LISTENERS ON CARDS----------------

	document.getElementById("quote-recipe-box").style.display = "block";
	document.getElementById("drinkCards").style.display = "none";
	document.getElementById("greeting").style.display = "none";

$("#card4").on('click', function (event) {
	event.preventDefault();
	var id = document.getElementById('card4')
	var drinkSet = id.getAttribute('data-id')
	console.log(drinkSet)
	console.log(typeof drinkSet)

	getDrink(drinkSet)

	document.getElementById("quote-recipe-box").style.display = "block";
	document.getElementById("drinkCards").style.display = "none";
	document.getElementById("greeting").style.display = "none";
})
$("#card2").on('click', function (event) {
	event.preventDefault();
	var id = document.getElementById('card2')
	var drinkSet = id.getAttribute('data-id')
	console.log(drinkSet)
	console.log(typeof drinkSet)

	getDrink(drinkSet)

	document.getElementById("quote-recipe-box").style.display = "block";
	document.getElementById("drinkCards").style.display = "none";
	document.getElementById("greeting").style.display = "none";
})
$("#card3").on('click', function (event) {
	event.preventDefault();
	var id = document.getElementById('card3')
	var drinkSet = id.getAttribute('data-id')
	console.log(drinkSet)
	console.log(typeof drinkSet)

	getDrink(drinkSet)

	document.getElementById("quote-recipe-box").style.display = "block";
	document.getElementById("drinkCards").style.display = "none";
	document.getElementById("greeting").style.display = "none";
})
$("#card4").on('click', function (event) {
	event.preventDefault();
	var id = document.getElementById('card4')
	var drinkSet = id.getAttribute('data-id')
	console.log(drinkSet)
	console.log(typeof drinkSet)

	getDrink(drinkSet)

	document.getElementById("quote-recipe-box").style.display = "block";
	document.getElementById("drinkCards").style.display = "none";
	document.getElementById("greeting").style.display = "none";
})
$("#card5").on('click', function (event) {
	event.preventDefault();
	var id = document.getElementById('card5')
	var drinkSet = id.getAttribute('data-id')
	console.log(drinkSet)
	console.log(typeof drinkSet)

	getDrink(drinkSet)

		document.getElementById("quote-recipe-box").style.display = "block";
		document.getElementById("drinkCards").style.display = "none";
		document.getElementById("greeting").style.display = "none";
		document.getElementById("randomDrinkBtns").style.display = "none";
	})

	
	// 	// if(){	
	// 	// 	var id = document.getElementById("card1");
	// 	// 	var idAtt= id.getAttribute("data-id");
	// 	// 	console.log(idAtt);

	document.getElementById("greeting").style.display = "none";
	document.getElementById("quote-recipe-box").style.display = "block";
	document.getElementById("drinkCards").style.display = "none";

	randomDrink();
})

=======
>>>>>>> main
