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

        const data = await response.json();

        if (response.ok) {
            alert("Status Updated Successfully");
            loadRequests();
        } else {
            alert(data.message);
        }

    } catch (error) {
        console.error(error);
    }
}

async function loadRequests() {
    try {
        const response = await fetch(
            "http://localhost:5000/api/requests/all"
        );

        const requests = await response.json();

        const tableBody =
            document.getElementById("requestTableBody");

        tableBody.innerHTML = "";
        document.getElementById("totalCount").textContent = requests.length;
      document.getElementById("pendingCount").textContent =
    requests.filter(r => r.status === "Pending").length;
     document.getElementById("resolvedCount").textContent =
    requests.filter(r => r.status === "Resolved").length;
    document.getElementById("rejectedCount").textContent =
    requests.filter(r => r.status === "Rejected").length;
        requests.forEach((request) => {
            tableBody.innerHTML += `
                <tr>
                    <td>${request.name}</td>
                    <td>${request.email}</td>
                    <td>${request.category}</td>
                    <td>${request.message}</td>

                    <td>
                        <select onchange="updateStatus('${request._id}', this.value)">
                            <option value="Pending"
                                ${request.status === "Pending" ? "selected" : ""}>
                                Pending
                            </option>

                            <option value="Resolved"
                                ${request.status === "Resolved" ? "selected" : ""}>
                                Resolved
                            </option>

                            <option value="Rejected"
                                ${request.status === "Rejected" ? "selected" : ""}>
                                Rejected
                            </option>
                        </select>
                    </td>
                </tr>
            `;
        });

    } catch (error) {
        console.error(error);
    }
}

loadRequests();