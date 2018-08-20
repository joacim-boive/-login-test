/**
 * @deprecated
 */

document.addEventListener('lazybeforeunveil', event => {
    if (event.target.localName === 'img') return;

    const wrapper = document.querySelector('article.lazyload,article.lazyloading,article.lazyloaded');
    const { bgset } = wrapper.dataset;
    const defaultScaling = 'c_scale';

    const set = scaling => {
        wrapper.dataset.bgset = bgset.replace(/{cloudinary.scaling}/i, scaling);
    };

    const widthChange = mq => {
        if (mq.matches) {
            // set(`c_fill,g_auto,h_${window.innerHeight},w_${window.innerWidth}`);
            // Currently it isn't possible to set the size of the image according to window as this will spawn too many variations of images
            set(`c_fill,g_auto`);
        } else {
            set(defaultScaling);
        }
    };

    if (window.matchMedia) {
        widthChange(window.matchMedia('(min-width: 1024px)'));
    } else {
        set(defaultScaling);
    }
});
