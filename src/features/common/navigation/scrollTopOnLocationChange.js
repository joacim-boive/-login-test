const scrollTopOnLocationChange = history => {
    history.listen(() => {
        window.scrollTo(0, 0);
    });
};

export default scrollTopOnLocationChange;
