import "../../style/new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "../../style/datatable.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import PopupAlert from "../../components/popupalert/popupAlert";

const UpdateAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [popUpShow, setPopupshow] = useState(false);
  const [popUpText, setPopupText] = useState("");
  const id = localStorage.getItem("id");
  const token = localStorage.getItem("ieodkvToken");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    axios
      .get(`https://crm.internationaleducationoffice.co.uk/members/member1/${id}`, config)
      .then((response) => {
        setEmail(response.data.email);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(
        `https://crm.internationaleducationoffice.co.uk/members/${id}`,
        {
          oldPassword: oldPassword,
          password: password,
        },
        config
      )
      .then((response) => {
        console.log(response);
        setPopupshow(true);
        setPopupText("Password updated");
        setTimeout(() => {
          setPopupshow(false);
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data) {
          alert(error.response.data);
        }
      });
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        {popUpShow ? (
          <PopupAlert popUpText={popUpText} backgroundColor={"#8AFF8A"} />
        ) : (
          ""
        )}
        <Container fluid>
          {popUpShow ? (
            <PopupAlert popUpText={popUpText} backgroundColor={"#8AFF8A"} />
          ) : (
            ""
          )}
          <div className="bottom">
            <div className="right p-4">
              <Form className="form-new" onSubmit={handleUpdate}>
                {/* <div className="datatableTitle" style={{ marginLeft: 20 }}>
                 <h2>Update password</h2>
                </div> */}
                <Container>
                <div className="datatableTitle">
                 <h2 className="text-dark fw-bold">Update password</h2>
                </div>
                  <Row>
                    <Col xs={12} md={6}>
                      <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" value={email} readOnly />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={6}>
                      <Form.Group className="mt-2">
                        <Form.Label>Old password</Form.Label>
                        <Form.Control
                          type="password"
                          value={oldPassword}
                          onChange={(e) => setOldPassword(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={6}>
                      <Form.Group className="mt-2">
                        <Form.Label>New password</Form.Label>
                        <Form.Control
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <Button type="submit" className="btn btn-primary mt-3 px-4 py-2">
                        Update
                      </Button>
                    </Col>
                  </Row>
                </Container>
              </Form>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default UpdateAdmin;
