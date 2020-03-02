import numeral from 'numeral';
import countryList from 'country-list';

const getCountryCode = (request, placeholder) => {
    if (!request || !request.delivery_country) return placeholder || 'Not provided'
    return countryList.getName(request.delivery_country)
}

const getCurrency = (request, placeholder) => {
    if (!request || !request.target_price) return placeholder || 'Not provided'
    return numeral(request.target_price).format('$0,0[.]00')
}

const getQuantity = (request, placeholder) => {
    if (!request || !request.quantity) return placeholder || 'Not provided'
    return numeral(request.quantity).format('0,0')
}

const parseNumber = (num) => {
    if (!num && num !== 0) return null
    const cleanChars = String(num).replace(/,/g, '').replace('$', '')
    return Number(cleanChars)
}

const checkForRequiredFields = (request, required_fields) => {
    return new Promise(async (resolve, reject) => {
      const errors = []
      required_fields.forEach(field => {
        if (!request[field]) {
          errors.push(field)
        }
      })

      if (errors.length) {
        reject('Missing field(s) - ' + errors.join(', '))
      }
      else {
        resolve()
      }
    })
}

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array)
  }
}

export default { getCountryCode, getCurrency, getQuantity, parseNumber, checkForRequiredFields, asyncForEach }
