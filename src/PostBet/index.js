import React, { Component } from 'react';
import { Form, InputNumber, Input, Button, Icon } from 'antd';
const { TextArea } = Input;
const FormItem = Form.Item;

class PostBet extends Component {
  constructor(props){
    super(props)
    this.state = {
      amount: 0,

    }
    this.handleSubmit=this.handleSubmit.bind(this)
    this.handleNumberChange=this.handleNumberChange.bind(this)
  }

  handleSubmit(e) {
   e.preventDefault();
   this.props.form.validateFields((err, values) => {
     if (!err) {
       console.log('Received values of form: ', values);
     }
   });
 }

 handleNumberChange(value) {
   this.setState({
     amount: value
   });
 }

  render() {
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 12 },
    };
    const number = this.state.amount;
    return (
      <section className={this.props.toggle ? "" : "hidden"}>
        <h2>Post Your Bet!</h2>
        <Form onSubmit={this.props.submitBet}>
          <FormItem
            {...formItemLayout}
            label="Amount of SpaceBucks wagered:"
          >
            <InputNumber
              min={1}
              max={100}
              name="bet_amount"
              value={number}
              onChange={this.handleNumberChange}
            />
          </FormItem>
          <FormItem>
            <TextArea name="bet_description"rows={4} />
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit">Post Bet</Button>
            <Button onClick={this.props.toggler}>Cancel</Button>
          </FormItem>
        </Form>
      </section>
    );
  }
}

export default PostBet

// import { Form, InputNumber } from 'antd';
// const FormItem = Form.Item;
//
// function validatePrimeNumber(number) {
//   if (number === 11) {
//     return {
//       validateStatus: 'success',
//       errorMsg: null,
//     };
//   }
//   return {
//     validateStatus: 'error',
//     errorMsg: 'The prime between 8 and 12 is 11!',
//   };
// }
//
// class PostBet extends React.Component {
//   state = {
//     number: {
//       value: 11,
//     },
//   };
//   handleNumberChange = (value) => {
//     this.setState({
//       number: {
//         ...validatePrimeNumber(value),
//         value,
//       },
//     });
//   }
//   render() {
//     const formItemLayout = {
//       labelCol: { span: 7 },
//       wrapperCol: { span: 12 },
//     };
//     const number = this.state.number;
//     const tips = 'A prime is a natural number greater than 1 that has no positive divisors other than 1 and itself.';
//     return (
//       <Form>
//         <FormItem
//           {...formItemLayout}
//           label="Prime between 8 & 12"
//           validateStatus={number.validateStatus}
//           help={number.errorMsg || tips}
//         >
//           <InputNumber
//             min={8}
//             max={12}
//             value={number.value}
//             onChange={this.handleNumberChange}
//           />
//         </FormItem>
//       </Form>
//     );
//   }
// }
//
// export default PostBet
