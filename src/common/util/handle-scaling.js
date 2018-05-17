document.addEventListener('lazybeforeunveil', () => {
    const wrapper = document.querySelector('article.lazyload,article.lazyloading,article.lazyloaded');
    const { bgset } = wrapper.dataset;
    const defaultScaling = 'c_scale,w_{width}';

    const set = scaling => {
        wrapper.dataset.bgset = bgset.replace(/{scaling}/i, scaling);
    };

    const widthChange = mq => {
        if (mq.matches) {
            set(`c_fill,g_auto,h_${window.innerHeight},w_${window.innerWidth}`);
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
