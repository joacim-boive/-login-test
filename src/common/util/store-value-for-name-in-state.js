const storeValueForNameInState = (e, that, callback = () => {}) => {
    const { target } = typeof e === 'object' ? e : event;
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
