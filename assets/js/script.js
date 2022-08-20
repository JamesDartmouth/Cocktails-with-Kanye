// var slideEl = document.getElementById("slide")
var quoteHistory = []
var drinkHistory = []
var sixPack = []


const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '34bfbcce05msh118f7d7c2830c51p14f9d6jsna024c8daa8cb',
		'X-RapidAPI-Host': 'the-cocktail-db.p.rapidapi.com'
	}
};

// fetch('https://the-cocktail-db.p.rapidapi.com/lookup.php?i=11007', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));


function selectDrink() {

	// TO BE TIED TO DROPDOWN?????????????????????????????????????????????????

	// document.getElementById("dropdown-menu").addEventListener('click', function(event)){
	// 	event.preventDefault;
	// 	if(event.target.matches('a')){
	// 		return getAttribute("data-id").document.getElementById()
	// 	}
	// }

	var liquor = "vodka"



	fetch('https://the-cocktail-db.p.rapidapi.com/filter.php?i=' + liquor, options)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			var liquorArr = [];
			console.log(data)

			for (var i = 0; i < data.drinks.length; i++) {
				liquorArr.push(data.drinks[i])
			}
			console.log(liquorArr)

			var sixLiquor= []
				for (var i = 0; i < 6; i++) {
				var randomLiquor = Math.floor(Math.random() * liquorArr.length)
				var selectLiquor = liquorArr[randomLiquor]
				sixLiquor.push(selectLiquor)
				}	
				for (var prop in data.drinks) {
					if (data.drinks[prop]) {
						liquorArr.push(data.drinks[prop]);
					}
				}
				console.log(sixLiquor)

			// var rand1 = data.drinks[0]
			// var rand2 = data.drinks[1]
			// var rand3 = data.drinks[2]
			// var rand4 = data.drinks[3]
			// var rand5 = data.drinks[4]
			// var rand6 = data.drinks[5]


			// var drinkId = ""

			document.getElementById("name1").textContent = sixLiquor[0].strDrink;
			document.getElementById("pic1").src = sixLiquor[0].strDrinkThumb;
			document.getElementById("card1").setAttribute("data-id", sixLiquor[0].idDrink)

			document.getElementById("name2").textContent = sixLiquor[1].strDrink;
			document.getElementById("pic2").src = sixLiquor[1].strDrinkThumb;
			document.getElementById("card1").setAttribute("data-id", sixLiquor[1].idDrink)

			document.getElementById("name3").textContent = sixLiquor[2].strDrink;
			document.getElementById("pic3").src = sixLiquor[2].strDrinkThumb;
			document.getElementById("card1").setAttribute("data-id", sixLiquor[2].idDrink)

			document.getElementById("name4").textContent = sixLiquor[3].strDrink;
			document.getElementById("pic4").src = sixLiquor[3].strDrinkThumb;
			document.getElementById("card1").setAttribute("data-id", sixLiquor[3].idDrink)

			document.getElementById("name5").textContent = sixLiquor[4].strDrink;
			document.getElementById("pic5").src = sixLiquor[4].strDrinkThumb;
			document.getElementById("card1").setAttribute("data-id", sixLiquor[4].idDrink)

			document.getElementById("name6").textContent = sixLiquor[5].strDrink;
			document.getElementById("pic6").src = sixLiquor[5].strDrinkThumb;
			document.getElementById("card1").setAttribute("data-id", sixLiquor[5].idDrink)

			console.log(sixLiquor[5].idDrink)

			console.log()
			
			var drinkId=sixLiquor[5].idDrink
			
			fetch('https://the-cocktail-db.p.rapidapi.com/lookup.php?i=' + drinkId, options)
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
				})
			fetch('https://api.kanye.rest')
				.then(function (response) {
					return response.json();
				})
				.then(function (data) {
					var quote = Object.values(data)
					document.getElementById("quote").textContent = quote
				})

			// LOCAL STORAGE AT END OF FUNCITON???????????????????????????????????????
		// 	var quoteHistory = [] this are in global scope already above
		// 	var drinkHistory =[] his are in global scope already above

		// 	localStorage.setItem("quote", quote)
		// 	var pastQuote = localstorage.getItem("quote")
		// 	console.log(quote)

		// 	localStorage.setItem("drink", quote)
		// 	var pastQuote = localstorage.getItem("drink")
		// 	console.log(drink)	
		}

		)
}


// Need alt tags on picutres????????????????????????????
// FUNCTION GETS SELECTED DRINK FROM 6 CHOICES

// var drinkId = id1
// THIS FUNCTIONS CODE WAS COPIED AND PASTED WITHIN SELECT DRINK FUNCTION

// function getDrink(drinkId) {
// 	console.log(typeof drinkId)
// 	fetch('https://the-cocktail-db.p.rapidapi.com/lookup.php?i=' + drinkId, options)
// 		.then(function (response) {
// 			return response.json();
// 		})
// 		.then(function (data) {

// 			var drinkData = data.drinks[0]
// 			var drinkPic = data.drinks[0].strDrinkThumb
// 			var drinkName = data.drinks[0].strDrink
// 			var drinkInstruc = data.drinks[0].strInstructions
// 			var ingredients = [];
// 			var measures = [];
// 			var ulEl = document.getElementById("drinkIngre")

// 			for (var prop in drinkData) {
// 				if (drinkData[prop]) {
// 					if (prop.includes('strIngredient')) {
// 						ingredients.push(drinkData[prop]);
// 					} else if (prop.includes('strMeasure')) {
// 						measures.push(drinkData[prop]);
// 					}
// 				}
// 			}

