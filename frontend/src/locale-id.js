const messages = {
  required: (field) => {
    return `Vui lòng nhập ${field}.`
  }
};

const attributes = {
  fullname: 'họ tên',
  phone: 'số điện thoại',
  address: 'địa chỉ đón khách'
}

const locale = {
    name: 'id',
    messages,
    attributes
};

export default locale;