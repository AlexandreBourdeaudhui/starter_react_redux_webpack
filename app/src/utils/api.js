/*
 * Package Import
 */
import axios from 'axios';

/*
 * Local Import
 */
import { BASE_URL } from 'src/constants/api';

/*
 * Code
 */
const req = axios.create({ baseURL: BASE_URL });

/**
 * Promise Api
 * @param  {String|Object} Request
 * String : By default `axios.create` send request with method `GET`,
 *          So, we just need to pass URL.
 *          e.g. : api('/receive/datas')
 *
 * Object : If we send a request with method `POST`
 *          We need to pass an object with many params.
 *          e.g. : api({
 *            method: 'POST',
 *            url: '/send/datas',
 *            data: { email },
 *          })
 *
 * @return {String} Return an error if request failed.
 */
export const api = request =>
  req(request).catch((error) => {
    console.log(error);
    throw error;
  });
