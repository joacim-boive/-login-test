const storeValueForNameInState = (e, that, callback = () => {}) => {
    const { target } = e;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    that.setState(
        {
            [name]: value,
        },
        callback
    );
};

export default storeValueForNameInState;