import { refreshUI} from './scripts';

export function makePagination(paginationLinks: any, totalPages: number, page: number) {

    const pageNavigation = document.querySelector(".pagination");
    pageNavigation.innerHTML = "";

    const linkClassMap: Record<string, string> = {
        first: "pagination-previous",
        prev: "pagination-previous",
        next: "pagination-next",
        last: "pagination-next"
    };

    const linkTextMap: Record<string, string> = {
        first: "fa-solid fa-angles-left",
        prev: "fa-solid fa-chevron-left",
        next: "fa-solid fa-chevron-right",
        last: "fa-solid fa-angles-right"
    };

    const linkTypes = ["first", "prev", "next", "last"];
    for (let linkType of linkTypes) {

        if (paginationLinks[linkType] && (linkType !== "first" || page !== 1) && (linkType !== "last" || page !== totalPages)) {

            const button = document.createElement("button");
            button.classList.add(linkClassMap[linkType], "button");
            const span = document.createElement("span");
            span.className = "icon";
            const icon = document.createElement("i");
            icon.className = linkTextMap[linkType];

            // button.innerHTML = linkTextMap[linkType];
            pageNavigation.append(button);
            button.append(span);
            span.append(icon);

            button.addEventListener("click", function () {
                event.preventDefault();
                refreshUI(paginationLinks[linkType]);

            });
        }
    }

    // ----------------- Page number buttons ---------------------------------------
    const pageListUl = document.createElement("ul");
    pageListUl.className = "pagination-list"
    pageNavigation.append(pageListUl);


    if (totalPages > 1) {

        const pageArr = pageBtnNrArr(page, totalPages);

        for (let pagN of pageArr) {
            const pageLi = document.createElement("li");
            if (pagN > 0) {
                pageLi.innerHTML = `<button class="pagination-link" aria-label="Goto page ${pagN}">${pagN}</button>`;
                const pButton = pageLi.querySelector(".pagination-link");
                if (pagN === page) {
                    pButton.classList.add("is-current");
                }
                pButton.addEventListener("click", function () {
                    event.preventDefault();
                    // refreshUI(`?_page=${pagN}&_limit=${itemsPerPage}`);
                    console.log(paginationLinks.first);
                    refreshUI(paginationLinks.first.replace("_page=1", `_page=${pagN}`));
                });
            } else {
                pageLi.innerHTML = `<span class="pagination-ellipsis">&hellip;</span>`
            }
            pageListUl.append(pageLi);
        }
    }
}

// ------Generate array for page button numbers
const pageBtnNrArr = (currentPage: number, totalPages: number): number[] => {
    let pages: number[] = [];
    if (currentPage <= 3) {
        for (let i = 1; i <= 4 && i <= totalPages; i++) {
            pages.push(i);
        }
        if (totalPages > 5) {
            pages.push(0);
            pages.push(totalPages);
        }
    } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        if (totalPages > 5) {
            pages.push(0);
        }
        for (let i = totalPages - 3; i <= totalPages; i++) {
            pages.push(i);
        }
    } else {
        pages.push(1);
        pages.push(0);
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push(0);
        pages.push(totalPages);
    }
    return pages;
}


