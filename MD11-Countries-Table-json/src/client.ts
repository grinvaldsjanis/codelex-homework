import axios from 'axios';

const baseUrl = "http://localhost:3004/countries";

interface DataResult {
    countriesData: [],
    totalPages: number,
    pageLinks: object,
    page: number
}

const getPageFromQ = (queryString: string): number =>
parseInt(queryString.replace("?","").split("&").find(part => part.startsWith("_page="))?.split("=")[1]) || 1;


const getItemsFromQ = (queryString: string): number =>
    parseInt(queryString.replace("?","").split("&").find(part => part.startsWith("_limit="))?.split("=")[1]) || 1;

export const getCountries = async (qString: string): Promise<DataResult> => {

    console.log(baseUrl + qString)
    try {
        const response = await axios.get(baseUrl + qString);

        const pageLinks = (response.headers.link)? parseLinkHeader(response.headers.link):{} ;
        const totalItems: number = +response.headers['x-total-count'];
        const totalPages = Math.ceil(totalItems / getItemsFromQ(qString));
        let page = getPageFromQ(qString);

        return {
            countriesData: response.data,
            totalPages: totalPages,
            pageLinks: pageLinks,
            page: page};

    } catch (error) {
        console.error(error);
    }
};

// - Link header parser. Added removal of baseUrl for inner usage
//
// -- https://stackoverflow.com/questions/47449086/how-to-access-rel-from-links-in-header-hypermedia-link-relations/49860166#49860166
function parseLinkHeader(data: string) {
    let arrData = data.split("link:")
    
    data = arrData.length == 2 ? arrData[1] : data;
    let parsed_data: { [k: string]: string } = {}

    arrData = data.split(",")

    for (let d of arrData) {
        const linkInfo = /<([^>]+)>;\s+rel="([^"]+)"/ig.exec(d)

        parsed_data[linkInfo[2]] = linkInfo[1];
    }

    for (let link in parsed_data) {
        parsed_data[link] = parsed_data[link].replace(`${baseUrl}`, "");
    }
    
    return parsed_data;
}