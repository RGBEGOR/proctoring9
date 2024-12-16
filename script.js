const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");

class Quiz
{
	constructor(type, questions, results)
	{

		this.type = type;

		this.questions = questions;

		this.results = results;

		this.score = 0;

		this.result = 0;

		this.current = 0;
	}

	Click(index)
	{
		let value = this.questions[this.current].Click(index);
		this.score += value;

		let correct = -1;


		if(value >= 1)
		{
			correct = index;
		}
		else
		{

			for(let i = 0; i < this.questions[this.current].answers.length; i++)
			{
				if(this.questions[this.current].answers[i].value >= 1)
				{
					correct = i;
					break;
				}
			}
		}

		this.Next();

		return correct;
	}


	Next()
	{
		this.current++;
		
		if(this.current >= this.questions.length) 
		{
			this.End();
		}
	}


	End()
	{
		for(let i = 0; i < this.results.length; i++)
		{
			if(this.results[i].Check(this.score))
			{
				this.result = i;
			}
		}
	}
} 


class Question 
{
	constructor(text, answers)
	{
		this.text = text; 
		this.answers = answers; 
	}

	Click(index) 
	{
		return this.answers[index].value; 
	}
}


class Answer 
{
	constructor(text, value) 
	{
		this.text = text; 
		this.value = value; 
	}
}


class Result 
{
	constructor(text, value)
	{
		this.text = text;
		this.value = value;
	}


	Check(value)
	{
		if(this.value <= value)
		{
			return true;
		}
		else 
		{
			return false;
		}
	}
}


const results = 
[
	new Result("Ну это прям позор", 0),
	new Result("Ну уже неплохо", 3),
	new Result("Ваш уровень выше среднего", 4),
	new Result("Поздравляем Вы успешно усвоили эту тему", 5)
];

const questions = 
[
	new Question("Кто является автором известной Парижской башни, ставшей символом французской столицы?", 
	[
		new Answer('Жозеф Борель', 0),
		new Answer("Гюстав Эйфель", 1),
		new Answer("М.Скобелев", 0),
		new Answer("Альфред Броколи", 0)
	]),
	new Question("В каком году начался штурм города Андижан под командованием генерала М.Скобелева?", 
	[
		new Answer('1680', 0),
		new Answer("1867", 1),
		new Answer("1864", 0),
		new Answer("1898", 0)
	]),
	new Question("Когда было принято Положение о мерах к охранению государственного порядка и общественного спокойствия?", 
	[
		new Answer('1889', 0),
		new Answer("1881", 1),
		new Answer("1900", 0),
		new Answer("1898", 0)
	]),
	new Question("Какое открытое письмо было опубликовано Эмилем Золя 13 января 1898 года?", 
	[
		new Answer('Моя жалоба', 0),
		new Answer("Я обвиняю", 1),
		new Answer("Письмо к народу", 0),
		new Answer("В защиту правды", 0)
	]),
	new Question("Определите даты существовования Антанты, объединяющая Англию, Францию и Россию?", 
	[
		new Answer('1898-1901', 0),
		new Answer("1914-1918", 0),
		new Answer("40 лет", 0),
		new Answer("1904-1907", 1)

	]),
];


const quiz = new Quiz(1, questions, results);

Update();


function Update()
{

	if(quiz.current < quiz.questions.length) 
	{

		headElem.innerHTML = quiz.questions[quiz.current].text;


		buttonsElem.innerHTML = "";


		for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++)
		{
			let btn = document.createElement("button");
			btn.className = "button";

			btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

			btn.setAttribute("index", i);

			buttonsElem.appendChild(btn);
		}
		

		pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;

		Init();
	}
	else
	{

		buttonsElem.innerHTML = "";
		headElem.innerHTML = quiz.results[quiz.result].text;
		pagesElem.innerHTML = "Ваши очки: " + quiz.score;
	}
}

function Init()
{

	let btns = document.getElementsByClassName("button");

	for(let i = 0; i < btns.length; i++)
	{

		btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
	}
}

function Click(index) 
{

	let correct = quiz.Click(index);


	let btns = document.getElementsByClassName("button");


	for(let i = 0; i < btns.length; i++)
	{
		btns[i].className = "button button_passive";
	}

	if(quiz.type == 1)
	{
		if(correct >= 0)
		{
			btns[correct].className = "button button_correct";
		}

		if(index != correct) 
		{
			btns[index].className = "button button_wrong";
		} 
	}
	else
	{

		btns[index].className = "button button_correct";
	}


	setTimeout(Update, 1000);
}


let stcard = document.querySelectorAll(".stcard"), rotate;
for(let i = 0; i < stcard.length; i++){
    rotate = Math.random() * 5 * (Math.round(Math.random()) ? 1 : -1);
    stcard[i].style.transform = "rotate("+ rotate +"deg)";
}