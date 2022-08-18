// var slideEl = document.getElementById("slide")
var quoteHistory = []
var drinkHistory =[]
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

	var liquor = "gin"
	var drinkId = "15300"


	fetch('https://the-cocktail-db.p.rapidapi.com/filter.php?i=' + liquor, options)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			// console.log(data.drinks[2])
			// var liquorArr =[]
			
			// for( var i=0; i<data.drinks.length; i ++){
			// 	liquorArr.push(JSON.stringify(data.drinks[i]))
			// }
			// console.log(parse(liquorArr))

			// var liquorArr = [];
			// var randomLiquor = Math.floor(Math.random() * liquorArr.length)
			// var selectLiquor = liquorArr[randomLiquor]
			// // var sixLiquor = []

		// 	for (var i = 0; i < 6; i++) {
		// 	sixLiquor.push(randomLiquor[i])
		// 	}	
		// 	for (var prop in data.drinks) {
		// 		if (data.drinks[prop]) {
		// 			liquorArr.push(data.drinks[prop]);
		// 		}
		// 	}

			var rand1 = data.drinks[0]
			var rand2 = data.drinks[1]
			var rand3 = data.drinks[2]
			var rand4 = data.drinks[3]
			var rand5 = data.drinks[4]
			var rand6 = data.drinks[5]

			console.log(rand4)

			document.getElementById("name1").textContent = drinkName
			document.getElementById("drinkInstr").textContent = drinkInstruc
			document.getElementById("pic1").src = data.drinks[0].strDrinkThumb


		})

} 
selectDrink();

// Need alt tags on picutres????????????????????????????
// FUNCTION GETS SELECTED DRINK FROM 6 CHOICES

var drinkId = "15300"

function getDrink() {

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

	localStorage.setItem("quote", quote)
	var pastQuote = localstorage.getItem("quote")
	console.log(pastQuote)

	localStorage.setItem("quote", quote)
	var pastQuote = localstorage.getItem("quote")
	console.log(pastQuote)	
}


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
		})

// LOCAL STORAGE AT END OF FUNCITON???????????????????????????????

	localStorage.setItem("quote", quote)
	var pastQuote = localstorage.getItem("quote")
	console.log(pastQuote)

	localStorage.setItem("quote", quote)
	var pastQuote = localstorage.getItem("quote")
	console.log(pastQuote)
}

// WILLL RUN SELECT DRINK FUNCTION------------------------------
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

	getDrink();
})


	// RETREIVE FROM LOCAL STORAGE?????????????????????????????????
$("#prevBtn").on('click', function (event) {
	event.preventDefault();

})


	// RETREIVE FROM LOCAL STORAGE???????????????????????????????
$("#nextBtn").on('click', function (event) {
	event.preventDefault();

})

// WILL RETURN USER TO INTRO PAGE---------------------------------
$("#NewBtn").on('click', function (event) {
	event.preventDefault();
	document.getElementById("greeting").style.display = "content";
	document.getElementById("drink-box").style.display = "none";
})
















// TO ALPHABETIZE
// let array = ['cheese', 'corn', 'apple', 'acorn', 'beet', 'banana', 'yam', 'yucca']
// let dict = array.reduce((a, c) => {
//     // c[0] should be the first letter of an entry
//     let k = c[0].toLocaleUpperCase()
//     // either push to an existing dict entry or create one
//     if (a[k]) a[k].push(c)
//     else a[k] = [c]
//     return a
// }, {})
// console.log(dict)
// // Get the A's
// console.log(dict['A'])


