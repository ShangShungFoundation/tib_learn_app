import React, { Component } from 'react';
import { SketchPicker } from 'react-color';
import { Link } from 'react-router-dom'

function copyToClipboard(text) {
    if (window.clipboardData && window.clipboardData.setData) {
        // IE specific code path to prevent textarea being shown while dialog is visible.
        // return clipboardData.setData("Text", text); 

    } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy");  // Security exception may be thrown by some browsers.
        } catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        } finally {
            document.body.removeChild(textarea);
        }
    }
}


export default class ExportWidget extends Component {
    code = ''

    constructor(props){
        super(props)
        this.state = {
            text: props.location.query.text,
            syllabes: props.location.query.syllabes,
            color: {rgb: {r: 254, g: 254, b: 254, a:1}},
            background: {rgb: {r: 0, g:0, b:0, a:1}},
            show_dra: false,
            show_wylie: true,
            showColorChooser: false,
            colorTarget: '',
            size: 2
        }
    }

    handleChangeColor = (color) =>
        this.setState({ color: color.hex });

    handleChangeBackground = (color) =>
        this.setState({ background: color.hex });

    handleSizeChange = (event) =>
        this.setState({ size: event.target.value});

    handleShowDra = (event) => 
        this.setState({ show_dra: event.target.checked});

    handleShowWylie = (event) => 
        this.setState({ show_wylie: event.target.checked});

    showColorChooser = (target) => {
        this.setState(
            {target: target,
            showColorChooser: true})
    }
    
    setColor = (color) => {
        const target = this.state.target
        let state = {}
        state[target] = color
        state['showColorChooser'] = false
        this.setState(state)
    }

    toRGBA = (color) =>
        `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`
        
    renderColorChooser = (color) => {
        return (       
            <SketchPicker
                color={ color }
                onChangeComplete={ this.setColor }
            />)
    }

    copyToClipboard = () =>
        copyToClipboard(this.code)

    renderWidgetString = () => {
        const color = this.toRGBA(this.state.color)
        const background = this.toRGBA(this.state.background)
        return (
            `<script 
            src="//shangshungfoundation.github.io/tib_widget/tib_widget.js" 
            data-text="${this.state.text}"
            data-syllabes=${this.state.syllabes}
            data-size=${this.state.size}
            data-color="${color}"
            data-background="${background}" ${ (this.state.show_dra) ? 'data-show_dra': '' } ${ (this.state.show_wylie) ? 'data-show_wylie': '' }
            ></script>`
        )
    }


    renderWidget = () =>
        // React.createElement("script", {src: "//shangshungfoundation.github.io/tib_widget/tib_widget.js",
        //     "data-text": this.state.text,
        //     "data-syllabes": this.state.syllabes,
        //     "data-size": this.state.size,
        //     "data-color": this.state.color,
        //     "data-background": this.state.background
        // })
        <script>
            alert('dfdf')
        </script>

        // <script 
        //     src="//shangshungfoundation.github.io/tib_widget/tib_widget.js" 
        //     data-text={this.state.text}
        //     data-syllabes={this.state.syllabes}
        //     data-size={this.state.size}
        //     data-color={this.state.color}
        //     data-background={this.state.background}

        //     />

    render() {
        this.code = this.renderWidgetString()
        const color = this.toRGBA(this.state.color)
        const background = this.toRGBA(this.state.background)
        return(
            <div>
                <h2>Export Widget</h2>
                <div className="widget">
                    { this.renderWidget() }
                </div>
                <div className="controls">
                    <p>
                        <label>
                            size;
                            <select id="size" 
                                value={this.state.size}
                                onChange={this.handleSizeChange} >
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                            </select>
                        </label>
                    </p>
                    {  this.state.showColorChooser && this.renderColorChooser() }
                    <p>
                        <a onClick={() => this.showColorChooser('color') } value="color" >
                            color:
                            <span className='colorChooser' style={{background:  color}}></span>
                        </a>
                    </p>
                    <p>
                        <a onClick={() => this.showColorChooser('background') } value="background" >
                            background: 
                            <span className='colorChooser' style={{background:  background}}></span>
                        </a>
                    </p>
                    <p>
                        <label>
                            display Drajor
                            <input
                                type="checkbox"
                                defaultChecked={this.state.show_dra}
                                ref="show_dra"
                                onChange={this.handleShowDra}
                            />
                        </label>
                    </p>
                    <p>
                        <label>
                            display Wylie
                            <input
                                type="checkbox"
                                defaultChecked={this.state.show_wylie}
                                ref="show_wylie"
                                onChange={this.handleShowWylie}
                            />
                        </label>
                    </p>
                </div>
                <div>
                    <p><a onClick={this.copyToClipboard}>Copy</a> / Paste code below to your HTML document</p>
                    <textarea value={ this.code } rows='12' columns='80' className='code'/>
                </div>
                <p>
                    <Link to={{pathname: '/spellchecker', search: this.props.text }}>Back</Link>
                </p>
            </div>
        )
    }
}
