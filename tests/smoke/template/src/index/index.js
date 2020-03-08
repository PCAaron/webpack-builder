/*
 * @Descripttion: Web
 * @Author: Aaron
 * @Date: 2020-1-9-9:47
 */
import React from 'react'
import ReactDOM from 'react-dom'
import '../../common'
import './index.css'
import { a } from '../tree-shaking'

class Index extends React.Component{
    constructor(){
        super(...arguments)
        this.state= {
            Text:null
        }
    }
    loadText() {
        import('./text.js').then((text)=>{
            this.setState({
                Text: text.default
            })
        })
    }
    render(){
        const { Text } = this.state
        console.log(Text)
        const val = a()
        return (
            <div className='index'>
                index page,{val}
                <hr/>
                {
                    Text ? <Text/> : null
                }
                <span onClick={this.loadText.bind(this)}>loadText</span>
            </div>
        )
    }
}

ReactDOM.render(
    <Index/>,
    document.getElementById('root')
)
