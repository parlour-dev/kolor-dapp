import Switch from "react-switch";
import React, { Component } from "react";
import ReactGa from "react-ga";

class Slider extends Component {
	constructor() {
		super();
		this.state = { checked: false };
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(checked) {
		this.setState({ checked });
		console.log("NSFWChange");
		ReactGa.event({
			category: "User status",
			action: "NSFWChange",
		});
	}

	render() {
		return (
			<div className="example">
				<label htmlFor="material-switch">
					<Switch
						checked={this.state.checked}
						onChange={this.handleChange}
						onColor="#86d3ff"
						onHandleColor="#2693e6"
						handleDiameter={30}
						uncheckedIcon={false}
						checkedIcon={false}
						height={20}
						width={48}
						className="react-switch"
						id="material-switch"
					/>
				</label>
			</div>
		);
	}
}

export default Slider;
