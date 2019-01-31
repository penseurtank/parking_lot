export const validateIntegers = function (data) {
    var re = /^([0-9]+)$/;
    return re.test(data);
  };