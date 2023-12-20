const checkValidation = async (v) => {
  var errorsResponse;

   const match = await v.check().then(function (matched) {
    console.log(matched, "kk")
    if (!matched) {
      var valdErrors = v.errors;
      console.log(valdErrors, "ll")
      var respErrors = [];
      Object.keys(valdErrors).forEach(function (key) {
        console.log(key,"hhh")
        if (valdErrors && valdErrors[key] && valdErrors[key].message) {
          respErrors.push(valdErrors[key].message);
        }
      });
      errorsResponse = respErrors.join(", ");
    }
  });
  return errorsResponse;
};

module.exports = checkValidation