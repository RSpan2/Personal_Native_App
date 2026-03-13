export const NHL_CONFIG = {
    BASE_URL: 'https://api-web.nhle.com/v1',
    headers: {
        accept: 'application/json',
    }
};

export const fetchSchedule = async ( season?: string ) => {
    const endpoint = season
        ? `${NHL_CONFIG.BASE_URL}/schedule/${season}` : `${NHL_CONFIG.BASE_URL}/schedule/now`;

    const response = await fetch(endpoint, {
        headers: NHL_CONFIG.headers
    }) 
    return response.json();
}