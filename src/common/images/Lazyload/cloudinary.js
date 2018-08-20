/* eslint-disable no-unused-vars */

import '../../util/handle-scaling';

const isMinified = window.ECSTER_CONFIG_ENVIRONMENT !== 'development';

import(`lazysizes/plugins/respimg/ls.respimg${isMinified ? '.min' : ''}`);
import(`lazysizes/plugins/bgset/ls.bgset${isMinified ? '.min' : ''}`);
import(`lazysizes/plugins/rias/ls.rias${isMinified ? '.min' : ''}`);
import(`lazysizes/lazysizes${isMinified ? '.min' : ''}`);

const url = '//res.cloudinary.com/ecster';
const transforms = 'f_auto,q_auto:good,dpr_auto';
const scaling = ',{cloudinary.scaling}';
const defaults = `${url}/${transforms}`;

export default {
    url,
    transforms,
    scaling,
    defaults,
};
