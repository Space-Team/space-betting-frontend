import React, { Component } from "react"
import { Form, InputNumber, Input, Button } from "antd"
import "./style.css"
const { TextArea } = Input
const FormItem = Form.Item

class PostBet extends Component {
  constructor(props) {
    super(props)
    this.state = {
      amount: 1
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleNumberChange = this.handleNumberChange.bind(this)
  }

  handleNumberChange(value) {
    this.setState({
      amount: value
    })
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.submitBet(e)
    e.target.reset()
    this.setState({amount: 1})
    this.props.toggler(e)
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
            <TextArea rows={4} name="bet_description" />
          </FormItem>
          <FormItem>
            <Button className='postBetButton' type="primary" htmlType="submit">
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
