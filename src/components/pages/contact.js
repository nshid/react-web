import React, { Component } from 'react';

const SPC = ' ';

function Input(props) {
  let classnames = 'form-control col-md-12';
  let widthStyle = props.type === 'range' ? {width: props.size + '%'} : {};
  switch (props.type) {
    case 'radio':
    case 'checkbox':
      return ( <input className={classnames + SPC + props.type + '-inline'} type={props.type} name={props.name} onChange={props.onChange} size={props.size} pattern={props.pattern} data-message={props.message} title={props.title} placeholder={props.placeholder} defaultChecked={props.defaultChecked} /> );
    default:
      return ( <input className={classnames} type={props.type} name={props.name} style={widthStyle} onChange={props.onChange} size={props.size} pattern={props.pattern} data-message={props.message} title={props.title} placeholder={props.placeholder} required /> );
  }
}

function TableRow(props) {
  return (
    <tr>
      <td>{props.age}</td>
      <td>{props.first}</td>
      <td>{props.last}</td>
      <td>{props.gender}</td>
      <td>{props.email}</td>
      <td>{props.country}</td>
      <td>{props.phone}</td>
      <td><a href={props.url} target="_blank">{props.url}</a></td>
      <td className="pin-hide-4" data-code={props.code}></td>
      <td className="red">{props.rating}</td>
      <td>{props.comms}</td>
    </tr>
  );
}

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valid: false,
      message: '',
      contacts: {},
    };
  }

  handleChange(e) {
    let regEx = new RegExp(e.target.pattern);
    let match = regEx.test(e.target.value);
    let isRangeType = e.target.type === 'range';
    let valid = match || isRangeType ? this.state.valid : false;
    let message = !match ? e.target.dataset.message : '';

    this.setState({
      valid: valid,
      message: message
    });
  }

  handleSubmit(e) {
    if (!e) e = window.event;
    let vkey, comms = [], contact = {};

    for (let el in e.target.elements) {
      let element = e.target.elements[el];
      switch (element.type) {
        case 'tel':
          contact.phone = element.value;
          break;
        case 'url':
          contact.url = element.value;
          break;
        case 'email':
          contact.email = element.value;
          break;
        case 'range':
          contact.rating = element.value;
          break;
        case 'number':
          contact.age = element.value;
          break;
        case 'radio':
          if (element.checked)
            contact.gender = element.title;
          break;
        case 'checkbox':
          if (element.checked)
            comms.push(element.title);
          break;
        case 'password':
          contact.code = element.value;
          break;
        case 'submit':
          break;
        case 'text':
        default:
          if (element.name === 'first') {
            contact.first = element.value;
          } else if (element.name === 'last') {
            contact.last = element.value;
          } else if (element.name === 'country-code') {
            contact.country = element.value;
          }
          break;
      }

      if (element.length && element.length > 1) {
        let htmlCollection = element;
        for (let h = 0; h < htmlCollection.length; h++) {
          let elem = htmlCollection[h];
          switch (elem.type) {
            case 'radio':
              if (elem.checked)
                contact.gender = elem.title;
              break;
            case 'checkbox':
              if (elem.checked)
                comms.push(elem.title);
              break;
            default:
              break;
          }
        }
      }
    }

    vkey = contact.first + '-' + contact.last + '-' + contact.gender + '-' + contact.phone;
    contact.comms = comms.join("," + SPC);

    let contacts = extend(this.state.contacts);
    if (!contacts.hasOwnProperty(vkey)) {
      contacts[vkey] = contact;
    }

    this.setState({
      message: 'All fields validated successfully!',
      contacts: contacts
    });

    e.target.reset();
    e.preventDefault();
  }

  renderInputWithIcon(x, icon, type, label, value, pattern, invalidmsg, title, placeholder, size, min, max, checked) {
    return (
      <div key={x} className="input-group">
          <span className="input-group-addon"><i className={icon}></i></span>
          {this.renderInput(type, label, value, pattern, invalidmsg, title, placeholder, size, min, max, checked)}
      </div>
    );
  }

  renderInputWithLabel(x, type, label, value, pattern, invalidmsg, title, placeholder, size, min, max, checked) {
    return (
      <label key={x} style={{marginRight: '20px'}}>
        {label}
        {this.renderInput(type, label, value, pattern, invalidmsg, title, placeholder, size, min, max, checked)}
      </label>
    );
  }

  renderInput(type, label, value, pattern, invalidmsg, title, placeholder, size, min, max, checked) {
    let name = type === 'radio' || type === 'checkbox' ? placeholder : label.split(" ").join("-").toLowerCase();
    let onChangeHandler = (e) => {
      switch (type) {
        case 'radio':
        case 'checkbox':
          return;
        default:
          return this.handleChange(e);
      }
   };

   return (
      <Input
        type={type}
        name={name}
        pattern={pattern}
        message={invalidmsg}
        title={title}
        value={value}
        placeholder={placeholder}
        min={min}
        max={max}
        size={size}
        defaultChecked={checked}
        onChange={(e) => onChangeHandler(e)}
      />
    );
  }

  renderTableRow(x, contact) {
    if (contact) {
      return (
          <TableRow
            key={x}
            age={contact.age}
            first={contact.first}
            last={contact.last}
            gender={contact.gender}
            email={contact.email}
            country={contact.country}
            phone={contact.phone}
            url={contact.url}
            code={contact.code}
            rating={contact.rating}
            comms={contact.comms}
          />
      );
    } else {
      return;
    }
  }

  render() {
    let tr = 0, trows = [], contacts = extend(this.state.contacts);
    let valid = this.state.message === 'All fields validated successfully!' ? true : this.state.valid;

    for (var c in contacts) {
      let contact = contacts[c];
      trows.push(
        this.renderTableRow(tr, contact)
      );
      tr++;
    }

    let inputs = [
      this.renderInputWithLabel(0, "number", "Age", "-1", "^0*(1[89]|[2-9][0-9])$", "Must be 18-99 years of age", "18-99", "Age", "3", "18", "99"),
      this.renderInputWithIcon(1, "glyphicon glyphicon-pencil", "text", "First", "", "^[A-Za-z]{3,}", "First name at least 3 characters", "First must be at least 3 characters", "Given name", "35"),
      this.renderInputWithIcon(2, "glyphicon glyphicon-pencil", "text", "Last", "", "^[A-Za-z]{3,}", "Last name at least 3 characters", "Last must be at least 3 characters", "Surname", "35"),
      <br key={3} />,
      this.renderInputWithLabel(4, "radio", "Male", "on", ".", "Invalid option", "Male", "optradio", "", "", "", true),
      this.renderInputWithLabel(5, "radio", "Female", "off", ".", "Invalid option", "Female", "optradio", "", "", "", false),
      this.renderInputWithLabel(6, "radio", "Other", "off", ".", "Invalid option", "Other", "optradio", "", "", "", false),
      <br key={7} />,
      this.renderInputWithIcon(8, "glyphicon glyphicon-envelope", "email", "Email", "", "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$", "Email is wrong format", "Email address: local@domain.org", "e.g. name@domain.org", "35"),
      this.renderInputWithIcon(9, "glyphicon glyphicon-home", "text", "Country Code", "", "[A-Za-z]{3}", "Country code is only 3 characters", "Three letter country code", "USA", "35"),
      this.renderInputWithIcon(10, "glyphicon glyphicon-earphone", "tel", "Phone Number", "", "^\\d{3}[\\-]\\d{3}[\\-]\\d{4}$", "Telephone is wrong format", "Phone Number Format: 999-999-9999", "XXX-XXX-XXXX", "15"),
      this.renderInputWithIcon(11, "glyphicon glyphicon-globe", "url", "Website", "", "^https?://.+$", "Website URL is invalid", "Personal website address", "http:// or https://", "35"),
      this.renderInputWithIcon(12, "glyphicon glyphicon-lock", "password", "Secret Code", "", "^[0-9]{4,8}$", "Invalid secret code", "e.g. 1234", "Secret 4 digit numerical code", "4"),
      this.renderInputWithIcon(13, "glyphicon glyphicon-ok", "range", "React", "50", "^([0-9]|[1-8][0-9]|90)$", "React rating is higher than 90", "React Usefulness", "React", "60", "0", "90"),
      <br key={14} />,
      this.renderInputWithLabel(15, "checkbox", "By Email", "", "*", "Invalid option", "Email", "optcheckbox", "", "", "", true),
      this.renderInputWithLabel(16, "checkbox", "By Phone", "", "*", "Invalid option", "Phone", "optcheckbox", "", "", "", false),
      this.renderInputWithLabel(17, "checkbox", "By Mail", "", "*", "Invalid option", "Mail", "optcheckbox", "", "", "", false)
    ];

    return (
      <div className="container-fluid">
        <h1 className="s-blk-shadow">
          Contact Form
        </h1>

        <div className="container-fluid contact-container">
          <div className="row">
            <div className="col-xs-6" style={{background: 'lightGrey', width: trows.length > 0 ? '40%' : '60%', maxHeight: '20%', padding:'5px', border: '1px solid black', boxShadow: '10px 10px 5px #888888'}}>
              <form className="contact-form" onSubmit={(e) => this.handleSubmit(e)} style={{width: '100%'}}>
                <div className="led-box pull-right" title={valid ? "Valid" : "Invalid"} style={{cursor: "pointer"}}>
                  <div className={valid ? "led-green" : "led-red"}></div>
                </div>
                <div className="contact-inputs" style={{background: '#F5F5F5', padding: '5px', marginBottom: '5px', border: '1px solid black'}}>
                  {inputs}
                </div>
                <input type="submit" className={valid ? 'btn-success pull-right' : 'btn-danger pull-right'} style={{margin: '10px'}} value={this.state.valid ? 'Re-validate' : 'Validate'} />
              </form>
              <div className={valid ? 'text-success' : 'text-danger'} style={{padding: '15px'}}>{this.state.message}</div>
            </div>
            <div className="col-xs-6 table-responsive">
              <table className="table table-hover table-striped table-condensed" style={{display: trows.length > 0 ? 'block' : 'none'}}>
                <thead style={{background: 'lavender'}}>
                  <tr>
                    <th>Age</th>
                    <th>First</th>
                    <th>Last</th>
                    <th>Gender</th>
                    <th>Email</th>
                    <th>Country</th>
                    <th>Phone</th>
                    <th>URL</th>
                    <th>Code</th>
                    <th>Rating</th>
                    <th>CCs</th>
                  </tr>
                </thead>
                <tbody>
                  {trows}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Extend [JavaScript Implementation]
function extend() {
  for (var i = 1; i < arguments.length; i++) {
    for (var key in arguments[i]) {
      if (arguments[i].hasOwnProperty(key)) {
        if (typeof arguments[0][key] === 'object' && typeof arguments[i][key] === 'object') {
          extend(arguments[0][key], arguments[i][key]);
        } else {
          arguments[0][key] = arguments[i][key];}
        }
    }
  }
  return arguments[0];
}

export default Contact;
