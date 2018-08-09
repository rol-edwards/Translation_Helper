import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Word extends React.Component {
	constructor(props){
		super(props);
		this.focusPanel = this.focusPanel.bind(this)
	}

	focusPanel () {
		this.props.onClick(this.props.word)
	}

	render () {
		var word = this.props.word;
		if (word.display == 'word'){
			return (
				<button onClick={() => this.focusPanel()}>
				<p>{this.props.word.word}</p>
				<p>{this.props.word.translation}</p>
				<p>{this.props.word.part_of_speech}</p>
				<p>{this.props.word.notes}</p>
				</button>
			)
		}
		else if (word.display == 'translation'){
			return (
				<button onClick={() => this.focusPanel()} className='translation'>{this.props.word.translation} </button>
			)
		}
		else if (word.display == 'part_of_speech'){
			return (
				<button onClick={() => this.focusPanel()} className='part'>{this.props.word.part_of_speech}</button>
			)
		}
		else if (word.display == 'notes'){
			return (
				<button onClick={() => this.focusPanel()} className='part'>{this.props.word.notes}</button>
			)
		}

		else if (word.display == 'root'){
			return (
				<button onClick={() => this.focusPanel()} className='part'>{this.props.word.root}</button>
			)
		}

		else {
			return (
				<button></button>
				)
		}
	}
}

class Translation extends React.Component {
	//props: vocab, focusPanel

	render () {

		const words = [];
		const translated = [];
		const r2l = this.props.r2l;
		var words_element = '';
		
		for (var i = 0; i < this.props.vocab.length; i++){
			words.push(<Word 
				word={this.props.vocab[i]}
				onClick={this.props.focusPanel}
				/>)
		};

		for (var i = 0; i < this.props.vocab.length; i++){
			translated.push(<span>{this.props.vocab[i].translation} </span>)
		};

		
		if (r2l){
			 words_element = (
				<div class = 'rtl'>
					{words}
				</div>
			)
		}
		else {
			 words_element = (
				<div class='button'>
					<div class='text'>
						{words}
					</div>
					{/*<div class='text'>
						{translated}
					</div>*/}
				</div>
			)
		}
		
		return (
			<div>
				{words_element}
			</div>
		)
		
	}
}

class ControlPanel extends React.Component {
	//props: panel_word
	constructor(props){
		super(props);
		this.changePart = this.changePart.bind(this)
		this.translate = this.translate.bind(this)
		this.changeDisplay = this.changeDisplay.bind(this)
		this.changeNotes = this.changeNotes.bind(this)
		this.learnWord = this.learnWord.bind(this)
	};

	changePart(event) {
		console.log('changePart called')
		console.log('this is the value ' + event.target.value)
		this.props.onChange(this.props.word.key, event.target.value)
	};

	translate(input){
		console.log('translate called, new value should be: ' + input.target.value)
		this.props.onTranslate(this.props.word.key, input.target.value)
	};	

	changeNotes(input){
		this.props.onNotes(this.props.word.key, input.target.value)
	};

	changeDisplay(event){
		console.log('this is the value ' + event.target.value);		
		this.props.onDisplayChange([this.props.word.key], event.target.value)
	};

	learnWord(){
		this.props.learnWord(this.props.word.word)
	};

	select(){

	};

	render () {
		var word = this.props.word;
		console.log('display option should be: ' + word.display)
		return (
			<div class='control'>
				<h2>{word.word}</h2>
				<div>
					<button id='learn' onClick={this.learnWord}></button>
					<label for='learn'>Add to new vocab list</label>
				</div>
				<table>
					<tr>
						<td><label for='translation'>Translation</label></td>
						<td><input type='text' id='translation' value={word.translation} onChange={this.translate}></input></td>
					</tr>
					<tr>
						<td><label for='part'>Part of speech</label></td>
						<td>
							<select id='part' onChange={this.changePart} value={word.part_of_speech}>
								<option>Select</option>
								<option value='noun'>Noun</option>
								<option value='verb'>Verb</option>
								<option value='adjective'>Adjective</option>
								<option value='adverb'>Adverb</option>
								<option value='pronoun'>Pronoun</option>
								<option value='conjunction'>Conjunction</option>
							</select>
						</td>
					</tr>
					<tr>
						<td><label for='notes'>Notes</label></td>
						<td><textarea id='notes' onChange={this.changeNotes}  value={word.notes}></textarea></td>
					</tr>
					<tr>
						<td>
							<label for='id'>Display options:</label>
						</td>
						<td>
							<select id='select' onChange={this.changeDisplay} value={word.display}>
								<option  value='word'>Word</option>
								<option value='translation'>Translation</option>
								<option value='part_of_speech'>Part of speech</option>
								<option value='hide'>Hide word</option>
								<option value='learn'>Learn</option>
							</select>
						</td>
					</tr>
				</table>
				
				
				
			</div>
		)
	};
}

class SelectPanel extends React.Component{

	selectOff(){
		this.props.off()
	};

	changeDisplay(event){

		console.log('this is the value ' + event.target.value)		
		this.props.onDisplayChange([this.range], event.target.value)
	}
}

class Text extends React.Component{
	constructor(props){
		super(props);
		this.parseText = this.parseText.bind(this)
		this.rToL = this.rToL.bind(this)
	}

	rToL(){
		this.props.onClick()
	}

