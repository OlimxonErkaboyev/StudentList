import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Formik } from "formik";

const AddStudent = ({
  addStudent,
  modal,
  setModal,
  selectedItem,
  selectRadio,
  setSelectRadio,
}) => {
  const handleRadioChange = (evt) => {
    console.log(selectRadio);
    setSelectRadio(evt.target.value);
  };

  return (
    <>
      <Modal
        isOpen={modal}
        toggle={() => {
          setModal(!modal);
        }}>
        <ModalHeader>Student name</ModalHeader>
        <Formik
          initialValues={{
            firstname: selectedItem?.firstname,
            lastname: selectedItem?.lastname,
            course: selectedItem?.course,
            faculty: selectedItem?.faculty,
            type_of_study: selectedItem?.type_of_study,
            group: selectedItem?.group,
            isMerried: selectedItem?.selectRadio,
          }}
          onSubmit={(values, { setSubmitting }) => {
            addStudent(values);
            console.log(values);
          }}>
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <ModalBody>
                <input
                  className='form-control mb-3'
                  type='text'
                  name='firstname'
                  placeholder='Enter your Firstname'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstname}
                />
                <input
                  className='form-control mb-3'
                  type='text'
                  name='lastname'
                  placeholder='Enter your Lastname'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastname}
                />
                <input
                  className='form-control mb-3'
                  type='number'
                  name='course'
                  placeholder='Nechanchi kurssiz'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.course}
                />
                <input
                  className='form-control mb-3'
                  type='text'
                  name='faculty'
                  placeholder='Fakultetingiz nomi'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.faculty}
                />
                <select
                  className='form-select mb-3'
                  name='type_of_study'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.type_of_study}>
                  <option hidden selected>
                    Grand yoki Kontrakt
                  </option>
                  <option value='grand'>Grand</option>
                  <option value='kontrakt'>Kontrakt</option>
                </select>
                <input
                  className='form-control mb-3'
                  type='number'
                  name='group'
                  placeholder='Nechanchi guruhsiz'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.group}
                />
                <div className='d-flex flex-column'>
                  <legend className='col-form-label '>IsMerried?</legend>
                  <div className='d-flex gap-3'>
                    <label>
                      <input
                        className='me-1'
                        type='radio'
                        name='isMerried'
                        value='Boydoq'
                        onChange={handleRadioChange}
                        checked={selectRadio === "Boydoq"}
                      />
                      Boydoq
                    </label>
                    <label>
                      <input
                        className='me-1'
                        type='radio'
                        name='isMerried'
                        value='Oilali'
                        checked={selectRadio === "Oilali"}
                        onChange={handleRadioChange}
                      />
                      Oilali
                    </label>
                    <label>
                      <input
                        className='me-1'
                        type='radio'
                        name='isMerried'
                        value='Ajrashgan'
                        checked={selectRadio === "Ajrashgan"}
                        onChange={handleRadioChange}
                      />
                      Ajrashgan
                    </label>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <div className='d-flex gap-4'>
                  <button
                    className='btn btn-success'
                    type='submit'
                    disabled={isSubmitting}>
                    Save
                  </button>
                  <button
                    className='btn btn-secondary'
                    type='button'
                    onClick={() => {
                      setModal(false);
                    }}>
                    Cencel
                  </button>
                </div>
              </ModalFooter>
            </form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default AddStudent;
