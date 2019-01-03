const messages = {
  required: (field) => {
    return `Vui lòng nhập ${field}.`
  }
};

const attributes = {
  fullname: 'họ tên',
  phone: 'số điện thoại',
  namelocation: 'địa chỉ đón khách',
  finishlocationname: 'địa chỉ trả khách'
}

const locale = {
    name: 'id',
    messages,
    attributes
};

export default locale;