import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Modal,
  ModalHeader,
  ModalFooter,
} from "reactstrap";
import { API_PATH } from "../../utils/Constants";
import { ToastContainer, toast } from "react-toastify";

const StudentCard = ({
  modal,
  student,
  getStudents,
  selectedId,
  setSelectedId,
  setSelectedItem,
  setModal,
}) => {
  const [deleteModal, setDeleteModal] = React.useState(false);
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
    setModal(true);
  };

  return (
    <>
      <li className='student-list__item col-4 p-2'>
        <Card>
          <CardHeader>
            <h2 className='text-center'>
              {student.firstname + " " + student.lastname}
            </h2>
          </CardHeader>
          <CardBody>
            <h3>{`${student.faculty} fakulteti`}</h3>
            <h4>{`${student.course} - kurs`}</h4>
            <h4>{`${student.group} - guruh`}</h4>
            <h4>{` O'qish turi: ${student.type_of_study}`}</h4>
            <h5>{`Oilaviy holati: ${student.isMerried}`}</h5>
          </CardBody>
          <CardFooter>
            <div className='d-flex justify-content-between'>
              <button
                className='btn btn-warning'
                onClick={() => editStudent(student)}>
                Edit
              </button>
              <button
                className='btn btn-danger'
                onClick={() => handledeleteStudent(student.id)}>
                Delete
              </button>
            </div>
          </CardFooter>
        </Card>
      </li>
      <Modal
        isOpen={deleteModal}
        toggle={() => handledeleteStudent(setSelectedItem)}>
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
    </>
  );
};

export default StudentCard;
