import React from 'react';

const NewComposerForm = ({ form, onSubmit }) => (
  <div className="form-wrapper">
    <form onSubmit={onSubmit} className="form">
      <h3 className="form-heading">Add your composers</h3>
      <div className="mb-3">
        <label htmlFor="name">Name</label>
        {form.name({ className: 'form-control', autoFocus: true })}
      </div>
      <div className="mb-3">
        <label>Years</label>
        <div className="row">
          <div className="col-6">
            {form.born({ className: 'form-control', placeholder: 'Born', autoFocus: true })}
          </div>
          <div className="col-6">
            {form.deceased({ className: 'form-control', placeholder: 'Deceased', autoFocus: true })}
          </div>
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="nationality">Nationality by Birth</label>
        {form.nationality({ className: 'form-control', placeholder: 'Austria', autoFocus: true })}
      </div>
      <div className="mb-3">
        <label htmlFor="period">Period</label>
        {form.period({ className: 'form-control', autoFocus: true })}
      </div>
      <div className="mb-3">
        <label htmlFor="performers" className="form-label">Performers</label>
        <small>Ctrl+Click to select multiple</small>
        {form.performers({ className: 'form-control', placeholder: 'Performer, separated by commas', autoFocus: true })}
      </div>
      <div className="mb-3">
        <label htmlFor="titles">Titles</label>
        {form.titles({ className: 'form-control', placeholder: 'pianist, conductor', autoFocus: true })}
      </div>
      <div className="mb-3">
        <label htmlFor="compositions">Compositions</label>
        {form.compositions({ className: 'form-control', placeholder: 'Ave Maria', autoFocus: true })}
      </div>
      <div className="mb-3">
        <label htmlFor="contemporaries">Contemporaries</label>
        {form.contemporaries({ className: 'form-control', autoFocus: true })}
      </div>
      <input type="submit" value="Create Composer" className="btn btn-primary btn-lg btn-block" />
    </form>
  </div>
);

export default NewComposerForm;