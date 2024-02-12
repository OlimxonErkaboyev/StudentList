import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./Main.scss";
import { API_PATH } from "../../utils/Constants";
import AddStudent from "../AddStudent/AddStudent";
import StudentCard from "../StudentCard/StudentCard";
const Main = () => {
  const [modal, setModal] = useState(false);
  const [students, setStudents] = useState([]);
  const [selectRadio, setSelectRadio] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [selectedItem, setSelectedItem] = useState({});

  const addStudent = async (values) => {
    if (selectedItem.id) {
      try {
        const res = await fetch(API_PATH + "/" + selectedItem.id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstname: values.firstname,
            lastname: values.lastname,
            course: values.course,
            faculty: values.faculty,
            type_of_study: values.type_of_study,
            group: values.group,
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
            firstname: values.firstname,
            lastname: values.lastname,
            course: values.course,
            faculty: values.faculty,
            type_of_study: values.type_of_study,
            group: values.group,
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
          <ul className='d-flex flex-wrap'>
            {students &&
              students.length > 0 &&
              students.map((student) => (
                <StudentCard
                  key={student.id}
                  modal={modal}
                  student={student}
                  getStudents={getStudents}
                  selectedId={selectedId}
                  setSelectedId={setSelectedId}
                  setSelectedItem={setSelectedItem}
                  setModal={setModal}
                />
              ))}
          </ul>
        </div>
      </div>
      <AddStudent
        addStudent={(evt) => addStudent(evt)}
        modal={modal}
        setModal={setModal}
        selectedItem={selectedItem}
        selectRadio={selectRadio}
        setSelectRadio={setSelectRadio}
      />
      <ToastContainer />
    </>
  );
};

export default Main;
