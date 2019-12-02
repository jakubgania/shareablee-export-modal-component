import React from 'react';
import PropTypes from "prop-types";
import './modal.css';

import axios from 'axios';

class Modal extends React.Component {
  state = {
    apiPostman: 'https://postman-echo.com/post',
    apiDjango: 'https://api.jakubgania.io/django-endpoint/',
    responseStatusFlag: false,
    showResponseSuccessAlert: false,
    showResponseErrorAlert: false,
    copleteFieldsAlert: false,
    scheduleAction: 'noRepeat',
    reportName: '',
    exportReportName: '',
    exportReportFormat: 'excel',
    exportReportEmail: '',
    exportReportSchedule: 'noRepeat',
    exportReportDate: '',
    exportReportTime: '',
    exportReportDayOfWeek: ''
  }

  onClose = () => {
    this.props.onClose && this.props.onClose()
    this.resetStatuses()
  };

  resetStatuses = () => {
    this.setState({
      showResponseSuccessAlert: false,
      showResponseErrorAlert: false,
      completeFieldsAlert: false
    })
  }

  handleChangeReportName = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  changeScheduleAction = (action) => {
    this.setState({
      scheduleAction: action,
    })
  }

  submitExportReportForm = event => {
    if (this.state.exportReportName.length === 0 || this.state.exportReportEmail.length === 0) {
      this.setState({
        completeFieldsAlert: true
      })

      return null
    }
    
    event.preventDefault();

    const exportReportFormData = {
      name: this.state.exportReportName,
      format: this.state.exportReportFormat,
      email: this.state.exportReportEmail,
      schedule: this.state.exportReportSchedule,
      date: this.state.exportReportDate,
      time: this.state.exportReportTime,
      dayOfWeek: this.state.exportReportDayOfWeek
    }

    axios.post(this.state.apiPostman, { exportReportFormData })
      .then(response => {
        if (response.statusCode === 200) {
          this.setState({
            showResponseSuccessAlert: true
          })
        }
      })
      .catch((error) => {
        this.setState({
          showResponseErrorAlert: true
        })

        if (error.response) {
          console.log('Error data ', error.response.data);
          console.log('Error status ', error.response.status);
          console.log('Error headers ', error.response.headers);
        } else if (error.request) {
          console.log('Error request ', error.request)
        } else {
          console.log('Error', error.message)
        }

        console.log('Error config ', error.config)
      })
  }

  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="modal-container">
        <form onSubmit={this.submitExportReportForm}>
          <div className="modal-container-header">
            Export Report
          </div>
          <div className="modal-container-body">
            <div className="modal-container-body-item">
              <div className="modal-container-body-section-title">
                Report name
              </div>
              <div className="modal-container-body-section-input">
                <input className="input" required placeholder="Shareablee Report" name="exportReportName" onChange={this.handleChangeReportName} />
              </div>
            </div>
            <div className="modal-container-body-item">
              <div className="modal-container-body-section-title">
                Format
              </div>
              <div className="modal-container-body-section-input">
                <div className="radio-button-section">
                  <input type="radio" name="exportReportFormat" onChange={this.handleChangeReportName} value="excel" defaultChecked/> Excel
                </div>
                <div className="radio-button-section">
                  <input type="radio" name="exportReportFormat" onChange={this.handleChangeReportName} value="csv" /> CSV
                </div>
              </div>
            </div>
            <div className="modal-container-body-item">
              <div className="modal-container-body-section-title">
                E-mail to
              </div>
              <div className="modal-container-body-section-input">
                <input type="email" required className="input" placeholder="clinet@company.com" name="exportReportEmail" onChange={this.handleChangeReportName} />
              </div>
            </div>
            <div className="modal-container-body-item">
              <div className="modal-container-body-section-title">
                Schedule
              </div>
              <div className="modal-container-body-section-input">
                <div className="radio-button-section">
                  <input type="radio" onClick={() => this.changeScheduleAction('noRepeat')} name="exportReportSchedule" onChange={this.handleChangeReportName} value="noRepeat" defaultChecked/> No Repeat
                </div>
                <div className="radio-button-section">
                  <input type="radio" onClick={() => this.changeScheduleAction('specificDate')} name="exportReportSchedule" onChange={this.handleChangeReportName} value="specificDate" /> Specific Date
                </div>
                <div className="radio-button-section">
                  <input type="radio" onClick={() => this.changeScheduleAction('daily')} name="exportReportSchedule" onChange={this.handleChangeReportName} value="daily" /> Daily
                </div>
                <div className="radio-button-section">
                  <input type="radio" onClick={() => this.changeScheduleAction('weekly')} name="exportReportSchedule" onChange={this.handleChangeReportName} value="weekly" /> Weekly
                </div>
              </div>
            </div>
            <div className="modal-container-body-item">
              <div className="modal-container-body-section-title">
                Date
              </div>
              <div className="modal-container-body-section-input">
                { this.scheduleAction === 'noRepeat'  &&
                  <div className="schedule-section" />
                }

                { this.state.scheduleAction === 'specificDate' &&
                  <div className="schedule-section">
                    <div className="short-input-section">
                      <input className="input date" type="date" value="2019-05-22" name="exportReportDate" onChange={this.handleChangeReportName}/>
                    </div>
                    <div className="at-item">
                      at
                    </div>
                    <div className="short-input-section">
                      <input className="input" type="time" value="13:00" name="exportReportTime" onChange={this.handleChangeReportName}/>
                    </div>
                  </div>
                }
                
                { this.state.scheduleAction === 'daily' &&
                  <div className="schedule-section">
                    <input className="input" type="time" value="13:00" name="exportReportTime" onChange={this.handleChangeReportName}/>
                  </div>
                }
                
                { this.state.scheduleAction === 'weekly' &&
                  <div className="schedule-section">
                    <div className="select-section">
                      <select className="select-day-of-week" name="exportReportDayOfWeek" onChange={this.handleChangeReportName}>
                        <option value="monday">
                          Monday
                        </option>
                        <option value="tuesday">
                          Tuesday
                        </option>
                        <option value="wednesday" selected>
                          Wednesday
                        </option>
                        <option value="thursday">
                          Thursday
                        </option>
                        <option value="friday">
                          Friday
                        </option>
                        <option value="saturday">
                          Saturday
                        </option>
                        <option value="sunday">
                          Sunday
                        </option>
                      </select>
                    </div>
                    <div className="at-item">
                      at
                    </div>
                    <div>
                      <input className="input" type="time" value="13:00" name="exportReportTime" onChange={this.handleChangeReportName}/>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
          <div className="modal-container-footer">
            <button type="button" onClick={this.onClose} className="modal-button cancel-button">
              Cancel
            </button>
            <button type="submit" onClick={this.submitExportReportForm} className="modal-button submit-button">
              OK
            </button>
          </div>
          { this.state.showResponseErrorAlert &&
            <div className="alert error">
              Sending error
            </div>
          }

          {this.state.showResponseSuccessAlert &&
            <div className="alert success">
              Sending success
            </div>
          }

          {this.state.copleteFieldsAlert &&
            <div className="alert error">
              Complete fields !
            </div>
          }
        </form>
      </div>
    )
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
}

export default Modal