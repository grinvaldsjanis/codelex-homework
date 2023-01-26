import { getCountries} from './client';
import { makePagination } from './pagination';

export let currentSortKey: string;
export let currentSortOrder: string;
let currentPage = 1;
const itemsPerPage = 15;
let qString = `?_page=${currentPage}&_limit=${itemsPerPage}`

function handleSearchForm() {
    const searchForm = document.querySelector('#search-form');
    searchForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = (searchForm.querySelector<HTMLInputElement>('input[name="name"]')).value;
        const capital = (searchForm.querySelector<HTMLInputElement>('input[name="capital"]')).value;
        const currency = (searchForm.querySelector<HTMLInputElement>('input[name="currency"]')).value;
        const language = (searchForm.querySelector<HTMLInputElement>('input[name="language"]')).value;

        let query = `?_page=1&_limit=${itemsPerPage}`;
        if (name) query += `&name_like=${name}`;
        if (capital) query += `&capital_like=${capital}`;
        if (currency) query += `&currency.name_like=${currency}`;
        if (language) query += `&language.name_like=${language}`;
        qString=query;
        refreshUI(query);
    });
}

export const table = document.getElementById('table');

interface Country {
    name: string,
    code: string,
    capital: string,
    region: string,
    currency: { code: string, name: string, symbol: string },
    language: { code: string, name: string },
    flag: string,
    dialing_code: string,
    idoCode: string
}

//---------------Render table------------------

const populateTable = (countries: Country[]) => {
    table.innerHTML = ''; // << clear the table 
    const thead = document.createElement('thead');
    const tfoot = document.createElement('tfoot')
    const row = document.createElement('tr');
    const tbody = document.createElement('tbody');
  
    const headerHTML = `
    <th></th>
    <th>Code</th>
    <th sortKey = "name">Name</th>
    <th sortKey = "capital">Capital</th>
    <th sortKey = "currency.name">Currency</th>
    <th sortKey = "language.name">Language</th>
    `;
    row.innerHTML = headerHTML;
    table.appendChild(thead);
    thead.append(row);
    table.appendChild(tbody);
    const row1 = document.createElement('tr');
    row1.innerHTML = headerHTML;

    for (const country of countries) {
        let flagSrc = `https://flagicons.lipis.dev/flags/4x3/${(country.code).toLowerCase()}.svg`;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td><img src = ${flagSrc} alt=${country.name} width="30" height="22.5"/></td>
        <td>${country.code}</td>
        <td>${country.name}</td>
        <td>${country.capital}</td>
        <td>${country.currency.name}</td>
        <td>${country.language.name}</td>
        `;
        tbody.appendChild(row);
    }
    table.append(tfoot);
    tfoot.append(row1);

    //-----Table headers-----

    const tableHeaders = document.querySelectorAll('th[sortKey]');

    tableHeaders.forEach((header) => {
        header.className = "table__head"
        if (currentSortKey) {
            const activeHeader = document.querySelector(`th[sortKey="${currentSortKey}"]`);
            activeHeader.classList.add("table__head--active", `table__head--${currentSortOrder}`);
        }
    });
    
    tableHeaders.forEach((header) => {
        header.addEventListener("click", async () => {
            event.preventDefault();
            const sortKey = header.getAttribute("sortKey");
            let sortOrder = "asc";

            if (sortKey === currentSortKey) {
                sortOrder = currentSortOrder === "asc" ? "desc" : "asc";
            }

            currentSortKey = sortKey;
            currentSortOrder = sortOrder;

            tableHeaders.forEach((header) => {
                header.classList.remove("sorted-asc", "sorted-desc", "active-sort");
            });

            qString
            let query = `${qString}&_sort=${sortKey}&_order=${sortOrder}`;

            // let query = `?_page=${currentPage}&_limit=${itemsPerPage}&_sort=${sortKey}&_order=${sortOrder}`;

            refreshUI(query);
        });
    });
};


export const refreshUI = async (qString: string) => {
    const data = await getCountries(qString);
    populateTable(data.countriesData);
    makePagination(data.pageLinks, data.totalPages, data.page);
    currentPage = data.page
}

refreshUI(qString);
handleSearchForm();