	parseText(input){
		this.props.onChange(input.target.value)
	}
	render(){
		return(
			<div class='input_div'>
				<div>
					<p>Please enter text you are translating:</p>
				</div>
				<div>
					<textarea class='input' id='input' onChange={this.parseText}></textarea>
				</div>
				<div>
					<input type='checkbox' id='r2l' onClick={this.rToL}></input>
					<label for='r2l'>Check if should be read right to left</label>
				</div>
				
			</div>
		)
	}
}

class NewVocabList extends React.Component {
	constructor(props){
		super(props);
	}

	render(){

		var vocab = [];
		this.props.vocab.forEach(function(word){
			vocab.push(<p>{word.word} {word.count}</p>)
		})
		return (
			<div class='new_vocab'>
				<h2>To Learn:</h2>
				{vocab}
			</div>
		)
	}
}

class Page extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			vocab: [
			{key: 1, word: 'Je', translation: 'I', part_of_speech: 'pronoun', notes: '', display: 'word'}, 
		 	{key: 2, word: 'suis', translation: 'am', part_of_speech: 'verb', notes: '', display: 'word'},
		 	{key: 3, word: 'Anglais', translation: 'English', part_of_speech: 'adjective', notes: '', display: 'word'}
		 ],
			panel_word: {word: '', translation: '', part_of_speech: '', notes: ''},
			r2l: false,
			to_learn: [],
			selections: [],
			select_state: 'off',
			select_range: []
			
		}

		this.focusPanel = this.focusPanel.bind(this)
		this.changePart = this.changePart.bind(this)
		this.translate = this.translate.bind(this)
		this.changeNotes = this.changeNotes.bind(this)
		this.changeDisplay = this.changeDisplay.bind(this)
		this.parseText = this.parseText.bind(this)
		this.rToL = this.rToL.bind(this)
		this.learnWord = this.learnWord.bind(this)

	}
	
	focusPanel(word){
		this.setState({panel_word: word})

	}

	changePart(key, part){
		var new_vocab = this.state.vocab;
		new_vocab.forEach(function(word){
			if (word.key == key){
				word.part_of_speech = part;
			};
		});
		this.setState({vocab: new_vocab})
	}

	translate(key, translation){
		var new_vocab = this.state.vocab;
		new_vocab.forEach(function(word){
			if (word.key == key){
				word.translation = translation;
			};
		});
		this.setState({vocab: new_vocab})
	}

	changeNotes(key, notes){
		console.log('changeNotes called, note is: ' + notes)
		var new_vocab = this.state.vocab;
		new_vocab.forEach(function(word){
			if (word.key == key){
				word.notes = notes;
			};
		});
		this.setState({vocab: new_vocab})
	}
	

	changeDisplay(key, display){
		console.log('changeDisplay called in root, key is ' + key + ', display is ' + display)

		var new_vocab = this.state.vocab;
		new_vocab.forEach(function(word){
			if (word.key == key){
				word.display = display;
			};
		});
		this.setState({vocab: new_vocab})
	}
	

	parseText(text){

		var parsed = text.split(" ");
		console.log('parsed starts out as ' + parsed)
		var new_vocab = [];
		
		for (var i = 0; i < parsed.length; i ++){
			var stats = {key: i, word: parsed[i], translation: '', part_of_speech: '', display: 'word', notes: '', root: ''};
			new_vocab.push(stats);
		}
		this.setState({vocab: new_vocab})

	};

	rToL(){
		var newR2L = !this.state.r2l
		this.setState({r2l: newR2L})
	}


	learnWord(new_word){
		var to_learn = this.state.to_learn;
		var words = [];
		var changes = false;
		to_learn.forEach(function(word){
			if (word.word == new_word){
				word.count += 1;
				changes = !changes;
			}
		})
		if (!changes){
			to_learn.push({word: new_word, count: 1})
		}
		this.setState({to_learn: to_learn})
	}

	startSelect(word){
		var range = [word.key]
		this.setState({select_range: range, select_state: 'start'})
	}

	endSelect(word){
		var range = this.state.select_range;
		range.push(word.key)
		this.setState({select_range: range, select_state: 'end'})
	}

	selectOff(){
		this.setState({select_range: [], select_state: 'off'})
	}
	render () {
		var control = [];
		if (this.state.select_state == 'end'){
			 control.push(
			<ControlPanel
					word={this.state.panel_word}
					onChange={this.changePart}
					onTranslate={this.translate}
					onDisplayChange={this.changeDisplay}
					onNotes={this.changeNotes}
					learnWord={this.learnWord}
					select_option={this.state.select.on}
					/>
			)
		}
		else {
			control.push(
				<SelectPanel
				range={this.select_range}/>
			)
			
		}
		return (
			<div>
				<div class='top'>
					<div>
						<p class='menu'>LOGIN</p>
					</div>
					<div>
						<h1>TRANSLATION HELPER</h1>
					</div>
					<div>	
						<p class='menu'>MENU</p>
					</div>
				</div>
				<Text
					onChange={this.parseText}
					onClick={this.rToL}
				/>
				<ControlPanel
					word={this.state.panel_word}
					onChange={this.changePart}
					onTranslate={this.translate}
					onDisplayChange={this.changeDisplay}
					onNotes={this.changeNotes}
					learnWord={this.learnWord}
					/>
				<Translation 
					vocab={this.state.vocab}
					focusPanel={this.focusPanel}
					r2l={this.state.r2l}
				/>
				<NewVocabList
					vocab={this.state.to_learn}
				/>
			</div>

		)
	}
}


ReactDOM.render(
	<Page />,
	document.getElementById('root')
	)


/*

Ideas:

could abstract out a clause, put it below the rest

*/


