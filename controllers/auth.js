
const axios = require('axios');

const {
    BASE_UTP_URL,
    DEFAULT_HEADERS,
    DEFAULT_COOKIES,
    DEFAULT_BODY,
} = require('../commons');
const {
    getCookieValue,
    parseCookies,
    parseRawBody,
} = require('../utils');

/**
 * Get session data from main acceso.aspx url
 * @returns {Promise<*>}
 */
const getSession = async () => {
    try {
        const request = await axios.get(
            `${BASE_UTP_URL}acceso.aspx`,
            {
                headers: {
                    ...DEFAULT_HEADERS,
                },
                validateStatus: status => status === 200 || status === 500,
            },
        );
        return getCookieValue(request.headers['set-cookie'], 'ASP.NET_SessionId');
    } catch (error) {
        return null;
    }
};

/**
 * Get Login cookie from acceso.aspx
 * @param id
 * @param password
 * @param session_id
 * @returns {Promise<*>}
 */
const getLogin = async (id, password, session_id) => {
    try {
        const request = await axios.post(
            `${BASE_UTP_URL}acceso.aspx`,
            parseRawBody({
                ...DEFAULT_BODY,
                txtCedula: id.toString(),
                txtClave: password.toString(),
                'imgbEnviar.x': 77,
                'imgbEnviar.y': 15
            }),
            {
                headers: {
                    ...DEFAULT_HEADERS,
                    'Cookie': parseCookies({
                        ...DEFAULT_COOKIES,
                        'ASP.NET_SessionId': session_id,
                    }),
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Origin': 'http://matricula.utp.ac.pa',
                    'Referer': 'http://matricula.utp.ac.pa/acceso.aspx',
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36',
                    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36',
                },
                validateStatus: status => status === 200 || status === 302,
            }
        );
        console.log(request);
        return request.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

module.exports = {
    login: async (id, password) => {
        const session_id = await getSession();
        return await getLogin(id, password, session_id);
    },
};


/*

'InfoEst=redirect=26EA2AC3%2AEC91%2A47CB%2A825E%2ABC3F5CD87583; path=/',
     'ST=%2Af; path=/',
     'Login=par2=H3K%2A%40%40dWdd%7Eq%40%7Edf%40hfdD%24XU&par3=%7E%5Ehfd%5EdWdd&par1=Wh%5E%24%24%5EW%7E%5E%24W%5E%24X%5E%24q; path=/' ],

 */