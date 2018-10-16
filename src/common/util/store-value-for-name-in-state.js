const storeValueForNameInState = (e, that) => {
    const { target } = e;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    that.setState({
        [name]: value,
    });
};

export default storeValueForNameInState;
