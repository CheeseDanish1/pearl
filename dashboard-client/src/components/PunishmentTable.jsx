import React, {Component} from 'react';
import pms from 'pretty-ms';
import {Table, Button} from 'react-bootstrap';
import {message} from 'antd';
import ms from 'ms';
import {setPunishments} from '../utils/api';
import {IoIosCloseCircle} from 'react-icons/io';
import {v4 as uuidv4} from 'uuid';

export default class PunishmentTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: props.guild.config.automod.punishments,
      remove: false,
    };
    this.guild = props.guild;
    this.guilds = props.guilds;
    this.addRow = this.addRow.bind(this);
    this.removeRow = this.removeRow.bind(this);
    this.save = this.save.bind(this);
  }

  addRow() {
    console.log('Row added');
    this.setState({
      settings: [
        ...this.state.settings,
        {action: null, time: null, strike: null, id: uuidv4()},
      ],
    });
  }

  removeRow() {
    console.log('Row removed');
    this.setState({remove: !this.state.remove});
  }

  async save() {
    const s = this.state.settings;
    const noWarning = s.find(sr => !sr.strike);
    if (noWarning) {
      const indexWarning = s.findIndex(sr => sr === noWarning);
      const box = document.querySelector(`.row-${indexWarning}-column-1`);
      message.error('You cant leave this empty');
      if (box) {
        box.style.border = '2px solid red';
        setTimeout(() => {
          box.style.border = '0 solid red';
        }, 2000);
        return;
      }
    }

    const noAction = s.find(sr => !sr.action);
    if (noAction) {
      const indexAction = s.findIndex(sr => sr === noAction);
      const box = document.querySelector(`.row-${indexAction}-column-2`);
      message.error('You cant leave this empty');
      if (box) {
        box.style.border = '2px solid red';
        setTimeout(() => {
          box.style.border = '0 solid red';
        }, 2000);
        return;
      }
    }

    const invalidAction = s.find(
      sr =>
        !['mute', 'ban', 'kick', 'softban'].includes(sr.action.toLowerCase())
    );
    if (invalidAction) {
      const indexAction = s.findIndex(sr => sr === invalidAction);
      const box = document.querySelector(`.row-${indexAction}-column-2`);
      message.error('What you provided is invalid');
      if (box) {
        box.style.border = '2px solid red';
        setTimeout(() => {
          box.style.border = '0 solid red';
        }, 2000);
        return;
      }
    }

    const final = s.map(sr =>
      (sr.action === 'kick' || sr.action === 'softban') && sr.time
        ? {...sr, time: null}
        : sr
    );

    console.log('Saved', final);
    const res = await setPunishments(this.guild.id, {
      punishment: final,
      guilds: this.guilds,
    });
    console.log(res);
    if (res.data.error)
      return message.error(res.data.msg || res.data.message || 'Error');

    this.setState({settings: res.data.result.automod.punishments});
    message.success('Updated punishments');
  }

  render() {
    const punishmentData = this.state.settings.map(
      ({time, action, strike, _id, id}, i) => (
        <tr className="dash-punishment-table" key={i} style={{width: '100%'}}>
          {this.state.remove && (
            <td
              style={{
                width: 'calc(100% / 1000)',
                cursor: 'pointer',
              }}
            >
              <IoIosCloseCircle
                onClick={() => {
                  const set = this.state.settings;
                  const setWithoutRow = set.filter(r =>
                    _id ? r._id !== _id : r.id !== id
                  );
                  this.setState({
                    settings: setWithoutRow,
                    remove: false,
                  });
                  console.log(set);
                  console.log(setWithoutRow);
                }}
                size="30px"
                style={{margin: 'none'}}
              />
            </td>
          )}

          <td
            className={`row-${i}-column-1`}
            style={{width: 'calc(100% / 15)'}}
          >
            <input
              className={`table-input-value fit`}
              placeholder="N"
              value={strike || ''}
              onBlur={e => {
                if (!e.target.value) {
                  message.warn('You cant leave this empty');
                  const box = document.querySelector(`.row-${i}-column-1`);
                  Array.from(box.children)[0].focus();
                  if (box) {
                    box.style.transition = `border 1s`;
                    box.style.border = '2px solid red';
                    setTimeout(() => {
                      box.style.border = '0 solid red';
                    }, 4000);
                  }
                }
              }}
              onChange={e => {
                if (isNaN(e.target.value)) {
                  message.error('Warnings can only be a number');
                  return (e.target.value = strike);
                }
                if (parseInt(e.target.value) > 100) {
                  message.error('Warning must be less than 100');
                  return (e.target.value = strike);
                }
                if (parseInt(e.target.value) <= 0) {
                  message.error('Warning must be greater than 0');
                  return (e.target.value = strike);
                }
                const settingsVar = this.state.settings;
                let index = settingsVar.findIndex(obj =>
                  _id ? obj._id === _id : obj.id === id
                );
                settingsVar[index].strike = parseInt(e.target.value);
                this.setState({
                  settings: settingsVar,
                });
              }}
            />
          </td>
          <td className={`row-${i}-column-2`} style={{width: 'calc(100% / 3)'}}>
            <input
              className="table-input-value"
              placeholder="Mute | Kick | Softban | Ban"
              value={
                action && action[0]
                  ? action[0].toUpperCase() + action.substring(1)
                  : ''
              }
              onBlur={e => {
                if (!e.target.value) {
                  message.warn('You cant leave this empty');
                } else if (
                  !['mute', 'kick', 'softban', 'ban'].includes(
                    e.target.value.toLowerCase()
                  )
                ) {
                  message.warn(
                    'That is not a valid options, valid options are mute, ban, kick, softban'
                  );
                }
              }}
              onChange={e => {
                const settingsVar = this.state.settings;
                let index = settingsVar.findIndex(obj =>
                  _id ? obj._id === _id : obj.id === id
                );
                settingsVar[index].action = e.target.value.toLowerCase();
                this.setState({
                  settings: settingsVar,
                });
              }}
            />
          </td>
          <td className={`row-${i}-column-1`} style={{width: 'calc(100% / 3)'}}>
            <input
              className="table-input-value"
              placeholder="Time (Optional)"
              value={
                time
                  ? !isNaN(time) &&
                    Number.isFinite(time) &&
                    parseInt(time) > 1000
                    ? pms(time, {verbose: true})
                    : time
                  : ''
              }
              onBlur={e => {
                let parsedValue = e.target.value ? ms(e.target.value) : null;
                if (!parsedValue && e.target.value) {
                  e.target.value = '';
                  return message.error('The time you provided is not valid');
                }
                if (parsedValue > 1210000000 && e.target.value) {
                  e.target.value = '';
                  return message.error(
                    'The time can not be greater than 2 weeks'
                  );
                }
                if (parsedValue < 60000 && e.target.value) {
                  e.target.value = '';
                  return message.error(
                    'The time can not be less than 1 minute'
                  );
                }
                const settingsVar = this.state.settings;
                let index = settingsVar.findIndex(obj =>
                  _id ? obj._id === _id : obj.id === id
                );
                settingsVar[index].time = parsedValue;
                this.setState({
                  settings: settingsVar,
                });
              }}
              onChange={e => {
                const settingsVar = this.state.settings;
                let index = settingsVar.findIndex(obj =>
                  _id ? obj._id === _id : obj.id === id
                );
                settingsVar[index].time = e.target.value;
                this.setState({
                  settings: settingsVar,
                });
              }}
            />
          </td>
        </tr>
      )
    );

    return (
      <div className="moderation-punishment-table">
        <Table title="Auto Punishments" striped bordered hover variant="dark">
          <thead>
            <tr>
              {this.state.remove && <th>Remove</th>}
              <th>Warnings</th>
              <th>Action</th>
              <th>Length</th>
            </tr>
          </thead>
          <tbody>{punishmentData}</tbody>
        </Table>
        <div
          className="table-button-group"
          style={{display: 'flex', justifyContent: 'space-between'}}
        >
          <Button onClick={this.save} variant="success">
            Save Changes
          </Button>
          <div>
            <Button onClick={this.addRow}>Add Row</Button>{' '}
            <Button onClick={this.removeRow} variant="secondary">
              Remove Row
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
