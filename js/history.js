const getHistory = () => JSON.parse(localStorage.getItem('history')) ?? [];
const setHistory = (history) => localStorage.setItem('history', JSON.stringify(history));

const renderHistory = () => {
  const history = getHistory();
  const tbody = document.querySelector('#tbodyHistory');
  tbody.innerHTML = '';

  history.forEach((item) => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
    <td>${item.id}</td>
    <td>${item.tax}</td>
    <td>${item.total}</td>
    <td>
    <button>
    <a href="view-details.html?item=${item.id}" class="secundary-button">Detalhes
    </button>
    </td>
    `;
    tbody.appendChild(newRow);
  });
};

renderHistory();