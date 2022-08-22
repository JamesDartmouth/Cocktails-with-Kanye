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

function selectDrink() {

	const options = {
		method: "GET",
		headers: {
		  "X-RapidAPI-Key": "34bfbcce05msh118f7d7c2830c51p14f9d6jsna024c8daa8cb",
		  "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
		},
	  };
	  
	
	var liquor = "vodka"
	
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
      // displayDrinks(liquorArr);
      // console.log(liquorArr[5].idDrink)
      // console.log(data)
	  displayDrinks(liquorArr)
		})
}	


var page = 1;
var limit = 6;
var numPages = 3;

function displayDrinks(liquorArr){

			document.getElementById("name1").textContent = liquorArr[0].strDrink;
			document.getElementById("pic1").src = liquorArr[0].strDrinkThumb;
			document.getElementById("card1").setAttribute("data-id", liquorArr[0].idDrink)

			document.getElementById("name2").textContent = liquorArr[1].strDrink;
			document.getElementById("pic2").src = liquorArr[1].strDrinkThumb;
			document.getElementById("card1").setAttribute("data-id", liquorArr[1].idDrink)

			document.getElementById("name3").textContent = liquorArr[2].strDrink;
			document.getElementById("pic3").src = liquorArr[2].strDrinkThumb;
			document.getElementById("card1").setAttribute("data-id", liquorArr[2].idDrink)

			document.getElementById("name4").textContent = liquorArr[3].strDrink;
			document.getElementById("pic4").src = liquorArr[3].strDrinkThumb;
			document.getElementById("card1").setAttribute("data-id", liquorArr[3].idDrink)

			document.getElementById("name5").textContent = liquorArr[4].strDrink;
			document.getElementById("pic5").src = liquorArr[4].strDrinkThumb;
			document.getElementById("card1").setAttribute("data-id", liquorArr[4].idDrink)

			document.getElementById("name6").textContent = liquorArr[5].strDrink;
			document.getElementById("pic6").src = liquorArr[5].strDrinkThumb;
			document.getElementById("card1").setAttribute("data-id", liquorArr[5].idDrink)
}

document.getElementById("nextSix").addEventListener("click", function(){
if (page <= numPages){
	page++
	displayDrinks (paginate (liquorArr, 6, page));
	if (page === numPages){
		document.getElementById("nextSix").disabled = true;
		document.getElementById("prevSix").disabled = false;
	}
}
});


document.getElementById("prevSix").addEventListener("click", function(){
	if (page <= numPages){
		page--
		displayDrinks (paginate (liquorArr, 6, page));
		if (page === 1){
			document.getElementById("prevSix").disabled = true;
			document.getElementById("nextSix").disabled = false;
		}
	}
});

function paginate (array, pageSize, pageNum) {
return array.slice ((pageNum-1)*pageSize, pageNum*pageSize);
}


function getDrink() {	

	var drinkEl = document.getElementById('drinkCards')
	var drinkId= drinkEl.getAttribute('data-id')
	console.log(drinkId)

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
}
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

	// PREVIOUS AND NEXT ITEM FUNCTIONS:??????????????????????????????
	// var quoteHistory = [] this are in global scope already above
	// var drinkHistory =[] this are in global scope already above


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
	document.getElementById("quote-recipe-box").style.display = "block";
	
	randomDrink();
})

