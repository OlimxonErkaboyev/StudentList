import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Form,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "./Main.scss";
const API_PATH = "https://657d4d35853beeefdb9a8481.mockapi.io/studentList";

const Main = () => {
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [students, setStudents] = useState([]);
  const [selectRadio, setSelectRadio] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [selectedItem, setSelectedItem] = useState({});

  const addStudent = async (evt) => {
    evt.preventDefault();
    const [firstname, lastname, kurs, fakultet, oqishturi, guruh] =
      evt.target.elements;
    if (selectedItem.id) {
      try {
        const res = await fetch(API_PATH + "/" + selectedItem.id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstname: firstname.value,
            lastname: lastname.value,
            kurs: kurs.value,
            fakultet: fakultet.value,
            oqishturi: oqishturi.value,
            guruh: guruh.value,
            isMerried: selectRadio,
          }),
        });
        const data = await res.json();
        getStudents();
        setModal(false);
        toast.success("Muvaffaqiyatli o'zgartirildi");
      } catch (error) {
        toast.error(error.message);
        console.log(error.message);
      }
    } else {
      try {
        const res = await fetch(API_PATH, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstname: firstname.value,
            lastname: lastname.value,
            kurs: kurs.value,
            fakultet: fakultet.value,
            oqishturi: oqishturi.value,
            guruh: guruh.value,
            isMerried: selectRadio,
          }),
        });
        const data = await res.json();
        getStudents();
        setModal(false);
        toast.success("Muvaffaqiyatli qo'shildi");
      } catch (error) {
        toast.error(error.message);
        console.log(error.message);
      }
    }
    evt.target.reset();
  };
  const handleRadioChange = (evt) => {
    setSelectRadio(evt.target.value);
  };

  const getStudents = async (evt) => {
    try {
      const res = await fetch(API_PATH);
      const data = await res.json();
      setStudents(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteStudent = async () => {
    try {
      const res = await fetch(API_PATH + "/" + selectedId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      toast.success("Muvaffaqiyatli o'chirildi");
      getStudents();
      setDeleteModal(false);
      console.log(data);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handledeleteStudent = (id) => {
    setSelectedId(id);
    setDeleteModal(!modal);
  };

  const editStudent = async (item) => {
    setSelectedItem(item);
    // console.log(item)
    setModal(true);
  };
  useEffect(() => {
    getStudents();
  }, []);
  return (
    <>
      <div className='container'>
        <button
          className='btn btn-primary mt-4 d-block ms-auto'
          onClick={() => setModal(true)}>
          +Add
        </button>
        <div className='wrapper mt-4'>
          <ul className='student-list d-flex flex-wrap'>
            {students.map((student) => (
              <li className='student-list__item col-4 p-2'>
                <Card>
                  <CardHeader>
                    <h2 className='text-center'>
                      {students &&
                        students.length > 0 &&
                        student.firstname + " " + student.lastname}
                    </h2>
                  </CardHeader>
                  <CardBody>
                    <h3 className='fakultet'>{`${student.fakultet} fakulteti`}</h3>
                    <h4 className='kurs'>{`${student.kurs} - kurs`}</h4>
                    <h4 className='guruh'>{`${student.guruh} - guruh`}</h4>
                    <h4 className='oqishturi'>{` O'qish turi: ${student.oqishturi}`}</h4>
                    <h5 className='isMerried'>{`Oilaviy holati: ${student.isMerried}`}</h5>
                  </CardBody>
                  <CardFooter>
                    <div className='d-flex justify-content-between'>
                      <buttn
                        className='btn btn-warning'
                        onClick={() => editStudent(student)}>
                        Edit
                      </buttn>
                      <buttn
                        className='btn btn-danger'
                        onClick={() => handledeleteStudent(student.id)}>
                        Delete
                      </buttn>
                    </div>
                  </CardFooter>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Modal isOpen={modal} toggle={() => setModal(!setModal)}>
        <ModalHeader>Student name</ModalHeader>
        <Form onSubmit={(evt) => addStudent(evt)}>
          <ModalBody>
            <Input
              className='form-control mb-3'
              type='text'
              name='firstname'
              defaultValue={selectedItem?.firstname}
              placeholder='Enter your Firstname'
            />
            <Input
              className='form-control mb-3'
              type='text'
              name='lastname'
              defaultValue={selectedItem?.lastname}
              placeholder='Enter your Lastname'
            />
            <Input
              className='form-control mb-3'
              type='number'
              name='kurs'
              defaultValue={selectedItem?.kurs}
              placeholder='Nechanchi kurssiz'
            />
            <Input
              className='form-control mb-3'
              type='text'
              name='fakultet'
              defaultValue={selectedItem?.fakultet}
              placeholder='Fakultetingiz nomi'
            />
            <select
              className='form-select mb-3'
              name='oqishturi'
              defaultValue={selectedItem?.oqishturi}>
              <option hidden selected>
                Grand yoki Kontrakt
              </option>
              <option value='grand'>Grand</option>
              <option value='kontrakt'>Kontrakt</option>
            </select>
            <Input
              className='form-control mb-3'
              type='number'
              name='guruh'
              defaultValue={selectedItem?.guruh}
              placeholder='Nechanchi guruhsiz'
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
                    defaultValue={selectedItem?.isMerried}
                    checked={selectRadio === "Boydoq"}
                    onChange={handleRadioChange}
                  />
                  Boydoq
                </label>
                <label>
                  <input
                    className='me-1'
                    type='radio'
                    name='isMerried'
                    value='Oilali'
                    defaultValue={selectedItem?.isMerried}
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
                    defaultValue={selectedItem?.isMerried}
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
              <button className='btn btn-success' type='submit'>
                Save
              </button>
              <button
                className='btn btn-secondary'
                type='button'
                onClick={() => setModal(false)}>
                Cencel
              </button>
            </div>
          </ModalFooter>
        </Form>
      </Modal>

      <Modal isOpen={deleteModal} toggle={() => handledeleteStudent()}>
        <ModalHeader>
          <h2>Rostdan ham o'chirmoqchimisiz?</h2>
        </ModalHeader>
        <ModalFooter>
          <button
            className='btn btn-danger'
            type='button'
            onClick={() => deleteStudent()}>
            Ha😒
          </button>
          <button
            className='btn btn-secondary'
            type='button'
            onClick={() => setDeleteModal(false)}>
            Yo'q😃
          </button>
        </ModalFooter>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default Main;
