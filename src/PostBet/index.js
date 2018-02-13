import React, { Component } from "react"
import { Form, InputNumber, Input, Button } from "antd"
import "./style.css"
const { TextArea } = Input
const FormItem = Form.Item

class PostBet extends Component {
  constructor(props) {
    super(props)
    this.state = {
      amount: 1,
      description: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleNumberChange = this.handleNumberChange.bind(this)
    this.changeDescription = this.changeDescription.bind(this)
  }

  handleNumberChange(value) {
    this.setState({
      amount: value
    })
  }

  changeDescription(e){
    this.setState({ description: e.target.value })
  }

  handleSubmit(e){
    e.preventDefault()
    let des = this.state.description
    let amo = this.state.amount
    this.props.submitBet(e, des, amo)
    e.target.reset()
    this.setState({amount: 1})
    this.props.toggleSuccess(e)
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 12 }
    }
    const number = this.state.amount
    return (
      <section className={this.props.toggle ? "post-form" : "hidden"}>
        <h2>Create Your Bet!</h2>
        <Form onSubmit={this.handleSubmit}>
        <p>How many spacebucks do you want to bet?</p>
          <FormItem {...formItemLayout} className="outer-input-number">
            <InputNumber
              min={1}
              max={100}
              name="bet_amount"
              value={number}
              onChange={this.handleNumberChange}
              className="input-number"
            />
          </FormItem>
          <p>Describe the bet you would like to make:</p>
          <FormItem>
            <TextArea onChange={this.changeDescription}rows={4} name="bet_description" value={this.state.description} />
          </FormItem>
          <FormItem>
            <Button className='postBetButton create' htmlType="submit">
              Create Bet
            </Button>
            <Button className='postBetButton' onClick={this.props.toggler}>Cancel</Button>
          </FormItem>
        </Form>
      </section>
    )
  }
}

export default PostBet
