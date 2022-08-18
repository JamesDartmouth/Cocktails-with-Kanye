const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '34bfbcce05msh118f7d7c2830c51p14f9d6jsna024c8daa8cb',
		'X-RapidAPI-Host': 'the-cocktail-db.p.rapidapi.com'
	}
};

// random

// fetch('https://the-cocktail-db.p.rapidapi.com/random.php', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));


// by ingredient

// fetch('https://the-cocktail-db.p.rapidapi.com/filter.php?i=whiskey', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));

function gettingDrink(){


}	

var drinkId = "15300"

function getDrinkData(){
	fetch('https://the-cocktail-db.p.rapidapi.com/random.php', options)
	// fetch('https://the-cocktail-db.p.rapidapi.com/lookup.php?i='+ drinkId, options)
	.then(function(response){
		return response.json();
	})
	.then(function(data){
		
		// console.log(data.drinks[0].strIngredient1)
		
		var drinkIng = []
		var drinkAmt = []
		var drinkData = data.drinks[0]
		var drinkPic = data.drinks[0].strDrinkThumb
		var drinkName = data.drinks[0].strDrink
		var drinkInstruc = data.drinks[0].strInstructions
		var dIng = data.drinks[0].strIngredient1
		var dAmt = data.drinks[0].strMeasure1

		console.log(data)
		// console.log(data.drinks[0].strDrink)
		// console.log(data.drinks[0])
		// console.log(typeof drinkName)

		// for(var i= 12; i< 27; i++){
		// 	// var valdrinkData = Object.values(drinkData)
		// 	drinkIng.push(drinkData[i])						
		// 	// var drinkIngArr = Object.values(drinkIng)	
		// }

		// console.log(drinkIng)

		// for(var i= 34; i< 49; i++){
			
		// 	drinkAmt.push(drinkData[i])					
		// 	// var drinkAmtArr = Object.values(drinkAmt)		
		// }
		
		// console.log(drinkAmt)
	
		drinkIng.push(drinkData)
		console.log(drinkIng)

		console.log(drinkData)


		
		document.getElementById("drinkName").textContent= drinkName
		document.getElementById("drinkIngre").textContent= dIng+ dAmt
		document.getElementById("drinkInstr").textContent= drinkInstruc
		document.getElementById("drinkImg").src= drinkPic
	})
}
getDrinkData();


function getQuote(){

	fetch('https://api.kanye.rest')
	.then(function(response){
    return response.json();
	})
	.then(function(data){
	var quote = Object.values(data)
	document.getElementById("quote").textContent=quote
	})
	
}
getQuote();

var questions = [
	{
		question: 'How was your day?',
		options: ['Good', 'Bad', 'Average', 'Terrible'],
	},
	{
		question: 'What flavor are you looking for?',
		options: ['Sweet', 'Savory', 'Salty', 'Strong'],
	},
	{
		question: 'What alcohol source you want?',
		options: ['Rye', 'Berries', 'Malt', 'Rice'],
	},
]

function renderCurrentQuestion() {
	anotherContainer.innerHTML = '';
	var currentQuestion = questions[currentQuestionIndex];

	var header = document.createElement('h1');
	header.textContent = currentQuestion.question;
	anotherContainer.appendChild(header);

	var ulEl = document.createElement('ul');

	for (var i = 0; i < currentQuestion.options.length; i++) {
		var liEl = document.createElement('li');
		liEl.textContent = currentQuestion.options[i];
		ulEl.appendChild(liEl);
	}

	anotherContainer.appendChild(ulEl);

}

renderCurrentQuestion();

// // $("#drinkBtn").on('click', getQuote)

// // var newQuote = $(".quote")

// // function getQuote(){
// //     var newQuote = $(".quote")
// //     fetch('https://api.kanye.rest')
// // 	.then(response => response.json())
// //     .then(function(data){
// //         newQuote.textContent = data.quote;
// //     })
// // 	.then(response => console.log(response))
// // 	.catch(err => console.error(err));


// // }
