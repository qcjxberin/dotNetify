import React from 'react';
import dotnetify from 'dotnetify';
import styled from 'styled-components';
import RenderExample from '../../components/RenderExample';

const Container = styled.div`
  max-width: 1268px;
  padding: 0 1rem;
  table {
    font-size: unset;
    width: 100%;
  }
  tr {
    td {
      padding-bottom: 1.5rem;
    }
    td:first-child {
      width: 20%;
      min-width: 20rem;
      display: flex;
      flex-direction: column;
    }
    td:nth-child(2) {
      width: 50%;
      padding-right: 1.5rem;
      li {
        cursor: pointer;
      }
      li:hover {
        background: #efefef;
      }
      input[type="checkbox"] ~ * {
        margin-left: 0.25rem;
      }
      label {
        cursor: pointer;
        user-select: none;
        &:first-child {
          margin-right: 2rem;
        }
        &.label-warning {
          background: #f0ad4e;
          padding: 0.5rem 1rem;
          border-radius: 0.25rem;
        }
        &.label-success {
          background: #5cb85c;
          padding: 0.5rem 1rem;
          border-radius: 0.25rem;
        }
      }
    }
    td:last-child {
      width: 30%;
    }
  }
`;

class ControlTypes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      TextBoxValue: '',
      SearchBox: '',
      SearchResults: [],
      ShowMeCheckBox: true,
      EnableMeCheckBox: true,
      SimpleDropDownValue: '',
      SimpleDropDownOptions: [],
      DropDownValue: '',
      DropDownOptions: []
    };

    // Connect this component to the back-end view model.
    this.vm = dotnetify.react.connect('ControlTypesVM', this);

    // Set up function to dispatch state to the back-end with optimistic update.
    this.dispatchState = state => {
      this.setState(state);
      this.vm.$dispatch(state);
    };
  }

  componentWillUnmount() {
    this.vm.$destroy();
  }

  render() {
    return (
      <Container>
        <table>
          <tbody>
            <tr>
              <td>
                <b>Text box:</b>
                <label>(updates on losing focus)</label>
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  placeholder={this.state.TextBoxPlaceHolder}
                  value={this.state.TextBoxValue}
                  onChange={e => this.setState({ TextBoxValue: e.target.value })}
                  onBlur={_ => this.dispatchState({ TextBoxValue: this.state.TextBoxValue })}
                />
              </td>
              <td>{this.state.TextBoxResult}</td>
            </tr>

            <tr>
              <td>
                <b>Search box:</b>
                <label>(updates on keystroke)</label>
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  placeholder={this.state.SearchBoxPlaceHolder}
                  value={this.state.SearchBox}
                  onChange={e => this.dispatchState({ SearchBox: e.target.value })}
                />
                {this.state.SearchResults.length > 0 && (
                  <ul className="list-group">
                    {this.state.SearchResults.map((text, idx) => (
                      <li className="list-group-item" key={idx} onClick={_ => this.dispatchState({ SearchBox: text })}>
                        {text}
                      </li>
                    ))}
                  </ul>
                )}
              </td>
              <td />
            </tr>

            <tr>
              <td>
                <b>Check box:</b>
              </td>
              <td>
                <label>
                  <input
                    type="checkbox"
                    checked={this.state.ShowMeCheckBox}
                    onChange={_ => this.dispatchState({ ShowMeCheckBox: !this.state.ShowMeCheckBox })}
                  />
                  <span>Show me</span>
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={this.state.EnableMeCheckBox}
                    onChange={_ => this.dispatchState({ EnableMeCheckBox: !this.state.EnableMeCheckBox })}
                  />
                  <span>Enable me</span>
                </label>
              </td>
              <td>
                {this.state.ShowMeCheckBox && (
                  <button className="btn btn-secondary" disabled={!this.state.EnableMeCheckBox}>
                    {this.state.CheckBoxResult}
                  </button>
                )}
              </td>
            </tr>

            <tr>
              <td>
                <b>Simple drop-down list:</b>
                <label>(string data type)</label>
              </td>
              <td>
                <select
                  className="form-control"
                  value={this.state.SimpleDropDownValue}
                  onChange={e => this.dispatchState({ SimpleDropDownValue: e.target.value })}
                >
                  <option value="" disabled>
                    Choose...
                  </option>
                  {this.state.SimpleDropDownOptions.map((text, idx) => (
                    <option key={idx} value={text}>
                      {text}
                    </option>
                  ))}
                </select>
              </td>
              <td>{this.state.SimpleDropDownResult}</td>
            </tr>

            <tr>
              <td>
                <b>Drop-down list:</b>
                <label>(object data type)</label>
              </td>
              <td>
                <select
                  className="form-control"
                  value={this.state.DropDownValue}
                  onChange={e => this.dispatchState({ DropDownValue: e.target.value })}
                >
                  <option value="0" disabled>
                    {this.state.DropDownCaption}
                  </option>
                  {this.state.DropDownOptions.map((opt, idx) => (
                    <option key={idx} value={opt.Id}>
                      {opt.Text}
                    </option>
                  ))}
                </select>
              </td>
              <td>{this.state.DropDownResult}</td>
            </tr>

            <tr>
              <td>
                <b>Radio button:</b>
              </td>
              <td>
                <label className={this.state.RadioButtonStyle}>
                  <input
                    type="radio"
                    value="green"
                    checked={this.state.RadioButtonValue == 'green'}
                    onChange={e => this.dispatchState({ RadioButtonValue: e.target.value })}
                  />
                  &nbsp;Green
                </label>
                <label className={this.state.RadioButtonStyle}>
                  <input
                    type="radio"
                    value="yellow"
                    checked={this.state.RadioButtonValue == 'yellow'}
                    onChange={e => this.dispatchState({ RadioButtonValue: e.target.value })}
                  />
                  &nbsp;Yellow
                </label>
              </td>
              <td />
            </tr>

            <tr>
              <td>
                <b>Button:</b>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={_ => this.dispatchState({ ButtonClicked: true })}
                >
                  Click me
                </button>
              </td>
              <td>
                {this.state.ClickCount > 0 && (
                  <span>
                    You clicked me <b>{this.state.ClickCount}</b>
                    &nbsp;times!
                  </span>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </Container>
    );
  }
}

export default _ => (
  <RenderExample vm="ControlTypesExample">
    <ControlTypes />
  </RenderExample>
);