// WILL RUN SELECT DRINK FUNCTION---------------------------------
$("#menuBtn").on('click', function (event) {
	event.preventDefault();
	document.getElementById("greeting").style.display = "none";
	document.getElementById("drinkCards").style.display = "block";

	selectDrink();
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


// // EVENT LISTENERS FOR 6 CHOICES----------------------------------

// $("#card2").on('click', function (event) {

// 	document.getElementById("quote-recipe-box").style.display = "content";
// 	document.getElementById("drinkCards").style.display = "none";
// 	event.preventDefault();
// 	var DrinkId =
// 		getDrink()
// })

// $("#card3").on('click', function (event) {

// 	document.getElementById("quote-recipe-box").style.display = "content";
// 	document.getElementById("drinkCards").style.display = "none";
// 	event.preventDefault();

// 	getDrink()
// })

// $("#card4").on('click', function (event) {

// 	document.getElementById("quote-recipe-box").style.display = "content";
// 	document.getElementById("drinkCards").style.display = "none";
// 	event.preventDefault();

// 	getDrink()
// })

// $("#card5").on('click', function (event) {

// 	document.getElementById("quote-recipe-box").style.display = "content";
// 	document.getElementById("drinkCards").style.display = "none";
// 	event.preventDefault();

// 	getDrink()
// })

// $("#card6").on('click', function (event) {

// 	document.getElementById("quote-recipe-box").style.display = "content";
// 	document.getElementById("drinkCards").style.display = "none";
// 	event.preventDefault();

// 	getDrink(){}


	// if(){	
	// 	var id = document.getElementById("card1");
	// 	var idAtt= id.getAttribute("data-id");
	// 	console.log(idAtt);

	// }	
	
	// if(event.target.matches('a')){
	// 		return getAttribute("data-id").document.getElementById()
	// 	}
	// 	i = i - 1

	// 	console.log(quoteHistory[i]);
	// 	console.log(drinkHistory[i]);

	// 	document.getElementById("quote").textContent = Object.values(quoteHistory[i])
	// 	document.getElementById("drinkName").textContent = drinkHistory[i].strDrink
	// 	document.getElementById("drinkInstr").textContent = drinkHistory[i].strInstructions
	// 	document.getElementById("drinkImg").src = drinkHistory[i].strDrinkThumb
	// }
	// function nextItem() {
	// 	i = i + 1
	// 	i = i % arr.length;

	// 	console.log(quoteHistory[i]);
	// 	console.log(drinkHistory[i]);

	// 	document.getElementById("quote").textContent = Object.values(quoteHistory[i])
	// 	document.getElementById("drinkName").textContent = drinkHistory[i].strDrink
	// 	document.getElementById("drinkInstr").textContent = drinkHistory[i].strInstructions
	// 	document.getElementById("drinkImg").src = drinkHistory[i].strDrinkThumb
	// }



	// WILLL RUN RANDOM DRINK FUNCTION------------------------------
	$("#barBtn").on('click', function (event) {
		event.preventDefault();

		document.getElementById("greeting").style.display = "none";
		document.getElementById("quote-recipe-box").style.display = "block";
		document.getElementById("drinkCards").style.display = "none";
		document.getElementById("drinkBtns").style.display = "none";

		randomDrink();
	})

	$("#yeezy").on('click', function (event) {
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
	$("#menuBtn").on('click', function (event) {
		event.preventDefault();
		document.getElementById("greeting").style.display = "none";

		var menu = document.getElementsByClassName('dropdown-menu')
		// menu.addEventListener("click", function(event){
		// 	event.preventDefault();
			if (menu.value == 'vodka') {
				alert(1);
			  } else if (menu.value == 'whiskey') {
				alert(2);
			  } else if (menu.value == 'Gin') {
				alert(3);
			  }
		// })

		selectDrink();
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


	// // EVENT LISTENERS FOR 6 CHOICES----------------------------------

	// $("#card2").on('click', function (event) {

	// 	document.getElementById("quote-recipe-box").style.display = "content";
	// 	document.getElementById("drinkCards").style.display = "none";
	// 	event.preventDefault();
	// 	var DrinkId =
	// 		getDrink()
	// })

	// $("#card3").on('click', function (event) {

	// 	document.getElementById("quote-recipe-box").style.display = "content";
	// 	document.getElementById("drinkCards").style.display = "none";
	// 	event.preventDefault();

	// 	getDrink()
	// })

	// $("#card4").on('click', function (event) {

	// 	document.getElementById("quote-recipe-box").style.display = "content";
	// 	document.getElementById("drinkCards").style.display = "none";
	// 	event.preventDefault();

	// 	getDrink()
	// })

	// $("#card5").on('click', function (event) {

	// 	document.getElementById("quote-recipe-box").style.display = "content";
	// 	document.getElementById("drinkCards").style.display = "none";
	// 	event.preventDefault();

	// 	getDrink()
	// })

	// $("#card6").on('click', function (event) {

	// 	document.getElementById("quote-recipe-box").style.display = "content";
	// 	document.getElementById("drinkCards").style.display = "none";
	// 	event.preventDefault();

	// 	getDrink(){}

	$("#card1").on('click', function (event) {
		event.preventDefault();
		var id = document.getElementById('card1')
		var drinkSet= id.getAttribute('data-id')

		document.getElementById("drinkCards").setAttribute("data-id", drinkSet)

		console.log(drinkSet)
		console.log(typeof drinkSet)
	
		getDrink()

		document.getElementById("quote-recipe-box").style.display = "block";
		document.getElementById("drinkCards").style.display = "none";
		document.getElementById("greeting").style.display = "none";
		document.getElementById("randomDrinkBtns").style.display = "none";
	})

	
	// 	// if(){	
	// 	// 	var id = document.getElementById("card1");
	// 	// 	var idAtt= id.getAttribute("data-id");
	// 	// 	console.log(idAtt);

	// 	// }	

	// 	// if(event.target.matches('a')){
	// 	// 		return getAttribute("data-id").document.getElementById()
	// 	// 	}
	// 	// if(event.target.matches('a')){
	// 	// 	return getAttribute("data-id").document.getElementById()
	// 	// }if(event.target.matches('a')){
	// 	// 	return getAttribute("data-id").document.getElementById()
	// 	// }
	// 	// if(event.target.matches('a')){
	// 	// 	return getAttribute("data-id").document.getElementById()
	// 	// }
	// 	// if(event.target.matches('a')){
	// 	// 	return getAttribute("data-id").document.getElementById()
	// 	// }