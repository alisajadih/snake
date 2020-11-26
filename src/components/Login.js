import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = () => {
  const router = useHistory();
  const [value, setValue] = useState();
  const handleSubmit = () => {
    router.push(`/play/${value}`);
    //stuff
  };

  return (
    <div className="container mt-5 ">
      <div className="row d-flex justify-content-center">
        <div className="col-4">
          <div className="card ">
            <div className="card-header">Login</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div class="form-group">
                  <label for="exampleInputEmail1">Enter Your Name</label>
                  <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    class="form-control"
                    id="exampleInputEmail1"
                  />
                </div>
                <button type="submit" class="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
