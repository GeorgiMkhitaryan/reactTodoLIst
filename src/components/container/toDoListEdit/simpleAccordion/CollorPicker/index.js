import React from 'react';
import { SketchPicker } from 'react-color';
import "./index.css"

export default class ColorPicker extends React.Component {
    state = {
        background: '#fff',
    };
    handleChangeComplete = (color) => {
        this.setState({ background: color.hex });
    };
  render() {
    return(
        <div className="ColorPicker">
            <SketchPicker
                color={ this.state.background }
                onChangeComplete={ (color) => {
                    this.handleChangeComplete(color);
                    this.props.onChangeColorTodo(this.state.background)
                } }
            />
        </div>
    )
  }
}