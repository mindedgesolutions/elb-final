const UserLatestPosts = () => {
  return (
    <div className="mb-3">
      <div className="p-2 w-full flex flex-row justify-between items-center mb-1">
        <h3 className="text-2xl font-bold tracking-widest capitalize">
          My posts
        </h3>
        <button
          type="button"
          className="w-btn-secondary-lg border font-medium border-white px-4 py-[11px] text-md w-32 rounded-full capitalize tracking-wider"
        >
          view all
        </button>
      </div>
      <div className="overflow-x-auto">
        <div className="w-100">
          <table className="w-100 dashboard-table">
            <thead className="pb-3">
              <tr>
                <th scope="col" className="ps-4">
                  Post title
                </th>
                <th scope="col">Amount</th>
                <th scope="col">Status</th>
                <th scope="col">Rating</th>
                <th scope="col">Posted on</th>
                <th scope="col" className="pe-5 text-end"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="d-flex gap-3 align-items-center project-name">
                    <div className="order-img">
                      <img src="assets/img/dashboard/orders/o-1.png" alt="" />
                    </div>
                    <div>
                      <p className="text-dark-200">
                        Brote - Cleanin Service Elementor Template Kit
                      </p>
                      <ul className="d-flex gap-1 order-category">
                        <li className="text-dark-200">WordPress</li>
                        <li className="text-dark-200">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="5"
                            height="10"
                            viewBox="0 0 5 10"
                            fill="none"
                          >
                            <path
                              d="M1 9L4 5L1 1"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                        </li>
                        <li className="text-dark-200">Creative</li>
                      </ul>
                    </div>
                  </div>
                </td>
                <td className="text-dark-200">$15</td>
                <td>
                  <span className="status-badge pending">Pending payment</span>
                </td>
                <td className="text-dark-200">Jhon Dhor</td>
                <td className="text-dark-200">January 18, 2024 02:51 PM</td>
                <td>
                  <div className="d-flex justify-content-end gap-2">
                    <button
                      className="dashboard-action-btn"
                      data-bs-toggle="modal"
                      data-bs-target="#submitReview"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
                        viewBox="0 0 48 48"
                        fill="none"
                      >
                        <circle cx="24" cy="24" r="24" fill="#EDEBE7"></circle>
                        <path
                          d="M18 20L21.7812 22.5208C23.1248 23.4165 24.8752 23.4165 26.2188 22.5208L30 20M18 33H30C32.2091 33 34 31.2091 34 29V19C34 16.7909 32.2091 15 30 15H18C15.7909 15 14 16.7909 14 19V29C14 31.2091 15.7909 33 18 33Z"
                          stroke="#5B5B5B"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </button>
                    <button
                      className="dashboard-action-btn"
                      data-bs-toggle="modal"
                      data-bs-target="#orderDetails"
                    >
                      <svg
                        width="26"
                        height="19"
                        viewBox="0 0 26 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M23.3187 6.66195C24.6716 8.08537 24.6716 10.248 23.3187 11.6714C21.0369 14.0721 17.1181 17.3333 12.6667 17.3333C8.21523 17.3333 4.29641 14.0721 2.01466 11.6714C0.661781 10.248 0.661781 8.08537 2.01466 6.66195C4.29641 4.26122 8.21523 1 12.6667 1C17.1181 1 21.0369 4.26122 23.3187 6.66195Z"
                          stroke="#5B5B5B"
                          strokeWidth="1.5"
                        ></path>
                        <circle
                          cx="12.668"
                          cy="9.16699"
                          r="3.5"
                          stroke="#5B5B5B"
                          strokeWidth="1.5"
                        ></circle>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default UserLatestPosts;
