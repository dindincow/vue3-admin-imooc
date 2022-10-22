export const validatePassword = () => {
  return (rule, value, callback) => {
    console.log(rule, value)
    if (value.length < 6) {
      callback(new Error('密碼不能少於6位'))
    } else {
      callback()
    }
  }
}
