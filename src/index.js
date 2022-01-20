import React from 'react';
import ReactDOM from 'react-dom';

const SCALE_NAMES = {
	c: 'Celcius',
	f: 'Fahrenheit',
};

function toCelcius(fahrenheit) {
	return ((fahrenheit - 32) * 5) / 9;
}

function toFahrenheit(celcius) {
	return (celcius * 9) / 5 + 32;
}

function tryConvert(temperature, convertMethod) {
	const input = parseFloat(temperature);
	if (!(input && isFinite(input))) return;
	const output = convertMethod(input);
	const rounded = Math.round(output * 1000) / 1000;
	return rounded.toString();
}

class BoilingVerdict extends React.Component {
	render() {
		if (this.props.celcius >= 100) {
			return <p>The water would boil.</p>;
		} else {
			return <p>The water would not boil.</p>;
		}
	}
}

class TemperatureInput extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		// this.state = { temperature: '' };
	}

	handleChange(e) {
		// this.setState({ temperature: e.target.value });
		this.props.onTemperatureChange(e.target.value);
	}

	render() {
		// const temperature = this.state.temperature;
		const temperature = this.props.temperature;
		const scale = this.props.scale;
		return (
			<fieldset>
				<legend>Enter temperature in {SCALE_NAMES[scale]}:</legend>
				<input type='text' value={temperature} onChange={this.handleChange} />
			</fieldset>
		);
	}
}

class Calculator extends React.Component {
	constructor(props) {
		super(props);
		this.handleCelciusChange = this.handleCelciusChange.bind(this);
		this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
		this.state = {
			scale: 'c',
			temperature: '',
		};
	}

	handleCelciusChange(temperature) {
		this.setState({
			scale: 'c',
			temperature,
		});
	}

	handleFahrenheitChange(temperature) {
		this.setState({
			scale: 'f',
			temperature,
		});
	}

	render() {
		const scale = this.state.scale;
		const temperature = this.state.temperature;
		const celcius =
			scale === 'f' ? tryConvert(temperature, toCelcius) : temperature;
		const fahrenheit =
			scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
		return (
			<div>
				<TemperatureInput
					scale='c'
					temperature={celcius}
					onTemperatureChange={this.handleCelciusChange}
				/>
				<TemperatureInput
					scale='f'
					temperature={fahrenheit}
					onTemperatureChange={this.handleFahrenheitChange}
				/>
				<BoilingVerdict celcius={parseFloat(celcius)} />
			</div>
		);
	}
}

ReactDOM.render(
	<React.StrictMode>
		<Calculator />
	</React.StrictMode>,
	document.getElementById('root')
);
