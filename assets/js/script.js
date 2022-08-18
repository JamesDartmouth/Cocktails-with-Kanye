var slideEl = document.getElementById("slide")
var drinkHistory = []

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '34bfbcce05msh118f7d7c2830c51p14f9d6jsna024c8daa8cb',
		'X-RapidAPI-Host': 'the-cocktail-db.p.rapidapi.com'
	}
};

// by ingredient

// fetch('https://the-cocktail-db.p.rapidapi.com/filter.php?i=whiskey', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));

function menuDrink() {
}
// document.getElementById("vodka").textContent.value

// ADD EVENT LISTENER TO LISTEN FOR RANDOM OR LIQUOR INPUT---------------------

function randomDrink() {

	fetch('https://the-cocktail-db.p.rapidapi.com/random.php', options)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			var drinkId = data.drinks[0].idDrink

		})
} randomDrink();

function selectDrink() {

	// to be tied to text input or dropdown
	var liquor = "gin"


	fetch('https://the-cocktail-db.p.rapidapi.com/filter.php?i=' + liquor, options)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {

			var liquorArr = [];

			for (var prop in data) {
				if (data[prop]) {
					liquorArr.push(data[prop]);
				}
			}
			console.log(liquorArr)
		})
		// .then(function (data)){
	// 	var randomLiquor = data[Math.floor(Math.random() * favorites.length)]
	// 	var sixLiquor = []
	// 	for (var i = 0; i < 6; i++) {
	// 		sixLiquor.push(randomLiquor[i])
	// 		// append childern here
	// 	}
	// 	console.log(sixLiquor)
	// }

	// advent listener here to select liquor and run function(get drinkData)

} 
selectDrink();


// GETS DRINK DATA AND POPULATES CONTENT CARD

var drinkId = "15300"

function getDrinkData() {
	// fetch('https://the-cocktail-db.p.rapidapi.com/random.php', options)
	fetch('https://the-cocktail-db.p.rapidapi.com/lookup.php?i=' + drinkId, options)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {

			// console.log(data.drinks[0].strIngredient1)

			var drinkIng = []
			var drinkAmt = []
			var drinkData = data.drinks[0]
			var drinkPic = data.drinks[0].strDrinkThumb
			var drinkName = data.drinks[0].strDrink
			var drinkInstruc = data.drinks[0].strInstructions
			var dIng = data.drinks[0].strIngredient1
			var dAmt = data.drinks[0].strMeasure1
			var ingredients = [];
			var measures = [];
			console.log(data)

			for (var prop in drinkData) {
				if (drinkData[prop]) {
					if (prop.includes('strIngredient')) {
						ingredients.push(drinkData[prop]);
					} else if (prop.includes('strMeasure')) {
						measures.push(drinkData[prop]);
					}
				}
			}

			var ulEl = document.getElementById("drinkIngre")

			// for (var i= 0; i<ingredients.length; i++){
			// 	 for(var j=0; j<measures.length; j++){
			// 		var liEl=document.createElement('li');
			// 	liEl.textContent = ingredients[i] + measures[j];
			//     ulEl.appendChild(liEl);}


			

			for (var i = 0; i < ingredients.length; i++) {
				var liEl = document.createElement('li');
				liEl.textContent = measures[i] ? ingredients[i] + ': ' + measures[i] : ingredients[i];

				// if (measures[i]) {
				// 	liEl.textContent = ingredients[i] + ': ' + measures[i];
				// } else {
				// 	liEl.textContent = ingredients[i];
				// }
				ulEl.appendChild(liEl);
			}

			// for (var i = 0; i < ingredients.length; i++) {
			// 	liEl.textContent = ingredients[i] + measures[j];
			// }
			// for (var j = 0; j < measures.length; j++) {
			// 	liEl.textContent = ingredients[i] + measures[j];
			// }
			
			console.log(liEl)


			console.log(ingredients);
			console.log(measures);


			document.getElementById("drinkName").textContent = drinkName
			// document.getElementById("drinkIngre").textContent= dIng+ dAmt
			document.getElementById("drinkInstr").textContent = drinkInstruc
			document.getElementById("drinkImg").src = drinkPic
		})
}
getDrinkData();

// GENERATES QUOTE TO POPULATE CONTENT CARD

function getQuote() {

	fetch('https://api.kanye.rest')
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			var quote = Object.values(data)
			document.getElementById("quote").textContent = quote
		})

}
getQuote();


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



// // }