// 			for (var i = 0; i < ingredients.length; i++) {
// 				var liEl = document.createElement('li');
// 				liEl.textContent = measures[i] ? ingredients[i] + ': ' + measures[i] : ingredients[i];
// 				ulEl.appendChild(liEl);
// 			}

// 			document.getElementById("drinkName").textContent = drinkName
// 			document.getElementById("drinkInstr").textContent = drinkInstruc
// 			document.getElementById("drinkImg").src = drinkPic
// 		})
// 	fetch('https://api.kanye.rest')
// 		.then(function (response) {
// 			return response.json();
// 		})
// 		.then(function (data) {
// 			var quote = Object.values(data)
// 			document.getElementById("quote").textContent = quote
// 		})

// 	// LOCAL STORAGE AT END OF FUNCITON???????????????????????????????????????
// 	// var quoteHistory = [] this are in global scope already above
// 	// var drinkHistory =[] this are in global scope already above

// 	// localStorage.setItem("quote", quote)
// 	// var pastQuote = localstorage.getItem("quote")
// 	// console.log(quote)

// 	// localStorage.setItem("drink", quote)
// 	// var pastQuote = localstorage.getItem("drink")
// 	// console.log(drink)	
// }


//////FUNCTION FOR RANDOM DRINK---------------------------------------------
function randomDrink() {

	fetch('https://the-cocktail-db.p.rapidapi.com/random.php', options)
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


// PREVIOUS AND NEXT ITEM FUNCTIONS:??????????????????????????????
// var quoteHistory = [] this are in global scope already above
// var drinkHistory =[] this are in global scope already above

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



// LOCAL STORAGE AT END OF FUNCITON???????????????????????????????
// var quoteHistory = [] this are in global scope already above
// var drinkHistory =[] this are in global scope already above

// 	localStorage.setItem("quote", quote)
// 	var pastQuote = localstorage.getItem("quote")
// 	console.log(pastQuote)

// 	localStorage.setItem("drink", quote)
// 	var pastQuote = localstorage.getItem("drink")
// 	console.log("drink")
// }


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
	document.getElementById("drink-box").style.display = "content";

	randomDrink();
})
// WILL RUN SELECT DRINK FUNCTION---------------------------------
$("#menuBtn").on('click', function (event) {
	event.preventDefault();
	document.getElementById("greeting").style.display = "none";
	document.getElementById("drink-box").style.display = "content";

	selectDrink();
})


// // RETREIVE FROM LOCAL STORAGE?????????????????????????????????
// $("#prevBtn").on('click', function (event) {
// 	event.preventDefault();
// 	document.getElementById("greeting").style.display = "none";
// 	document.getElementById("drink-box").style.display = "content";
// 	document.getElementById("drinkCards").style.display = "none";

// 	prevItem();
// })


// RETREIVE FROM LOCAL STORAGE???????????????????????????????
// $("#nextBtn").on('click', function (event) {
// 	event.preventDefault();
// 	document.getElementById("greeting").style.display = "none";
// 	document.getElementById("drink-box").style.display = "content";
// 	document.getElementById("drinkCards").style.display = "none";
// }
// // 	nextItem();

// // })

// // WILL RETURN USER TO INTRO PAGE---------------------------------
// $("#NewBtn").on('click', function (event) {
// 	event.preventDefault();
// 	document.getElementById("greeting").style.display = "content";
// 	document.getElementById("drink-box").style.display = "none";
// 	document.getElementById("drinkCards").style.display = "none";
// })


// // EVENT LISTENERS FOR 6 CHOICES----------------------------------

// $("#card2").on('click', function (event) {

// 	document.getElementById("drink-box").style.display = "content";
// 	document.getElementById("drinkCards").style.display = "none";
// 	event.preventDefault();
// 	var DrinkId =
// 		getDrink()
// })

// $("#card3").on('click', function (event) {

// 	document.getElementById("drink-box").style.display = "content";
// 	document.getElementById("drinkCards").style.display = "none";
// 	event.preventDefault();

// 	getDrink()
// })

// $("#card4").on('click', function (event) {

// 	document.getElementById("drink-box").style.display = "content";
// 	document.getElementById("drinkCards").style.display = "none";
// 	event.preventDefault();

// 	getDrink()
// })

// $("#card5").on('click', function (event) {

// 	document.getElementById("drink-box").style.display = "content";
// 	document.getElementById("drinkCards").style.display = "none";
// 	event.preventDefault();

// 	getDrink()
// })

// $("#card6").on('click', function (event) {

// 	document.getElementById("drink-box").style.display = "content";
// 	document.getElementById("drinkCards").style.display = "none";
// 	event.preventDefault();

// 	getDrink(){}

$("#card1").on('click', function (event) {
	event.preventDefault();
	var id= $(this).data('data-id')
	
	console.log(id)


	// if(){	
	// 	var id = document.getElementById("card1");
	// 	var idAtt= id.getAttribute("data-id");
	// 	console.log(idAtt);

	// }	
	
	// if(event.target.matches('a')){
	// 		return getAttribute("data-id").document.getElementById()
	// 	}
	// if(event.target.matches('a')){
	// 	return getAttribute("data-id").document.getElementById()
	// }if(event.target.matches('a')){
	// 	return getAttribute("data-id").document.getElementById()
	// }
	// if(event.target.matches('a')){
	// 	return getAttribute("data-id").document.getElementById()
	// }
	// if(event.target.matches('a')){
	// 	return getAttribute("data-id").document.getElementById()
	// }


	document.getElementById("drink-box").style.display = "content";
	document.getElementById("drinkCards").style.display = "none";
})		
