// URL to cloudinary CDN
const url = '//res.cloudinary.com/ecster';

/*
f_auto - Choose whatever image format is best for this particular request and client
q_auto:good - Optimize the image with good quality
dpr_auto - Select the proper dpr depending on the requesting client
 */
const transforms = 'f_auto,q_auto:good,dpr_auto,w_{width}';
const scaling = ',{cloudinary.scaling}';
const defaults = `${url}/${transforms}`;

export default {
    url,
    transforms,
    scaling,
    defaults,
};
