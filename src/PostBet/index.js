import React, { Component } from "react"
import { Form, InputNumber, Input, Button } from "antd"
import "./style.css"
const { TextArea } = Input
const FormItem = Form.Item

class PostBet extends Component {
  constructor(props) {
    super(props)
    this.state = {
      amount: 0
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleNumberChange = this.handleNumberChange.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values)
      }
    })
  }

  handleNumberChange(value) {
    this.setState({
      amount: value
    })
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
        <Form onSubmit={this.props.submitBet}>
        <p>How many spacebucks do you want to bet?</p>
          <FormItem {...formItemLayout} >
            <InputNumber
              min={1}
              max={100}
              name="bet_amount"
              value={number}
              onChange={this.handleNumberChange}
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
