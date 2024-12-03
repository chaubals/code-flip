import React from "react";

function Contact() {
  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-dark text-light">
          <h5 className="card-title text-center mb-0">Developer Information</h5>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <h6 className="text-muted">Name</h6>
            <p className="mb-0">Siddhesh R Chaubal</p>
          </div>
          <div>
            <h6 className="text-muted">Email</h6>
            <p className="mb-0">
              <a
                href="mailto:chaubals@umich.edu"
                className="text-decoration-none"
              >
                chaubals@umich.edu
              </a>
            </p>
          </div>
        </div>
        <div className="card-footer text-center bg-light">
          <p className="mb-0 text-muted">Thank you for visiting!</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
