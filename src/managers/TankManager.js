const getAuthHeaders = () => ({
    "Authorization": `Token ${localStorage.getItem("auth_token")}`,
    "Content-Type": "application/json"
});

export const getAllTanks = () => {
    return fetch("http://localhost:8000/tanks", {
        headers: getAuthHeaders()
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Failed to fetch post.");
            }
        });
};

export const getSingleTank = ({ tankId }) => {
    return fetch(`http://localhost:8000/tanks/${tankId}`, {
        headers: getAuthHeaders()
    })
        .then(res => res.json());
};

export const getCurrentUserTanks = ({ token }) => {
    return fetch(`http://localhost:8000/tanks?user=true`, {
        headers: getAuthHeaders()
    })
        .then(res => res.json())
};

export const editTank = (tankId, updatedTankData) => {
    return fetch(`http://localhost:8000/tanks/${tankId}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(updatedTankData),
    })
};

export const createTank = (newTank) => {
    return fetch("http://localhost:8000/tanks", {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newTank),
    });
};


