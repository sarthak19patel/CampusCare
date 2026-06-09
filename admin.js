let allRequests = [];

async function updateStatus(id, status) {
  try {
    const response = await fetch(
      `https://campuscare-p4eh.onrender.com/api/requests/update-status/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status })
      }
    );

    if (response.ok) {
      loadRequests();
    } else {
      alert("Status update failed");
    }
  } catch (error) {
    console.error(error);
  }
}

function renderRequests(requests) {
  const tableBody = document.getElementById("requestTableBody");

  tableBody.innerHTML = "";

  document.getElementById("totalCount").textContent = allRequests.length;
  document.getElementById("pendingCount").textContent =
    allRequests.filter(r => r.status === "Pending").length;
  document.getElementById("resolvedCount").textContent =
    allRequests.filter(r => r.status === "Resolved").length;
  document.getElementById("rejectedCount").textContent =
    allRequests.filter(r => r.status === "Rejected").length;

  requests.forEach((request) => {
    tableBody.innerHTML += `
      <tr>
        <td>${request.name || "N/A"}</td>
        <td>${request.email || "N/A"}</td>
        <td>${request.category || "N/A"}</td>
        <td>${request.message || "N/A"}</td>
        <td>
          <select onchange="updateStatus('${request._id}', this.value)">
            <option value="Pending" ${request.status === "Pending" ? "selected" : ""}>Pending</option>
            <option value="Resolved" ${request.status === "Resolved" ? "selected" : ""}>Resolved</option>
            <option value="Rejected" ${request.status === "Rejected" ? "selected" : ""}>Rejected</option>
          </select>
        </td>
      </tr>
    `;
  });
}

async function loadRequests() {
  try {
    const response = await fetch(
      "https://campuscare-p4eh.onrender.com/api/requests/all"
    );

    allRequests = await response.json();

    console.log("Requests loaded:", allRequests);

    renderRequests(allRequests);

  } catch (error) {
    console.error(error);
  }
}

loadRequests();